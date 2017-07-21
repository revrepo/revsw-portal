(function() {
  'use strict';

  angular
    .module('revapm.Portal.WAFAnalytics')
    .directive('wafTopsPieCharts', wafTopsPieChartsDirective);

  /*@ngInject*/
  function wafTopsPieChartsDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'parts/waf-analytics/directives/waf-tops-pie-charts.tpl.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flStoreName: '@'
      },
      /*@ngInject*/
      controller: function($q, $scope, StatsWAF, WAF_Rules, DomainsConfig, $localStorage) {
        var STORAGE_NAME_FOR_DOMAIN_WAR_RULES_CODES = 'domainWafRulesCodesList'; // TODO: rebase to $config
        $scope._loading = false;
        $scope.filters = !$scope.flStoreName ? _.assign({
          from_timestamp: moment().subtract(24, 'hours').valueOf(),
          to_timestamp: Date.now()
        }, {}) : $localStorage[$scope.flStoreName];
        $scope.chartOptions = {
          chart: {},
          tooltip: {
            formatter: function() {
              var text = '<b>' + this.point.name + '</b>: ' +
                Highcharts.numberFormat(this.point.percentage, 1) + '% ' +
                '(' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' requests)';
              if (this.point.description) {
                text = '<b>' + this.point.description + '</b>' +
                  ' (rule ID ' + this.point.name + '): ' +
                  Highcharts.numberFormat(this.point.percentage, 1) + '% ' +
                  '(' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' requests)';
              }
              return text;
            }
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f}%',
                style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
              },
              depth: 45
            }
          },
        };
        $scope.items = [];
        $scope.loadDetails = function() {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;

          var params = angular.merge({}, {
            domainId: $scope.ngDomain.id,
            count: 20
          }, $scope.filters);

          $q.all([
              StatsWAF.topReport(angular.merge({}, params, {
                report_type: 'country'
              })).$promise,
              StatsWAF.topReport(angular.merge({}, params, {
                report_type: 'rule_id'
              })).$promise,
              StatsWAF.topReport(angular.merge({}, params, {
                report_type: 'zone'
              })).$promise,
              getWAFRulesList()
            ])
            .then(function(dataTops) {
              $scope.topCountries = [];
              $scope.topRulesIds = [];
              $scope.topTargetZones = [];
              var wafRulesList = dataTops[3].data || [];
              // NOTE: prepare countries  data
              if (dataTops[0].data && dataTops[0].data.length > 0) {
                _.forEach(dataTops[0].data, function(item) {
                  var key = item.key.toUpperCase();
                  $scope.topCountries.push({
                    name: ($scope.flCountry[key] || item.key),
                    y: item.count
                  });
                });
              }
              // NOTE: prepare Rules Id
              if (dataTops[1].data && dataTops[1].data.length > 0) {
                _.forEach(dataTops[1].data, function(item) {
                  var descriptionName = _.find(wafRulesList, function(itemRuleIdInfo) {
                    return itemRuleIdInfo.id === item.key;
                  });
                  $scope.topRulesIds.push({
                    name: item.key,
                    y: item.count,
                    description: (!!descriptionName) ? descriptionName.msg /*+ ' (ID ' + item.key + ')' */ : '',
                  });
                });
              }
              if (dataTops[2].data && dataTops[2].data.length > 0) {
                _.forEach(dataTops[2].data, function(item) {
                  $scope.topTargetZones.push({
                    name: item.key,
                    y: item.count
                  });
                });
              }
            })
            .finally(function() {
              $scope._loading = false;
            });
        };

        $scope.$watchGroup(['ngDomain', 'filters'], function() {
          $scope.loadDetails();
        });
        // NOTE: watch fitlers and save to localstorage
        $scope.$watch('filters', function() {
          if ($scope.flStoreName) {
            $localStorage[$scope.flStoreName] = $scope.filters;
          }
        }, true);

        var wafRulesCodesList = $localStorage[STORAGE_NAME_FOR_DOMAIN_WAR_RULES_CODES] || {};
        /**
         * @name getWAFRulesList
         *
         * @returns {Promise}
         */
        function getWAFRulesList() {
          var deff = $q.defer();
          var lastDomainId;
          var filters = {
            rule_type: 'builtin',
            account_id: $scope.ngDomain.account_id
          };

          if (!!wafRulesCodesList.metadata) {
            lastDomainId = wafRulesCodesList.metadata.domain_id;
          }
          if (!lastDomainId || (lastDomainId !== $scope.ngDomain.id)) {
            wafRulesCodesList = {};
            delete $localStorage[STORAGE_NAME_FOR_DOMAIN_WAR_RULES_CODES];
            DomainsConfig.wafRulesList({
                id: $scope.ngDomain.id
              }).$promise
              .then(function(data) {
                $localStorage[STORAGE_NAME_FOR_DOMAIN_WAR_RULES_CODES] = data;
                wafRulesCodesList = $localStorage[STORAGE_NAME_FOR_DOMAIN_WAR_RULES_CODES];
                deff.resolve(wafRulesCodesList);
              })
              .catch(function(err) {
                deff.reject(err);
              });

          } else {
            deff.resolve(wafRulesCodesList || {});
          }
          return deff.promise;
        }
      }
    };
  }
})();

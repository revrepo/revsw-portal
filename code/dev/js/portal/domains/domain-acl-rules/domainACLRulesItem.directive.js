(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainAclRulesItem', domainAclRulesItem)
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/domains/domain-acl-rules/domain-acl-rules-item.tpl.html', true);
    });
  /**
   * @name  domainAclRulesItem
   * @description
   * @return {Object}
   */
  function domainAclRulesItem() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        aclRule: '=ngModel',
        onCallRemove: '&'
      },
      templateUrl: 'parts/domains/domain-acl-rules/domain-acl-rules-item.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainAclRulesItemController($scope, $config, Countries) {
        'ngInject';
        var $ctrl = this;
        $ctrl._loading = true;
        $ctrl.PATTERN_CIDR = $config.PATTERNS.CIDR;
        $ctrl.countries = [];
        // Init
        Countries.query().$promise
          .then(function(countries) {
            $ctrl.countries.length = 0;
            $ctrl.countries.push({
              code: '',
              name: '(not selected)'
            });
            _.forEach(angular.copy(countries), function(item, key) {
              if(typeof key === 'string' && key.length === 2) {
                $ctrl.countries.push({
                  name: item,
                  code: key
                });
              }
            });
            if (!$scope.ngCountry || !$scope.ngCountry.code) {
              if (!!$ctrl.aclRule.country_code && $ctrl.aclRule.country_code !== '') {
                var ind = _.findIndex($ctrl.countries, function(d) {
                  return d.code === $ctrl.aclRule.country_code;
                });
                $ctrl.onOneCountrySelect($ctrl.countries[ind]);
              }
            }
          })
          .finally(function() {
            $ctrl._loading = false;
          });
        /**
         * @name onOneCountrySelect
         * @description
         */
        this.onOneCountrySelect = function($model) {
          $ctrl.aclRule.country_code = $model.code;
          $scope.ngCountry = $model;
        };

        // NOTE: init local model value IP_CIDR for display
        if (!!$ctrl.aclRule.host_name && $ctrl.aclRule.host_name !== '' &&
          !!$ctrl.aclRule.subnet_mask && $ctrl.aclRule.subnet_mask !== '') {
          $scope.IP_CIDR = $ctrl.aclRule.host_name + '/' + $ctrl.aclRule.subnet_mask;
        }
        // NOTE: convert one value CIDR on two
        $scope.$watch('IP_CIDR', function(newVal, oldVal) {
          if (newVal) {
            var data = newVal.split('/');
            $ctrl.aclRule.host_name = data[0];
            $ctrl.aclRule.subnet_mask = data[1];
          } else {
            $ctrl.aclRule.host_name = '';
            $ctrl.aclRule.subnet_mask = '';
          }
        });
      }
    };
  }
})();

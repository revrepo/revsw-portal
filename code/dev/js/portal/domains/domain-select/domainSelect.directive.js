(function() {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .directive('domainSelect', domainSelectDirective);

  /*@ngInject*/
  function domainSelectDirective(User, $localStorage, AlertService) {

    return {
      restrict: 'AE',
      templateUrl: 'parts/domains/domain-select/domain-select.html',
      scope: {
        selectOne: '=',
        ngModel: '=',
        onSelect: '&',
        type: '@',
        isReload: '=?' // NOTE: reload list of domains
      },
      /*@ngInject*/
      controller: function($scope, $state) {

        $scope.domains = [];
        $scope._loading = true;
        $scope.data = {
          model: ''
        };
        $scope.ngDomain =  $scope.ngModel;
        $scope.onModelSelect = function($model) {
          $scope.ngModel = $model;
          $localStorage.selectedDomain = $model;
          //$scope.onSelect($model);
        };

        // Load user domains
        var filter;
        if ($state.current.name.includes('index.security')) {
          filter = 'security_analytics';
        }
        if ($state.current.name.includes('index.reports')) {
          filter = 'web_analytics';
        }
        if ($state.current.name.includes('index.webApp.cache') || $state.current.name.includes('index.webApp.advanced')) {
          filter = 'cache_purge';
        }

        if ($scope.type) {
          filter = $scope.type;
        }
        User.getUserDomains(($scope.isReload === false)? false : true, filter)
          .then(function(domains) {
            $scope.domains = domains;
            // Set default value if ngModel is empty
            if (!$scope.ngModel || !$scope.ngModel.id) {
              // Select domain if it's only one
              if (domains.length === 1 && $scope.selectOne) {
                $scope.onModelSelect($scope.domains[0]);
                $scope.ngDomain = $scope.domains[0];
              }
              if ($localStorage.selectedDomain && $localStorage.selectedDomain.id) {
                var ind = _.findIndex(domains, function(d) {
                  return d.id === $localStorage.selectedDomain.id;
                });
                $scope.onModelSelect($scope.domains[ind]);
                $scope.ngDomain = $scope.domains[ind];
              }
            }
          })
          .catch(AlertService.danger)
          .finally(function() {
            $scope._loading = false;
          });

        $scope.$watch('ngModel', function() {
          $scope.onSelect();
        });
      }
    };
  }
})();

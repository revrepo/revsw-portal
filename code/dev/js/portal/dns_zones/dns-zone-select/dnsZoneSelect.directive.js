(function () {
  'use strict';

  angular
    .module('revapm.Portal.DNSZones')
    .directive('dnsZoneSelect', dnsZoneSelectDirective);

  /*@ngInject*/
  function dnsZoneSelectDirective(User, $localStorage, AlertService) {

    return {
      restrict: 'AE',
      templateUrl: 'parts/dns_zones/dns-zone-select/dns-zone-select.tpl.html',
      scope: {
        selectOne: '=',
        ngModel: '=',
        onSelect: '&'
      },
      /*@ngInject*/
      controller: function ($scope, $state) {
        $scope.dnsZoneList = [];
        $scope._loading = true;
        $scope.data = {
          model: ''
        };
        $scope.ngDNSZone = $scope.ngModel;

        $scope.onModelSelect = function ($model) {
          $scope.ngModel = $model;
          $localStorage.selectedDNSZone = $model;
        };

        //  ---------------------------------
        // Load user DNS Zones
        var filter;
        if ($state.is('index.dnsServices.dns_analytics')) {
          filter = 'dns_analytics';
        }
        User.getUserDNSZones(true, filter)
          .then(function (result) {            
            $scope.dnsZoneList = result;
            // Set default value if ngModel is empty
            if (!$scope.ngModel || !$scope.ngModel.id) {
              // Select domain if it's only one
              if (result.length === 1 && $scope.selectOne) {
                $scope.onModelSelect($scope.dnsZoneList[0]);
                $scope.ngDNSZone = $scope.dnsZoneList[0];
              }
              if ($localStorage.selectedDNSZone && $localStorage.selectedDNSZone.id) {
                var ind = _.findIndex(result, function (d) {
                  return d.id === $localStorage.selectedDNSZone.id;
                });
                $scope.onModelSelect($scope.dnsZoneList[ind]);
                $scope.ngDNSZone = $scope.dnsZoneList[ind];
              }
            }
          })
          .catch(AlertService.danger)
          .finally(function () {
            $scope._loading = false;
          });

        $scope.$watch('ngModel', function () {
          if (!!$scope.onSelect) {
            $scope.onSelect();
          }
        });
      }
    };
  }
})();

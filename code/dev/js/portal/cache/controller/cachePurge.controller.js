(function () {
  'use strict';

  angular
    .module('revapm.Portal.Cache')
    .controller('CachePurgeController', CachePurgeController);

  /*@ngInject*/
  function CachePurgeController($scope, Cache, DomainsConfig, AlertService, $timeout) {

    $scope._loading = false;

    $scope.domain;

    $scope.json = {
      "purges": [
        {
          "url": {
            "is_wildcard": true,
            "expression": "/images/*.png"
          }
        }
      ]
    };

    $scope.text = '';

    $scope.options = {
      mode: 'code',
      modes: ['code','view'], // allowed modes['code', 'form', 'text', 'tree', 'view']
      error: function (err) {
        alert(err.toString());
      }
    };

    /**
     * Purge cache using JSON
     */
    $scope.purge = function () {
      if (!$scope.domain) {
        return;
      }
      var json = angular.copy($scope.json);
      json.domainName = $scope.domain.name;
      $scope._loading = true;
      Cache.purge({}, json)
        .$promise
        .then(function (data) {
          AlertService.success('The request has been successfully submitted', 5000);
        })
        .catch(function () {
          AlertService.danger('Oops something went wrong', 5000);
        })
        .finally(function () {
          $scope._loading = false;
        });
    };

    $scope.purgeText = function() {
      if (!$scope.text || !$scope.domain) {
        return;
      }
      var json = {
        domainName: $scope.domain.name,
        purges: []
      };
      var list = $scope.text.split('\n');
      list.forEach(function(val) {
        json.purges.push({
          "url": {
            "is_wildcard": true,
            "expression": val
          }
        });
      });
      $scope._loading = true;
      Cache.purge({}, json)
        .$promise
        .then(function (data) {
          console.log(data);
          AlertService.success('The request has been successfully submitted', 5000);
        })
        .catch(function () {
          AlertService.danger('Oops something went wrong', 5000);
        })
        .finally(function () {
          $scope._loading = false;
        });
    };

  };
})();

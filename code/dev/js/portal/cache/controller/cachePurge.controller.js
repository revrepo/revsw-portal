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
      json.domainName = $scope.domain.domain_name;
      $scope._loading = true;
      Cache.purge({}, json)
        .$promise
        .then(function (data) {
          AlertService.success('The request has been successfully submitted', 5000);
        })
        .catch(function (err) {
          // set default error message
          var message = 'Oops something went wrong';

          // if response contains message then show it
          if(err && err.data && err.data.message) message = err.data.message;

          AlertService.danger(message, 5000);
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
        domainName: $scope.domain.domain_name,
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

    /**
     * Get editor instance
     */
    $scope.jsonEditorEvent = function(instance){
      $scope.jsonEditorInstance = instance;
    };

    /**
     * Set watcher on json editor's text to catch json validation error
     */
    $scope.$watch('jsonEditorInstance.getText()', function(val){
      // if editor text is empty just return
      if(!val) return;

      // try to parse editor text as valid json and check if at least one item exists, if yes then enable Purge button
      try {
        var json = JSON.parse(val);
        $scope.jsonIsInvalid = !json || !Object.keys(json).length;
      } catch(err) {
        // if it's not valid json or it's empty disable Purge button
        $scope.jsonIsInvalid = true;
      }
    });
  };
})();

(function() {
  'use strict';

  /* jshint maxlen: false */

  angular
    .module('revapm.Portal.Domains')
    .controller('DomainVersionsController', DomainVersionsController);

  /*@ngInject*/
  function DomainVersionsController($scope, DomainsConfig, $stateParams, AlertService, $timeout, $window, $filter, ObjectDiff) {

    $scope._loading = true;
    $scope.id = $stateParams.id;

    $scope.domain = DomainsConfig.get({
      id: $stateParams.id
    });
    $scope.versions = [];
    $scope.currentVersion = null;
    $scope.isZeroVersionModified = false;

    $scope.obj = {
      data: 'Configuration will appear here',
      options: {
        mode: 'code',
        modes: ['code', 'view'], // allowed modes['code', 'form', 'text', 'tree', 'view']
        error: function(err) {
          $window.alert(err.toString());
        }
      }
    };

    /**
     * Format options for select box, and also update the isZeroVersionModified
     * //Version X Last Updated At YYYY By ZZZZ
     * @param  {Object} item
     * @return {string}
     */
    $scope.format = function(item) {
      if (!item.last_published_domain_version) {
        $scope.isZeroVersionModified = true;
      }
      return 'Version ' + item.last_published_domain_version + ' Last updated at ' + $filter('date')(new Date(item.updated_at), 'MMM dd, yyyy H:mm:ss a') +
        ' By ' + (item.updated_by || item.created_by);
    };

    $scope.onChangeVersion = function() {

      if (angular.isUndefined($scope.currentVersion) || $scope.currentVersion === null) {
        $scope.currentData = null;
        $scope.obj.data = 'Configuration will appear here';
        return;
      }
      $scope._loading = true;
      DomainsConfig
        .get({
          id: $stateParams.id,
          version: $scope.currentVersion
        })
        .$promise
        .then(function(data) {
          $scope.currentData = data;
          $scope.obj.data = JSON.stringify(data, null, 2);
        })
        .catch(AlertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
    };


    $scope.onChangeCompareVersion = function() {

      if ((angular.isUndefined($scope.compareVersion) || $scope.compareVersion === null) || !$scope.currentData) {
        $scope.dataCompare = '';
        return;
      }
      if ($scope.compareVersion === $scope.currentVersion) {
        $scope.compareVersion = null;
        $scope.dataCompare = '';
        return;
      }
      $scope._loading = true;
      DomainsConfig
        .get({
          id: $stateParams.id,
          version: $scope.compareVersion
        })
        .$promise
        .then(function(data) {
          var objOne = angular.fromJson(angular.toJson($scope.currentData));
          var objTwo = angular.fromJson(angular.toJson(data));
          var diff = ObjectDiff.diffOwnProperties(objOne, objTwo);
          $scope.dataCompare = ObjectDiff.toJsonDiffView(diff);
          if (diff.changed === 'equal') {
            $scope.dataCompare = 'There are no differences between the configurations';
          }
        })
        .catch(AlertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
    };

    $scope.$watch('compareVersion', function(newVal, oldVal) {
      if (newVal == null) {
        $scope.dataCompare = null;
      }
    });

    $scope.$watch('currentVersion', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.dataCompare = null;
      }
    });


    DomainsConfig
      .versions({
        id: $stateParams.id
      })
      .$promise
      .then(function(data) {
        if (angular.isArray(data)) {
          $scope.versions = data;
        }
      })
      .catch(AlertService.danger)
      .finally(function() {
        $scope._loading = false;
      });

    $timeout(function() {
      $scope.obj.options.mode = 'code';
    }, 10);
  }
})();

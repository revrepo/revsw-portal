(function() {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .controller('dnsZoneAutoDiscoverZoneRecordsModalController', dnsZoneAutoDiscoverZoneRecordsModalController);

  /*@ngInject*/
  function dnsZoneAutoDiscoverZoneRecordsModalController($q, $scope, $rootScope, DNSZoneRecords, $uibModal, $uibModalInstance, model) {

    $scope.totalAddedRecords = 0;
    $scope.model = model;

    $scope._loading = false;
    $scope.ok = function() {
      $uibModalInstance.close(true);
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.confirm = function(template, resolve) {
      if (angular.isObject(template)) {
        resolve = template;
        template = '';
      }
      if (angular.isObject(resolve)) {
        resolve = {
          model: resolve
        };
      }
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: template || 'parts/modal/confirmDelete.html',
        controller: 'ConfirmModalInstanceCtrl',
        size: 'md',
        resolve: resolve || {}
      });

      return modalInstance.result;
    };

    $scope.countSelectedItems = function() {
      return _.filter($scope.model.zone_records, function(item) {
        return item.$$isSelected;
      }).length || 0;
    };


    $scope.onAddToTheDNSZone = function() {
      var model_ = {
        zone_name: $scope.model.zone_name,
        count: $scope.countSelectedItems()
      };
      $scope.confirm('confirmMultiAddDNSRecords.html', model_)
        .then(function(data) {
          if (data === true) {
            $scope.addToTheDNSZone();
          }
        });
    };
    /**
     * @name addToTheDNSZone
     * @description add all selected dns records
     */
    $scope.addToTheDNSZone = function() {
      $scope._loading = true;
      var newRecordsList = _.filter($scope.model.zone_records, function(item) {
          return item.$$isSelected;
        })
        .map(function(record) {
          var newRecord = {
            dns_zone_id: $scope.model.dns_zone_id,
            domain: record.domain,
            type: record.type
          };

          newRecord.record = record;
          return $q.when(DNSZoneRecords.create(newRecord).$promise
            .then(function(data) {
              record.$$isAdded = true;
              record.$$isError = false;
              record.$$isSelected = false;
              $scope.totalAddedRecords += 1;
              return record;
            })
            .catch(function(err) {
              record.$$isSelected = false;
              record.$$isError = true;
              record.$$errorMessage = (!!err.data) ? err.data.message : null;
              return record;
            })
          );
        });

      $q.all(newRecordsList, function(err, data) {
          // console.log('result', data)
        })
        .finally(function() {
          $scope._loading = false;
        });
    };
  }
})();

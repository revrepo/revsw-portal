(function() {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .controller('dnsZoneAutoDiscoverZoneRecordsModalController', dnsZoneAutoDiscoverZoneRecordsModalController);

  /*@ngInject*/
  function dnsZoneAutoDiscoverZoneRecordsModalController($q, $scope, $rootScope, DNSZoneRecords, $uibModal, $uibModalInstance, model) {

    $scope.model = model;
    $scope._loading = $scope.model._loading;
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
            domain: record.domain,// TODO: delete - clean code .replace('mbeans.com', 'vipbilet24.xyz'), // $scope.model.zone_name,
            type: record.type
          };

          newRecord.record = record;
          return $q.when(DNSZoneRecords.create(newRecord).$promise
            .then(function(data) {
              record.$$isAdded = true;
              record.$$isSelected = false;
              record.$$isExists = true;
              return record;
            })
            .catch(function(err) {
              record.$$isSelected = true;
              record.$$isAdded = false;
              return record;
            })
          );
        });

      $q.all(newRecordsList, function(err, data) {
          // console.log('result', data)
        })
        .finally(function() {
          // TODO: update main list DNS Records
          // $rootScope.$broadcast('update:searchData');
          $scope._loading = false;
        });
    };
  }
})();

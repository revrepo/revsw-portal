(function() {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .controller('dnsZoneAutoDiscoverZoneRecordsModalController', dnsZoneAutoDiscoverZoneRecordsModalController);

  /*@ngInject*/
  function dnsZoneAutoDiscoverZoneRecordsModalController($q, $config, $timeout, $scope, $rootScope, DNSZoneRecords, $uibModal, $uibModalInstance, model, AlertService) {

    var defaultTimeToWaitNewNSONECallInMillissecons = $config.DNS_WAIT_NEW_CALL_MILLISSECONDS;

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
     * @name sleep
     *
     * @param {Number} ms
     */
    function sleep(ms) {
      return $timeout($q.when(), ms);
    }
    /**
     * @name sendRequest
     * @description method send one new DNS Zone Record with delay
     * @param {Array} records
     * @returns
     */
    function sendRequest(records, delay) {
      var delay_ = delay || defaultTimeToWaitNewNSONECallInMillissecons;
      var record = records.shift();
      if (!record) {
        return $q.when();
      }
      var newRecord = {
        dns_zone_id: $scope.model.dns_zone_id,
        domain: record.domain,
        type: record.type
      };

      newRecord.record = record;

      return DNSZoneRecords.create(newRecord).$promise
        .then(function(data) {
          record.$$isAdded = true;
          record.$$isError = false;
          record.$$isSelected = false;
          return record;
        })
        .then(function() {
          $scope.totalAddedRecords += 1;
          return sleep(delay_);
        })
        .then(function() {
          return sendRequest(records);
        })
        .catch(function(err) {
          record.$$isSelected = false;
          record.$$isError = true;
          record.$$errorMessage = (!!err.data) ? err.data.message : null;
          AlertService.danger(err);
          return err;
        });

    }
    /**
     * @name addToTheDNSZone
     * @description add all selected dns records
     */
    $scope.addToTheDNSZone = function() {
      $scope._loading = true;
      var newRecordsList = _.filter($scope.model.zone_records, function(item) {
        return item.$$isSelected;
      });
      // NOTE: send request for create new record
      sendRequest(newRecordsList)
        .finally(function() {
          $scope._loading = false;
        });
    };
  }
})();

/* general.controller.js */

/**
 * @controller GeneralCtrl
 * @module 'revapm.Portal.Reports'
 * @desc controller for the Web Analytics/General view
 */
(function(angular, empty) {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('GeneralCtrl', GeneralCtrl);


  GeneralCtrl.$inject = [
    '$scope',
    'Stats'
  ];

  /*@ngInject*/
  function GeneralCtrl(
    $scope,
    Stats
  ) {
    var vm = this;

    //ui data model
    vm.model = {
      domain: empty,
      filtersList: []
    };

    //ui actions
    vm.actions = {
      onDomainChange: onDomainChange
    };

    init();

    /////////////

    /**
     * @name init
     * @desc init controller logic function
     * @kind function
     */
    function init() {
    }

    /**
     * @name onDomainChange
     * @desc when domain changes
     * @kind function
     */
    function onDomainChange() {
      if (vm.model.domain) {
        var domainId = vm.model.domain.id;
        reloadOS(domainId);
        reloadDevice(domainId);
      }
      console.log(vm.model.domain);
      //
      //reloadDevice();
    }

    /**
     * Reload list of OS
     *
     * @param {string|number} domainId
     */
    function reloadOS(domainId) {
      $scope.os = {
        labels: [],
        data: []
      };

      Stats.os({ domainId: domainId }).$promise.then(function(data) {
        if (data.data && data.data.length > 0) {
          angular.forEach(data.data, function(os) {
            $scope.os.labels.push(os.key);
            $scope.os.data.push(os.count);
          });
        }
      });
    }

    /**
     * List of devices
     *
     * @param {string|number} domainId
     */
    function reloadDevice(domainId) {
      $scope.device = {
        labels: [],
        data: []
      };

      Stats.device({ domainId: domainId }).$promise.then(function(data) {
        if (data.data && data.data.length > 0) {
          angular.forEach(data.data, function(os) {
            $scope.device.labels.push(os.key);
            $scope.device.data.push(os.count);
            console.log($scope.device);
          });
        }
      });
    }
  }
})(angular);

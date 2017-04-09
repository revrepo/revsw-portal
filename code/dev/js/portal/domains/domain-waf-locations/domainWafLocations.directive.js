//waf-actions-list.tpl.html

(function () {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainWafLocations', domainWafLocations);


  function domainWafLocations() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        waf: '=ngModel'
      },
      templateUrl: 'parts/domains/domain-waf-locations/domain-waf-locations.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainWafLocationsController($scope, $uibModal, $config, AlertService) {
        'ngInject';
        var $ctrl = this;
        this.headerOperations = $config.HEADER_OPERATIONS;

        this.status = {
          isCustomHeaderOpen: false,
          isFirstOpen: true,
          isFirstDisabled: false
        };

        /**
         * @name  onAddNew
         * @description add new Item of WAF Location
         * Property "waf" must exists and has type of Array
         * @param  {Object} newWAFLocation
         * @return
         */
        this.onAddNewWAFLocation = function () {
          if (!_.isArray($ctrl.waf)) {
            $ctrl.waf = [];
          }
          var newWAFLocation = {
            'location': '/new',
            'enable_waf': true,
            'enable_learning_mode': true,
            'enable_sql_injection_lib': true,
            'enable_xss_injection_lib': true,
            'waf_rules': [],
            'waf_actions': []
          };
          $ctrl.waf.push(_.clone(newWAFLocation));
          AlertService.success('A new default location block has been added to the top of the list. Please configure the block before saving the configuration.');
        };
        /**
         * @name  onDelete
         * @description delete one item from array property 'waf'
         * @param  {Integer} index
         * @return
         */
        this.onDeleteWAFLocation = function (e,index) {
          e.preventDefault();
          e.stopPropagation();
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'parts/domains/modals/confirmDeleteWAFLocation.tpl.html',
            controller: /*ngInject*/ function ($scope, $uibModalInstance, model) {
              $scope.model = model;
              $scope.ok = function () {
                $uibModalInstance.close('ok');
              };
              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
            },
            resolve: {
              model: function () {
                return $ctrl.waf[index];
              }
            }
          });

          modalInstance.result
            .then(function () {
              $ctrl.waf.splice(index, 1);
            });
        };
      }
    };
  }
})();

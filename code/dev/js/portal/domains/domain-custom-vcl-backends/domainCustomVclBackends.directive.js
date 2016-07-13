(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainCustomVclBackends', domainCustomVclBackends)
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/domains/domain-custom-vcl-backends/domain-custom-vcl-backends.tpl.html', true);
    });
  /**
   * @name  domainCustomVclBackends
   * @description
   * @return {Object}
   */
  function domainCustomVclBackends() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        customVclBackends: '=ngModel'
      },
      templateUrl: 'parts/domains/domain-custom-vcl-backends/domain-custom-vcl-backends.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainCustomVclBackendsController($scope, AlertService) {
        'ngInject';
        var $ctrl = this;
        /**
         * @name  onAddNewBackendBlock
         * @description
         *    Add new block in Backends array
         * @return
         */
        this.onAddNewBackendBlock = function() {
          var newBlock = {
            name: '',
            host: 0,
            port: 3000,
            dynamic: false,
            vcl: ''
          };
          $ctrl.customVclBackends.unshift(newBlock);
          AlertService.success('A new default bakend block has been added to the top of the list. Please configure the block before saving the configuration.');
        };
        /**
         * @name  onRemoveBackendBlock
         * @description
         *   Delete item from Backends array
         *
         * @param  {Integer} index
         * @return
         */
        this.onRemoveBackendBlock = function(index) {
          $scope.confirm('parts/domains/domain-custom-vcl-backends/modal/confirmModalDeleteBackenBlock.tpl.html', {
              name: $ctrl.customVclBackends[index].name
            })
            .then(function() {
              $ctrl.customVclBackends.splice(index, 1);
              AlertService.success('Backend Block was deleted');
            });
        };
      }
    };
  }
})();

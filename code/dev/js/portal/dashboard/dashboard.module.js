(function() {
  'use strict';
  /**
   * @name  revapm.Portal.Dashboard
   * @document service
   */
  angular.module('revapm.Portal.Dashboard', [
      'ngStorage',
      'revapm.Portal.Shared',
      'revapm.Portal.Config',
      'revapm.Portal.Resources',
      'ui.router',
      'ngSanitize',
      // 'adf', // TODO: add after fix conflict with directive 'alert'
      'adf.provider',
      'revapm.Portal.BlueTriangleTech'
    ])
    .config( /*ngInject*/ function(dashboardProvider) {
      // NOTE: define dashboard structures
      dashboardProvider.structure('8-4', {
          title: '(One Wide Column And One Narrow Column)',
          rows: [{
            columns: [{
              styleClass: 'col-md-8'
            }, {
              styleClass: 'col-md-4'
            }]
          }]
        })
        .structure('12', {
          title: '(One Wide Column)',
          rows: [{
            columns: [{
              styleClass: 'col-md-12'
            }]
          }]
        })
        .structure('6-6', {
          title: '(Two Columns Of Equal Width)',
          rows: [{
            columns: [{
              styleClass: 'col-md-6'
            }, {
              styleClass: 'col-md-6'
            }]
          }]
        })
        .structure('4-4-4', {
          title: '(Three Columns of Equal Width)',
          rows: [{
            columns: [{
              styleClass: 'col-md-4'
            }, {
              styleClass: 'col-md-4'
            }, {
              styleClass: 'col-md-4'
            }]
          }]
        })
        .structure('3-3-3-3', {
          title: '(Four Columns Of Equal Width)',
          rows: [{
            columns: [{
              styleClass: 'col-md-3'
            }, {
              styleClass: 'col-md-3'
            }, {
              styleClass: 'col-md-3'
            }, {
              styleClass: 'col-md-3'
            }]
          }]
        });
    })
    // TODO: rebase
    .config( /*ngInject*/ function(dashboardProvider) {
      dashboardProvider
        .widget('bluetriangletech-conversions-subcategories', {
          title: 'Business Analytics',
          description: 'Conversion Rate, Average Order Value and Page Views by PRT for Subcategories',
          templateUrl: 'parts/dashboard/widgets/bluetriangletech/view-iframe-bluetriangletech.tpl.html',
          titleTemplateUrl: 'parts/dashboard/widgets/bluetriangletech/widget-title-with-params-bluetriangletech.html',
          controller: 'widgetBTTiframeController',
          controllerAs: 'iframe',
          edit: {
            templateUrl: 'parts/dashboard/widgets/bluetriangletech/edit-bluetriangletech.html',
            controller: 'widgetEditBTTiframeController',
            controllerAs: 'vm',
          },
          config: {
            height: '100%',
            country: 'All Countries',
            count_last_day: '1'
          }
        });
    })
    .controller('widgetBTTiframeController', widgetBTTiframeController)
    .controller('widgetEditBTTiframeController', widgetEditBTTiframeController);

  function widgetBTTiframeController($sce, BTTPortalService, config) {
    'ngInject';
    var vm = this;
    var _defaultConfig = {
      filters: {
        country: 'All Countries',
        count_last_day: '1'
      },
      info: {
        country: 'All countries'
      }
    };
    _.defaultsDeep(config, _defaultConfig);
    vm.config = config;
    vm._loading = false;
    // TODO: init function for control existing domain Id
    BTTPortalService.generateUrl(config.filters)
      .then(function(url) {
        config.url = url;
        if (config.url) {
          vm.url = $sce.trustAsResourceUrl(config.url);
        }
      })
      .finally(function() {
        vm._loading = false;
      });
  }

  function widgetEditBTTiframeController($scope, Countries) {
    'ngInject';
    var vm = this;
    var _defaultConfig = {
      filters: {
        country: 'All Countries',
        count_last_day: '1'
      },
      info: {
        country: 'All countries'
      }
    };
    _.defaultsDeep($scope.config, _defaultConfig);

    vm.domain = $scope.config.domain;
    vm.refCountry = Countries.query();
    vm.onDomainSelected = function() {
      if (!vm.domain || !vm.domain.id) {
        return;
      }
      vm.reload();

    };
    /**
     * @name  reload
     * @description Reload data
     * @return
     */
    vm.reload = function() {
      angular.extend($scope.config, {
        domain: angular.copy(vm.domain)
      });
    };
  }
})();

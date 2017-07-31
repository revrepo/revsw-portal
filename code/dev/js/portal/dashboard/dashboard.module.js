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
      'adf',
      'adf.provider',
      'revapm.Portal.BlueTriangleTech',
      'angular-nicescroll',
      'revapm.Portal.Dashboard.Widgets.AppsAnalytics',
      'revapm.Portal.Dashboard.Widgets.WebAnalytics',
      'revapm.Portal.Dashboard.Widgets.SecurityAnalytics',
      'adf.widget.analytics-proxy-traffic'
    ])
    .config( /*ngInject*/ function(dashboardProvider) {
      // NOTE: define dashboard structures
      dashboardProvider.structure('8-4', {
          title: '(One Wide Column And One Narrow Column)',
          rows: [{
            columns: [{
              styleClass: 'col-md-8',
              widgets: []
            }, {
              styleClass: 'col-md-4',
              widgets: []
            }]
          }]
        })
        .structure('12', {
          title: '(One Wide Column)',
          rows: [{
            columns: [{
              styleClass: 'col-md-12',
              widgets: []
            }]
          }]
        })
        .structure('6-6', {
          title: '(Two Columns Of Equal Width)',
          rows: [{
            columns: [{
              styleClass: 'col-md-6',
              widgets: []
            }, {
              styleClass: 'col-md-6',
              widgets: []
            }]
          }]
        })
        .structure('4-4-4', {
          title: '(Three Columns of Equal Width)',
          rows: [{
            columns: [{
              styleClass: 'col-md-4',
              widgets: []
            }, {
              styleClass: 'col-md-4',
              widgets: []
            }, {
              styleClass: 'col-md-4',
              widgets: []
            }]
          }]
        })
        .structure('3-3-3-3', {
          title: '(Four Columns Of Equal Width)',
          rows: [{
            columns: [{
              styleClass: 'col-md-3',
              widgets: []
            }, {
              styleClass: 'col-md-3',
              widgets: []
            }, {
              styleClass: 'col-md-3',
              widgets: []
            }, {
              styleClass: 'col-md-3',
              widgets: []
            }]
          }]
        });
    })
    .run(setCustomWidgetTemplates)
    .controller('widgetBTTConversionReportController', widgetBTTConversionReportController)
    .controller('widgetBTTBounceRateReportController', widgetBTTBounceRateReportController)
    .controller('widgetBTTBrandConversionRateReportController', widgetBTTBrandConversionRateReportController)
    .controller('widgetBTTLostRevenueCalculatorReportController', widgetBTTLostRevenueCalculatorReportController)
    .controller('widgetBTTTrafficInfoReportController', widgetBTTTrafficInfoReportController)
    .controller('widgetEditBTTiframeController', widgetEditBTTiframeController);
  /**
   * [widgetBTTConversionReportController description]
   * @param  {[type]} $sce             [description]
   * @param  {[type]} BTTPortalService [description]
   * @param  {[type]} config           [description]
   * @return {[type]}                  [description]
   */
  function widgetBTTConversionReportController($sce, BTTPortalService, config) {
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
    BTTPortalService.generateUrlConversionReport(config)
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
  /**
   * [widgetBTTBounceRateReportController description]
   * @param  {[type]} $sce             [description]
   * @param  {[type]} BTTPortalService [description]
   * @param  {[type]} config           [description]
   * @return {[type]}                  [description]
   */
  function widgetBTTBounceRateReportController($sce, BTTPortalService, config) {
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
    BTTPortalService.generateUrlBounceRateReport(config)
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
  /**
   * [widgetBTTBrandConversionRateReportController description]
   * @param  {[type]} $sce             [description]
   * @param  {[type]} BTTPortalService [description]
   * @param  {[type]} config           [description]
   * @return {[type]}                  [description]
   */
  function widgetBTTBrandConversionRateReportController($sce, BTTPortalService, config) {
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
    BTTPortalService.generateUrlBrandConversionRateReport(config)
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
  /**
   * @name  widgetBTTLostRevenueCalculatorReportController
   * @description
   *
   *
   * @param  {[type]} $sce             [description]
   * @param  {[type]} BTTPortalService [description]
   * @param  {[type]} config           [description]
   * @return {[type]}                  [description]
   */
  function widgetBTTLostRevenueCalculatorReportController($sce, BTTPortalService, config) {
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
    BTTPortalService.generateUrlLostRevenueCalculatorReport(config)
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
  /**
   * @name  widgetBTTTrafficInfoReportController
   * @description
   *
   *
   * @param  {[type]} $sce             [description]
   * @param  {[type]} BTTPortalService [description]
   * @param  {[type]} config           [description]
   * @return {[type]}                  [description]
   */
  function widgetBTTTrafficInfoReportController($sce, BTTPortalService, config) {
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
    BTTPortalService.generateUrlTrafficInfoReport(config)
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
  /**
   * @name  widgetEditBTTiframeController
   * @description
   *
   *
   * @param  {[type]} $scope    [description]
   * @param  {[type]} Countries [description]
   * @return {[type]}           [description]
   */
  function widgetEditBTTiframeController($scope, $localStorage, Countries, User, AlertService) {
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
    vm._loading = true;
    vm.domains = [];
    vm.domain = $scope.config.domain;
    vm.refCountry = Countries.query();

    // Load user domains
    User.getUserDomains(true)
      .then(function(domains) {
        vm.domains = _.filter(domains, function(item) {
          return (!!item.btt_key && item.btt_key !== '');
        });
        // Set default value if ngModel is empty
        if (!vm.domain || !vm.domain.id) {
          // Select domain if it's only one
          if (domains.length === 1 && $scope.selectOne) {
            vm.onDomainSelected($scope.domains[0]);
            vm.domain = $scope.domains[0];
          }
          if ($localStorage.selectedDomain && $localStorage.selectedDomain.id) {
            var ind = _.findIndex(domains, function(d) {
              return d.id === $localStorage.selectedDomain.id;
            });

            vm.domain = vm.domains[ind];
            vm.onDomainSelected(vm.domains[ind]);
          }
        }
        return vm.domains;
      })
      .catch(AlertService.danger)
      .finally(function() {
        vm._loading = false;
      });

    vm.onDomainSelected = function(domain) {
      if (!!domain) {
        $localStorage.selectedDomain = domain;
      }
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
  /**
   * @name  setCustomWidgetTemplates
   * @description
   *   Set new template for ADF
   * @param {[type]} $templateCache [description]
   */
  function setCustomWidgetTemplates($templateCache) {
    'ngInject';
    $templateCache.put('../src/templates/widget-edit.html',
      '<form name=widgetEditForm novalidate role=form ng-submit=saveDialog()>' +
      '<div class=modal-header> <button type=button class=close ng-click=closeDialog() aria-hidden=true>&times;</button> ' +
      '<h4 class=modal-title>{{widget.title}}</h4> </div> <div class=modal-body>' +
      // " <div class=\"alert alert-danger\" role=alert ng-show=validationError> <strong>Apply error:</strong> {{validationError}} </div>"+
      ' <div class=form-group  ng-class="{\'has-error\': widgetEditForm.widgetTitle.$invalid && widgetEditForm.widgetTitle.$dirty}">' +
      '<label for=widgetTitle>Title</label> ' +
      '<input type=text class=form-control id=widgetTitle  name="widgetTitle" ng-model=definition.title placeholder="Enter title" ' +
      'ng-maxlength=30 validate-pattern-no-special-chars required>' +
      '<div class="error-messages" ng-messages="widgetEditForm.widgetTitle.$error" role="alert" ng-messages-multiple>' +
      '   <div ng-messages-include="parts/shared/error-messages.html"></div>' +
      '  </div>' +
      '</div> <div ng-if=widget.edit> <adf-widget-content model=definition content=widget.edit> </adf-widget-content></div> </div> ' +
      '<div class=modal-footer> <button type=button class="btn btn-default" ng-click=closeDialog()>Cancel</button> ' +
      '<input type=submit class="btn btn-primary" ng-disabled=widgetEditForm.$invalid value=Apply> </div></form>');
  }

})();

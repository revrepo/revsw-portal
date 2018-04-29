(function() {
  'use strict';

  angular
    .module('revapm.Portal.Cache')
    .controller('CachePurgeController', CachePurgeController);

  /*@ngInject*/
  function CachePurgeController($scope, $state, Cache, DomainsConfig, AlertService, $timeout, $uibModal,
    $q, DTOptionsBuilder, DTColumnDefBuilder, $config, User
  ) {
    $scope._loading = false;
    $scope.environment = $config.PURGE_JOB_ENVIRONMENTS_CHOICE[2].key;
    $scope.isReadOnly = User.isReadOnly;
    $scope.purgeImageEngineSecondaryCache = true;
    // $scope.domain;
    $scope.json = {
      purges: [{
        url: {
          is_wildcard: true,
          expression: '/images/*.png'
        }
      }]
    };

    // $scope.exampleJsons for advanced cache
    if ($state.current.name === 'index.webApp.advanced') {    
      $scope.exampleJsons = [{
        'text': 'Purge all PNG files under /images, <b>non-recursive</b> (so e.g. files under /images/today/ will not be purged):',
        'json': {
          'purges': [{
            'url': {
              'is_wildcard': true,
              'expression': '/images/*.png'
            }
          }]
        }
      }, {
        'text': ' Purge all PNG files under /images, <b>recursive</b> (so e.g. files under /images/today/ will also be purged):',
        'json': {
          'purges': [{
            'url': {
              'is_wildcard': true,
              'expression': '/images/**/*.png'
            }
          }]
        }
      }, {
        'text': 'Purge everything, recursively, for current domain:',
        'json': {
          'purges': [{
            'url': {
              'is_wildcard': true,
              'expression': '/**/*'
            }
          }]
        }
      }];

      $scope.exampleJsons.forEach(function(item) {
        item.json = JSON.stringify(item.json, null, 2);
      });
    }

    $scope.text = '';

    $scope.options = {
      mode: 'code',
      modes: ['code', 'view'], // allowed modes['code', 'form', 'text', 'tree', 'view']
      error: function(err) {
        AlertService.danger(err);
      }
    };

    /**
     * Purge cache using JSON
     */
    $scope.purge = function() {
      if (!$scope.domain) {
        return;
      }
      var json = angular.copy($scope.json);
      json.domainName = $scope.domain.domain_name;
      json.environment = $scope.environment;
      $scope._loading = true;
      var params = {
        purge_image_engine_secondary_cache: $scope.purgeImageEngineSecondaryCache
      };
      Cache.purge(params, json)
        .$promise
        .then(AlertService.success)
        .catch(AlertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
    };

    $scope.purgeText = function() {
      if (!$scope.text || !$scope.domain) {
        return;
      }
      var json = {
        domainName: $scope.domain.domain_name,
        environment: $scope.environment,
        purges: []
      };
      var list = $scope.text.split('\n');
      list.forEach(function(val) {
        json.purges.push({
          url: {
            is_wildcard: true,
            expression: val
          }
        });
      });
      $scope._loading = true;
      var params = {
        purge_image_engine_secondary_cache: $scope.purgeImageEngineSecondaryCache
      };
      Cache.purge(params, json)
        .$promise
        .then(AlertService.success)
        .catch(AlertService.danger)
        .then(function() {
          return vm.getPurgeJobs($scope.domain)
            .then(function(data) {
              vm.purgeJobsList = data;
            });
        })
        .finally(function() {
          $scope._loading = false;
        });
    };
    /**
     * @name  purgeDefaultText
     * @description
     *
     *
     * @return {[type]} [description]
     */
    $scope.purgeDefaultText = function() {
      if (!$scope.domain) {
        return;
      }
      $scope
        .confirm('confirmModal.html', $scope.domain)
        .then(function() {
          var domainName = $scope.domain.domain_name;
          $scope._loading = true;
          var params = {
            purge_image_engine_secondary_cache: $scope.purgeImageEngineSecondaryCache
          };
          Cache.purge(params, json)
            .$promise
            .then(AlertService.success)
            .catch(AlertService.danger)
            .then(function() {
              return vm.getPurgeJobs($scope.domain)
                .then(function(data) {
                  vm.purgeJobsList = data;
                });
            })
            .finally(function() {
              $scope._loading = false;
            });
        });

      var json = {
        domainName: $scope.domain.domain_name,
        environment: $scope.environment,
        purges: [{
          'url': {
            'is_wildcard': true,
            'expression': '/**/*'
          }
        }, {
          'url': {
            'is_wildcard': true,
            'expression': '/'
          }
        }, {
          'url': {
            'is_wildcard': true,
            'expression': '/**'
          }
        }]
      };
    };
    /**
     * Get editor instance
     */
    $scope.jsonEditorEvent = function(instance) {
      $scope.jsonEditorInstance = instance;
    };

    /**
     * Set watcher on json editor's text to catch json validation error
     */
    $scope.$watch('jsonEditorInstance.getText()', function(val) {
      // if editor text is empty just return
      if (!val) {
        $scope.jsonIsInvalid = true;
        return;
      }

      // try to parse editor text as valid json and check if at least one item exists, if yes then enable Purge button
      try {
        var json = JSON.parse(val);
        $scope.jsonIsInvalid = !json || !Object.keys(json).length;
      } catch (err) {
        // if it's not valid json or it's empty disable Purge button
        $scope.jsonIsInvalid = true;
      }
    });

    /**
     * Confirmation dialog
     *
     * @param {string=} [template]
     * @param {Object=} [resolve]
     * @returns {*}
     */
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
        animation: true,
        templateUrl: template || 'parts/modal/confirmDelete.html',
        controller: 'ConfirmModalInstanceCtrl',
        size: 'md',
        resolve: resolve || {}
      });

      return modalInstance.result;
    };

    /**
     * Copy example to json editor
     */
    $scope.copyToJsonEditor = function(item) {
      if (angular.isObject($scope.json)) {
        $scope.jsonEditorInstance.setText(item.json);
      } else {
        angular.extend($scope.json, JSON.parse(item.json));
      }
    };

    // Last Purge Job
    //
    var vm = this;
    var pageLength = $config.PURGE_CACHED_OBJECTS.DEFAULT_PAGE_LENGTH;

    $scope.vm = vm;
    vm.purgeJobsList = [];
    vm.purgeJobStatus = $config.PURGE_JOB_STATUS;
    vm.getPurgeJobs = function(domain) {
      var def = $q.defer();
      var data = [];
      if (!!domain) {
        $scope._loading = true;
        DomainsConfig.purge({
            domain_id: domain.id,
            limit: $config.PURGE_CACHED_OBJECTS.LIMIT_HISTORY_ROWS // Max count rows
          })
          .$promise
          .then(function(data) {
            var new_data = _.map(data.data, function(item) {
              item.snippets = [];
              if (angular.isArray(item.request_json.purges)) {
                item.snippets = _.map(item.request_json.purges, function(purge) {
                  delete purge._id;
                  delete purge.url.domain;
                  return purge.url.expression;
                });
              }
              return item;
            });
            def.resolve(new_data);
          })
          .catch(AlertService.danger)
          .finally(function() {
            $scope._loading = false;
          });
      } else {
        def.resolve(data);
      }
      return def.promise;
    };
    // NOTE: @see date formats in /js/datatables.net/date-moment-ext.js
    vm.dtColumnDefs = [
      DTColumnDefBuilder.newColumnDef([0]).withOption('type', 'moment-MM/DD/YYYY HH:mm a')
    ];

    vm.purgeJobsDtOptions = DTOptionsBuilder.newOptions()
      .withOption('aLengthMenu', [10, 20, 30])
      .withPaginationType('full_numbers')
      .withDisplayLength(pageLength)
      .withOption('paging', true)
      .withOption('lengthChange', true)
      .withOption('order', [0, 'desc'])
      .withOption('columnDefs',
      [
        { 'type': 'moment-MM/DD/YYYY HH:mm a', 'targets': 0 }
      ])
      .withBootstrap()
      .withDOM('<<"pull-left"pl>f<t>i<"pull-left"p>>');

    $scope.$watch('domain', function(newVal, oldVal) {
      if (newVal !== undefined) {
        vm._loading = true;
        // NOTE: check for auto disable Purge ImageEngine Secondary Cache checkbox
        if (!!newVal.image_engine && newVal.image_engine.enable_image_engine !== true){
          $scope.purgeImageEngineSecondaryCache = false;
        }else{
          $scope.purgeImageEngineSecondaryCache = true;
        }
        vm.getPurgeJobs(newVal)
          .then(function(data) {
            vm.purgeJobsList = data;
          })
          .finally(function() {
            vm._loading = false;
          });
      }
    });
    /**
     * @name  refreshPurgeJobTable
     * @description
     *  Refresh table data for domain
     * @type {Object}
     */
    $scope.refreshPurgeJobTable = function(domain) {
      vm._loading = true;
      vm.getPurgeJobs(domain)
        .then(function(data) {
          vm.purgeJobsList = data;
        })
        .finally(function() {
          vm._loading = false;
        });
    };
    /**
     * Show modal dialog with Purge Job details
     *
     * @see {@link ConfirmModalInstanceCtrl}
     * @param {Object} purgeJob
     * @returns {*}
     */
    vm.showDetails = function(purgeJob) {
      // Need to clone object here not to overwrite defaults
      var _purgeJob = angular.copy(purgeJob);
      _purgeJob.request_json = _purgeJob.request_json;
      // Uses ConfirmModalInstanceCtrl. This controller has all needed methods
      // So no need to create a new one.
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'parts/cache/purge-details.modal.tpl.html',
        controller: 'ConfirmModalInstanceCtrl',
        size: 'md',
        resolve: {
          model: _purgeJob
        }
      });
      return modalInstance.result;
    };

    vm.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };

    $scope.$watch('$stateChangeSuccess', function () {
      document.getElementById('side-menu-sub-item__webApp-cache').classList.add('active');
    });
  }
})();

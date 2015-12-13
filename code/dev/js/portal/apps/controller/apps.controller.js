(function () {
  'use strict';

  angular
    .module('revapm.Portal.Apps')
    .controller('AppsController', AppsController);

  /*@ngInject*/
  function AppsController($scope,
                          User,
                                 Companies,
                                 Apps,
                                 CRUDController,
                                 $injector,
                                 $state,
                                 $stateParams,
                                 filterFilter,
                                 AlertService
  ) {
    //Invoking crud actions
    $injector.invoke(CRUDController,
       this, {$scope: $scope, $stateParams: $stateParams});

    //Set state (ui.router)
  //  $scope.setState('index.apps');

    $scope.setResource(Apps);
    $scope.$state = $state;
    // Fetch list of records
    $scope.$on('$stateChangeSuccess', function (state) {
      if($state.current.data.list){
        $scope.list().then(function (data) {
          $scope.apps = filterFilter(data,
            {app_platform: $state.current.data.platform}, true);
        });
      }
    });

    $scope.companies = [];
    $scope.model = {
      configs: [{}]
    };
    $scope.copyForEditor = {};
    $scope.obj = {
      data: {},
      options: {
        mode: 'code',
        modes: ['code', 'view'],
        error: function(err) {
          alert(err.toString());
        }
      }
    };



    $scope.model.account_id = $scope.auth.getUser().companyId[0];

    User.getUserDomains(true)
      .then(function (domains) {
        $scope.domainList = domains.map(function (d) {
          return d.domain_name;
        });
      });

    $scope.fetchCompanies = function(companyIds) {
      var promises = [];
      companyIds.forEach(function (id) {
        promises.push(Companies.get({id: id}).$promise);
      });
      $q.all(promises).then(function (data) {
        $scope.companies = data;
      });
    };

    $scope.switch = function (item){
      if(item.show === true ){
        item.show = false;
      }else{
        item.show = true;
      }
    };
    $scope.initEdit = function (id) {
      $scope.get(id)
        .then(function () {
          $scope.copyForEditor = _.clone($scope.model);
          delete $scope.copyForEditor.$promise;
          delete $scope.copyForEditor.$resolved;
          delete $scope.copyForEditor.id;
          delete $scope.copyForEditor.account_id;
          delete $scope.copyForEditor.app_platform;
          delete $scope.copyForEditor.sdk_key;
          delete $scope.copyForEditor.created_at;
          delete $scope.copyForEditor.updated_at;
          delete $scope.copyForEditor.updated_by;
          delete $scope.copyForEditor.created_by;
        })
        .catch(function (err) {
          $scope.alertService.danger('Could not load app details');
        });
    };

    $scope.initNew = function () {
      $scope.platforms = [
        {name: 'iOS', disabled: false},
        {name: 'Android', disabled: false},
        {name: 'Windows Mobile', disabled: true}
      ];
      var idx = _.findIndex($scope.platforms,
        {name: $state.current.data.platform});
      $scope.model.app_platform = $scope.platforms[idx];
    };

    if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
      // Loading list of companies
      Companies.query(function (list) {
        $scope.companies = list;
        if ($scope.companies.length === 1) {
          $scope.model.account_id = $scope.companies[0].id;
        }
      });
    } else if (!angular.isArray($scope.auth.getUser().companyId)) {
      $scope.model.account_id = $scope.auth.getUser().companyId;
    } else if ($scope.auth.getUser().companyId.length === 1) {
      $scope.model.account_id = $scope.auth.getUser().companyId[0];
    } else {
      $scope.fetchCompanies($scope.auth.getUser().companyId);
    }

    $scope.getApp = function(id) {
      $scope.get(id)
        .catch(function (err) {
          $scope.alertService.danger('Could not load domain details');
        });
    };

    $scope.createApp = function (model) {
      var modelCopy = _.clone(model);
      delete modelCopy.configs;
      modelCopy.app_platform = model.app_platform.name;
      $scope.create(modelCopy)
        .then(function () {
          $scope.alertService.success('App registered', 5000);
        });
    };

    $scope.cleanModel = function (model) {
        var modelCopy = _.clone(model);
        var params = {id: model.id};

        delete modelCopy.$promise;
        delete modelCopy.$resolved;
        delete modelCopy.id;
        delete modelCopy.app_name;
        delete modelCopy.account_id;
        delete modelCopy.app_platform;
        delete modelCopy.sdk_key;
        delete modelCopy.created_at;
        delete modelCopy.updated_at;
        delete modelCopy.updated_by;
        delete modelCopy.created_by;

        return modelCopy;
    };


    $scope.updateApp = function (model) {
      $scope.confirm('confirmUpdateModal.html', model).then(function () {
        $scope._loading = true;
        var params = {id: $scope.model.id};
        $scope.update(params, $scope.cleanModel(model))
          .then(function () {
            $scope.alertService.success('App updated', 5000);
          })
          .catch(function (err) {
            $scope
              .alertService
              .danger(err.data.message || 'Oops something went wrong', 5000);
          })
          .finally(function () {
            delete model.$promise;
            delete model.$resolved;
            delete model.$rejected;
            _.assign($scope.model, model);
            $scope._loading = false;
          });
      });
    };
    $scope.verify = function(model) {
      if (!model.id) {
        AlertService.danger('Please select app first');
        return;
      }
      $scope._loading = true;
      Apps.update({
          id: $scope.model.id,
          options: 'verify_only'
        }, $scope.cleanModel(model))
        .$promise
        .then(function(data) {
          $scope.alertService.success('App configuration is correct', 5000);
        })
        .catch(function(err) {
          AlertService.danger(err);
        })
        .finally(function() {
          $scope._loading = false;
        });
    };

    $scope.publish = function(model) {
      if (!$scope.model.id) {
        AlertService.danger('Please select app first');
        return;
      }
      $scope.confirm('confirmPublishModal.html', model).then(function () {
        $scope._loading = true;
        Apps.update({
            id: $scope.model.id,
            options: 'publish'
          }, $scope.cleanModel(model))
          .$promise
          .then(function(data) {
            $scope
            .alertService
            .success('Domain configuration is published', 5000);
          })
          .catch(function(err) {
            AlertService.danger(err);
          })
          .finally(function() {
            _.assign($scope.model, model);
            $scope._loading = false;
          });
      });
    };

    $scope.deleteApp = function(model) {
      $scope.confirm('confirmModal.html', model).then(function () {
        var appName = model.app_name;
        $scope
          .delete(model)
          .then(function (data) {
            $scope.alertService.success('App ' + appName + ' deleted.');
            $scope.list().then(function (data) {
              $scope.apps = filterFilter(data,
                {app_platform: $state.current.data.platform}, true);
            });
          })
          .catch(function (err) {
            $scope.alertService.danger(err);
          });
      });
    };

  }
})();

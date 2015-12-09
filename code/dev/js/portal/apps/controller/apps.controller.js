(function () {
  'use strict';

  angular
    .module('revapm.Portal.Apps')
    .controller('AppsController', AppsController);

  /*@ngInject*/
  function AppsController($scope,
                          User,
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

    // Fetch list of records
    $scope.$on('$stateChangeSuccess', function (state) {
      if($state.current.data.list){
        $scope.list().then(function (data) {
          $scope.apps = filterFilter(data,
            {app_platform: $state.current.data.platform}, true);
        });
      }
    });


   // $scope.list().then(function (data) {
    //  $scope.apps = filterFilter(data,
    //   {app_platform: $state.current.data.platform}, true);
   // });

    $scope.model = {
      configs: [{}]
    };

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
    $scope.model.configs.domains_while_list = [];
    $scope.model.configs.domains_black_list = [];
    User.getUserDomains(true)
      .then(function (domains) {
        $scope.domainList = domains.map(function (d) {
          return d.domain_name;
        });
      });
    $scope.protocols = ['standard', 'quic', 'rmp'];
    $scope.switch = function (item){
      if(item.show === true ){
        item.show = false;
      }else{
        item.show = true;
      }
    };
    $scope.initEdit = function (id) {
      $scope.get(id)
        .catch(function (err) {
          $scope.alertService.danger('Could not load domain details');
        });
      $scope.versions = [1];

    };

    $scope.initNew = function () {
      $scope.platforms = [
        {name: 'iOS', disabled: false},
        {name: 'Android', disabled: false},
        {name: 'Windows Mobile', disabled: true}
      ];
      $scope.model.app_platform = $scope.platforms[0];
    };

    $scope.toggleProtocolSelection = function (protocol) {
      var idx = $scope.model.configs[0]
      .allowed_transport_protocols
      .indexOf(protocol);

      // is currently selected
      if (idx > -1) {
        $scope.model.configs[0]
        .allowed_transport_protocols
        .splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.model.configs[0]
        .allowed_transport_protocols
        .push(protocol);
      }
    };

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

      return modelCopy;
    }
    $scope.updateApp = function (model) {
      var params = {id: model.id};
      $scope.update(params, $scope.cleanModel(model))
        .then(function () {
          $scope.alertService.success('App updated', 5000);
        })
        .catch(function (err) {
          $scope
          .alertService
          .danger(err.data.message || 'Oops something ment wrong', 5000);
        });
    };
    $scope.verify = function(model) {
      if (!model.id) {
        AlertService.danger('Please select app first');
        return;
      }
      $scope._loading = true;
      Apps.update({
          id: model.id,
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
      if (!model.id) {
        AlertService.danger('Please select app first');
        return;
      }
      $scope.confirm('confirmPublishModal.html', model).then(function () {
        $scope._loading = true;
        Apps.update({
            id: model.id,
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

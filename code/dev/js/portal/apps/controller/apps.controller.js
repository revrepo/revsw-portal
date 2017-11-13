(function () {
  'use strict';

  angular
    .module('revapm.Portal.Apps')
    .controller('AppsController', AppsController);

  /*@ngInject*/
  function AppsController($scope,
    $timeout,
    $anchorScroll,
    User,
    Companies,
    Apps,
    CRUDController,
    $injector,
    $state,
    $stateParams,
    $config,
    $localStorage,
    $q,
    $values) {
    //Invoking crud actions
    $injector.invoke(CRUDController,
      this, {
        $scope: $scope,
        $stateParams: $stateParams
      });

    //Set state (ui.router)
    $scope.setState('index.apps');

    $scope.setResource(Apps);

    $scope.NO_SPECIAL_CHARS = $config.PATTERNS.NO_SPECIAL_CHARS;
    $scope.COMMENT_NO_SPECIAL_CHARS = $config.PATTERNS.COMMENT_NO_SPECIAL_CHARS;

    /**
     * @name setAccountName
     * @description
     *
     */
    function setAccountName() {
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        // Loading list of companies
        return Companies.query(function (list) {
          _.forEach($scope.records, function (item) {
            var index = _.findIndex(list, {
              id: item.account_id
            });
            if (index >= 0) {
              item.companyName = list[index].companyName;
            }
          });
        });
      } else {
        return $q.when();
      }
    }

    $scope.$state = $state;
    $scope.appPlatform = !!$state.current.data ? $state.current.data.platform_code : '';
    //// Fetch list of records
    $scope.$on('$stateChangeSuccess', function (event, stateTo, stateParam) {
      var data = null;
      if ($state.is('index.accountSettings.accountresources')) {
        $scope.filter.limit = 5;
        var filters = {
          account_id: !User.getSelectedAccount() ? null : User.getSelectedAccount().acc_id
        };
        data = {
          filters: filters
        };
        // NOTE: call all types applications with filter
        $scope
          .list(data)
          .then(setAccountName);
        return;
      }

      if (!!stateTo.data && (stateTo.data.list !== undefined && stateTo.data.list === true)) {
        $scope._baseFilter = {
          app_platform: $state.current.data.platform_code
        };

        $scope
          .list(data)
          .then(setAccountName)
          .then(function () {
            if ($scope.elementIndexForAnchorScroll) {
              setTimeout(function () {
                $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
                $scope.$digest();
              }, 500);
            }
          });
      } else {
        if (!!stateParam.id && !stateParam.id) {
          $scope.params = $stateParams;
          $scope.initEdit($stateParams.id);
        }
      }
    });


    $scope.companies = [];
    $scope.model = {
      configs: [{}]
    };

    $scope.filterKeys = ['app_name', 'app_platform', 'companyName', 'last_app_published_version', 'updated_at'];


    $scope.getRelativeDate = function (datetime) {
      return moment.utc(datetime).fromNow();
    };

    $scope.model.account_id = $scope.auth.getUser().companyId[0];

    User.getUserDomains(true)
      .then(function (domains) {
        $scope.domainList = domains.map(function (d) {
          return d.domain_name;
        });
      });

    // $scope.fetchCompanies = function(companyIds) {
    //   var promises = [];
    //   companyIds.forEach(function(id) {
    //     promises.push(Companies.get({
    //       id: id
    //     }).$promise);
    //   });
    //   $q.all(promises).then(function(data) {
    //     $scope.companies = data;
    //   });
    // };

    $scope.switch = function (item) {
      if (item.show === true) {
        item.show = false;
      } else {
        item.show = true;
      }
    };

    $scope.initNew = function () {
      $scope.platforms = [{
        name: 'iOS',
        code: 'iOS',
        disabled: false
      }, {
        name: 'Android',
        code: 'Android',
        disabled: false
      }, {
        name: 'Windows Mobile',
        code: 'Windows_Mobile',
        disabled: false
      }];
      var idx = _.findIndex($scope.platforms, {
        code: $state.current.data.platform_code
      });
      $scope.model.app_platform = $scope.platforms[idx];

      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        $scope.model.account_id = null;
        Companies.query(function (list) {
          $scope.companies = list;
          $scope.setDefaultAccountId();
        });
      } else {
        $scope.setDefaultAccountId();
      }
    };

    $scope.createApp = function (model, isStay) {
      var modelCopy = _.clone(model);
      delete modelCopy.configs;
      modelCopy.app_platform = model.app_platform.code;
      $scope.create(modelCopy, isStay)
        .then(function (data) {
          model.app_name = '';
          model.comment = '';
          if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
            model.account_id = null;
          }
          $scope.alertService.success(data);
        })
        .catch($scope.alertService.danger);
    };

    $scope.deleteApp = function (model) {
      // NOTE: not delete if RO User
      if ($scope.isReadOnly() === true) {
        return;
      }
      $scope.confirm('confirmModal.html', model).then(function () {
        var appName = model.app_name;
        $scope
          .delete(model)
          .then($scope.alertService.success)
          .catch($scope.alertService.danger)
          .finally(function () {
            if ($scope.page.current > $scope.page.pages.length) {
              $scope.prevPage();
            }
          });
      });
    };

    $scope.storeToStorage = function (app) {
      var newApp = {
        app_id: app.id,
        id: app.id,
        app_name: app.app_name,
        sdk_key: app.sdk_key
      };
      $localStorage.selectedApplication = newApp;
    };

    $scope.switchKeyVisibility = function (item) {
      item.showKey = !item.showKey;
    };

    $scope.copyCallback = function (err) {
      if (err) {
        $scope.alertService.danger('Copying failed, please try manual approach', 2000);
      } else {
        $scope.alertService.success('The SDK key has been copied to the clipboard', 2000);
      }
    };

    $scope.onShowVideo = function (e, item) {
      var model = item;
      $scope.confirm('videoModal.html', model);
    };

  }
})();

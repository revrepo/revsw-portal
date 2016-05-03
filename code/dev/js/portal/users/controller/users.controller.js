(function() {
  'use strict';

  angular
    .module('revapm.Portal.Users')
    .controller('UsersCrudController', UsersCrudController);

  // @ngInject
  function UsersCrudController($scope, $q, CRUDController, Users, User, $injector, $stateParams, Companies, DomainsConfig, $state, $anchorScroll) {

    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    if ($scope.auth.isUser()) {
      $state.go('index.accountSettings.profile');
      return;
    }
    //Set state (ui.router)
    $scope.setState('index.accountSettings.users');

    $scope.setResource(Users);

    $scope.roles = ['user', 'admin'];
    // Adding additional user roles for RevAdmin
    if ($scope.auth.isRevadmin() || $scope.auth.isReseller()) {
      $scope.roles.push('reseller');
    }

    // $scope.filterKeys = ['firstname', 'lastname', 'email', 'role', 'updated_at', 'last_login_at'];

    $scope.companies = Companies.query();

    $scope.domains = DomainsConfig.query();

    if (!$scope.model) {
      initModel();
    }

    function initModel() {
      $scope.model = {
        theme: 'light',
        access_control_list: {
          dashBoard: true,
          reports: false,
          configure: false,
          test: false,
          readOnly: false
        }
      };
    }

    $scope.getUser = function(id) {
      $scope.get(id)
        .catch(function(err) {
          $scope.alertService.danger('Could not load user details');
        });
    };

    $scope.deleteUser = function(model) {
      $scope.confirm('confirmModal.html', model).then(function() {
        $scope
          .delete(model)
          .catch($scope.alertService.danger);
      });
    };

    $scope.updateUser = function(model) {
      if (!model) {
        return;
      }
      $scope.alertService.clear();
      // copy user id
      model.id = model.user_id;
      $scope
        .update(model)
        .then(function(data) {
          // NOTE: update current user info
          if (model.user_id === User.getUser().user_id) {
            User.reloadUser();
          }
          $scope.alertService.success('User updated', 5000);
        })
        .catch($scope.alertService.danger);
    };

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };

    $scope.createUser = function(model) {
      if (!model) {
        return;
      }
      if (model.passwordConfirm !== model.password) {
        $scope.alertService.danger('Passwords did not match', 5000);
        return;
      }
      $scope.alertService.clear();
      delete model.passwordConfirm;
      model.access_control_list.dashBoard = true;
      //      model.email = angular.copy(model.user_email);
      //      delete model.user_email;
      $scope.create(model)
        .then(function(data) {
          initModel();
          $scope.alertService.success('User created', 5000);
        })
        .catch($scope.alertService.danger);
    };

    $scope.disableSubmit = function(model, isEdit) {
      if ((User.isRevadmin() || User.isReseller()) && !model.companyId || (model.companyId && model.companyId.length === 0)) {
        return true;
      }

      if (isEdit) {
        return $scope._loading ||
          !model.email ||
          !model.access_control_list ||
          !model.firstname ||
          !model.lastname ||
          !model.role;
      } else {
        return $scope._loading ||
          !model.email ||
          !model.access_control_list ||
          !model.firstname ||
          !model.lastname ||
          !model.password ||
          !model.passwordConfirm ||
          !model.role;
      }
    };

    // Fetch list of users
    $scope.$on('$stateChangeSuccess', function(state) {
      $scope
        .list()
        .then(function setCompaniesName() {
          if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
            // Loading list of companies
            return Companies.query(function(list) {
              _.forEach($scope.records, function(item) {
                if (item.companyId.length === 1) {
                  var index = _.findIndex(list, {
                    id: item.companyId[0]
                  });
                  if (index >= 0) {
                    item.companyName = list[index].companyName;
                  }
                } else {
                  if (item.companyId.length > 1) {
                    item.companyName = '';
                    angular.forEach(item.companyId, function(account_id, key) {
                      var index = _.findIndex(list, {
                        id: account_id
                      });
                      if (index >= 0) {
                        if (key !== item.companyId.length && key !== 0) {
                          item.companyName = item.companyName + ', ';
                        }
                        item.companyName = item.companyName + list[index].companyName;
                      }
                    });
                  }
                }
              });
            });
          } else {
            return $q.when();
          }
        })
        .then(function() {
          if ($scope.elementIndexForAnchorScroll) {
            setTimeout(function() {
              $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
              $scope.$digest();
            }, 500);
          }
        });
    });
  }
})();

(function() {
  'use strict';

  angular
    .module('revapm.Portal.Users')
    .controller('UsersCrudController', UsersCrudController);

  // @ngInject
  function UsersCrudController($scope, CRUDController, Users, $injector, $stateParams, Companies, DomainsConfig, $state, $anchorScroll) {

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
    if ($scope.auth.isRevadmin()) {
      $scope.roles.push('reseller');
      $scope.roles.push('revadmin');
    }

    // $scope.filterKeys = ['firstname', 'lastname', 'email', 'role', 'updated_at', 'last_login_at'];

    $scope.companies = Companies.query();

    $scope.domains = DomainsConfig.query();

    if (!$scope.model) {
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
          $scope.alertService.danger('Could not load domain details');
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
      $scope.create(model)
        .then(function(data) {
          $scope.alertService.success('User created', 5000);
        })
        .catch($scope.alertService.danger);
    };
    // Fetch list of users
    $scope.$on('$stateChangeSuccess', function(state) {
      $scope
        .list()
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

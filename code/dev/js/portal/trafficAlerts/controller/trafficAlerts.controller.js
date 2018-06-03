(function () {
  'use strict';

  angular
    .module('revapm.Portal.TrafficAlerts')
    .controller('TrafficAlertsController', TrafficAlertsController);

  // @ngInject
  function TrafficAlertsController($scope, $q, NotificationLists, $uibModal,
    User, Users, AlertService, DomainsConfig, TrafficAlerts, Companies) {

    $scope.model = {};
    $scope.auth = User;
    $scope.alertService = AlertService;

    $scope.rule_types = [
      'spike'
    ];

    $scope.target_types = [
      'domain'
    ];

    NotificationLists.query({}).$promise.then(function (res) {
      $scope.notif_lists = res;
    })
      .catch(function (err) {
        AlertService.danger(err);
      });

    DomainsConfig.query().$promise.then(function (res) {
      $scope.domains = res;
    });

    Companies.query().$promise.then(function (res) {
      $scope.companies = res;
    });

    $scope.$watch('model.target_type', function (newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.targets = [];
        switch ($scope.model.target_type) {
          case 'domain':
            $scope.targets = [];
            for (var i = 0; i < $scope.domains.length; i++) {
              var domain = $scope.domains[i];
              domain.name = domain.domain_name;
              $scope.targets.push(domain);
            }
            break;
        }
      }
    });

    $scope.disableSubmit = function (model) {
      return !model ||
        !model.name ||
        !model.target_type ||
        !model.target ||
        !model.rule_type ||
        !model.rule_config ||
        !model.notifications_list_id;
    };

    $scope.clearForm = function () {
      $scope.model = {};
    };

    $scope.createAlert = function (model) {

      $scope._loading = true;

      if (!model || $scope.disableSubmit === true) {
        AlertService.danger('Please fill out the form before submitting');
        $scope._loading = false;
      }

      TrafficAlerts.create(model).$promise.then(function (res) {
        AlertService.success(res);
        $scope._loading = false;
      })
        .catch(function (err) {
          AlertService.danger(err);
          $scope._loading = false;
        });
    };

  }
})();

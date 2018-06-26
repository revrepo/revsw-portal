(function () {
  'use strict';

  angular
    .module('revapm.Portal.TrafficAlerts')
    .controller('TrafficAlertsController', TrafficAlertsController);

  // @ngInject
  function TrafficAlertsController($scope, $q, NotificationLists, $uibModal, $injector, $stateParams,
    User, Users, AlertService, DomainsConfig, TrafficAlerts, Companies, CRUDController) {

    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    $scope.setState('index.accountSettings.trafficAlerts');
    $scope.setResource(TrafficAlerts);

    $scope.model = {};
    $scope.auth = User;
    $scope.alertService = AlertService;

    $scope.rule_types = [
      'Spike',
      'Status Code Frequency'
    ];

    $scope.target_types = [
      'Domain'
    ];

    $scope.$watch('model.rule_type', function (newVal, oldVal) {
      if (newVal !== oldVal) {
        switch (newVal) {
          case 'Spike':
            if (!$scope.model.rule_config) {
              $scope.model.rule_config = {};
              $scope.model.rule_config.spike_direction = { key: 'Both', value: 'both' };
            }

            break;
        }
      }
    });

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
      if ($scope.records) {
        $scope.records.forEach(function (rule) {
          rule.companyName = $scope.companies.find(function (acc) {
            return acc.id === rule.account_id;
          }).companyName;
        });
      }
    });

    $scope.$on('$stateChangeSuccess', function () {
      $scope
        .list(null)
        .then(function (res) {
          /*if (res && res.length > 0) {
            res.forEach(function (rule) {
              TrafficAlerts.status({ id: rule.id }).$promise.then(function (res_) {
                rule.fileStatus = res_.status;
              });
            });
          }*/
        });
    });

    $scope.$watch('model.target_type', function (newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.targets = [];
        switch ($scope.model.target_type) {
          case 'Domain':
            if ($scope.domains) {
              $scope.targets = [];
              for (var i = 0; i < $scope.domains.length; i++) {
                var domain = $scope.domains[i];
                domain.name = domain.domain_name;
                $scope.targets.push(domain);
              }
            } else {
              DomainsConfig.query().$promise.then(function (res) {
                $scope.domains = res;
                $scope.targets = [];
                for (var i = 0; i < $scope.domains.length; i++) {
                  var domain = $scope.domains[i];
                  domain.name = domain.domain_name;
                  $scope.targets.push(domain);
                }
              });
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

    $scope.prepModelForAPI = function (model) {
      switch (model.rule_type) {
        case 'Status Code Frequency':
          model.rule_type = 'statusCode_frequency';
          break;
        default:
          break;
      }

      return model;
    };

    $scope.createAlert = function (model) {

      model = $scope.prepModelForAPI(model);

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

    $scope.updateAlert = function (model) {

      model = $scope.prepModelForAPI(model);

      $scope._loading = true;

      if (!model || $scope.disableSubmit === true) {
        AlertService.danger('Please fill out the form before submitting');
        $scope._loading = false;
      }

      TrafficAlerts.update(model).$promise.then(function (res) {
        AlertService.success(res);
        $scope._loading = false;
      })
        .catch(function (err) {
          AlertService.danger(err);
          $scope._loading = false;
        });
    };

    $scope.setModel = function (id) {
      TrafficAlerts.get({ id: id }).$promise.then(function (res) {
        $scope.model = JSON.parse(JSON.stringify(res));
        var targetType = $scope.model.target_type.split('');
        targetType[0] = targetType[0].toUpperCase();
        $scope.model.target_type = targetType.join('');
        $scope.model.rule_type = res.rule_type;
        $scope.model.rule_config = res.rule_config;
      });
    };

    $scope.deleteConfig = function (model) {
      if ($scope.isReadOnly() === true) {
        return;
      }

      $scope.confirm('confirmModal.html', model)
        .then(function () {
          $scope
            .delete(model)
            .then($scope.alertService.success)
            .catch($scope.alertService.danger);
        });
    };

    $scope.getRelativeDate = function (datetime) {
      return moment.utc(datetime).fromNow();
    };

    $scope.silenceRule = function (model) {
      model = $scope.prepModelForAPI(model);

      var _model = JSON.parse(JSON.stringify(model));

      _model.silenced = true;

      $scope._loading = true;

      if (!_model) {
        return false;
      }

      TrafficAlerts.update(_model).$promise.then(function (res) {
        AlertService.success('Successfully silenced the alert configuration');
        model.silenced = true;
        $scope._loading = false;
      })
        .catch(function (err) {
          AlertService.danger('Error silencing the alert configuration, ' + err);
          $scope._loading = false;
        });
    };

    $scope.unSilenceRule = function (model) {
      model = $scope.prepModelForAPI(model);

      var _model = JSON.parse(JSON.stringify(model));

      _model.silenced = false;

      $scope._loading = true;

      if (!_model) {
        return false;
      }

      TrafficAlerts.update(_model).$promise.then(function (res) {
        AlertService.success('Successfully unsilenced the alert configuration');
        model.silenced = false;
        $scope._loading = false;
      })
        .catch(function (err) {
          AlertService.danger('Error unsilencing the alert configuration, ' + err);
          $scope._loading = false;
        });
    };
  }
})();

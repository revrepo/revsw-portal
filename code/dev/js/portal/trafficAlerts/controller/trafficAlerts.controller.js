(function () {
  'use strict';

  angular
    .module('revapm.Portal.TrafficAlerts')
    .controller('TrafficAlertsController', TrafficAlertsController);

  // @ngInject
  function TrafficAlertsController($scope, $state, $interval, NotificationLists, $uibModal, $injector, $stateParams,
    User, AlertService, DomainsConfig, TrafficAlerts, Companies, CRUDController, $config) {

    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    $scope.setState('index.accountSettings.trafficAlerts');
    $scope.setResource(TrafficAlerts);

    $scope.model = {};
    $scope.auth = User;
    $scope.alertService = AlertService;

    $scope.ruleTypes = $config.TRAFFIC_ALERTS_RULE_TYPES;
    $scope.target_types = [
      'Domain'
    ];

    $scope.$watch('model.rule_type', function (newVal, oldVal) {
      if (newVal !== oldVal) {
        switch (newVal) {
          case 'Spike':
            if (!$scope.model.rule_config) {
              $scope.model.rule_config = {};
              $scope.model.rule_config.spike_direction = {
                key: 'Both',
                value: 'both'
              };
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
      if ($state.is($scope.state)) {
        $scope
          .list(null)
          .then(function (res) {
            $scope.autoRefresh({
              autorefresh: $config.TRAFFIC_ALERTS_TIME_REFRESH_SEC
            });
            /*if (res && res.length > 0) {
              res.forEach(function (rule) {
                TrafficAlerts.status({ id: rule.id }).$promise.then(function (res_) {
                  rule.fileStatus = res_.status;
                });
              });
            }*/
          });
      } else {
        $scope.autoRefresh();
      }
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
      return $scope._loading ||
        !model ||
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
      // NOTE: use this place for make additional cheks and transformations
      return model;
    };

    $scope.createAlert = function (model) {

      model = $scope.prepModelForAPI(model);

      if (!model || $scope.disableSubmit(model) === true) {
        AlertService.danger('Please fill out the form before submitting');
      }

      $scope._loading = true;
      $scope
        .create(model)
        .then($scope.alertService.success)
        .catch($scope.alertService.danger)
        .finally(function () {
          $scope._loading = false;
        });
    };

    $scope.updateAlert = function (model) {

      model = $scope.prepModelForAPI(model);

      if (!model || $scope.disableSubmit(model) === true) {
        AlertService.danger('Please fill out the form before submitting');
      }

      $scope._loading = true;
      $scope.update(model)
        .then(function (res) {
          $scope.alertService.success(res);
          // $scope.setModel($scope.model.id); // TODO: is it need ???
        })
        .catch($scope.alertService.danger)
        .finally(function () {
          $scope._loading = false;
        });
    };

    $scope.setModel = function (id) {
      // TrafficAlerts.get({
      //   id: id
      // }).$promise
      $scope.get(id)
        .then(function (res) {
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

    $scope.silenceRule = function (model) {

      var modalInstance = $uibModal.open({
        templateUrl: 'parts/trafficAlerts/silenceRule.html',
        controller: 'SilenceRuleController',
        size: 'md',
        resolve: {
          model: model
        }
      });

      modalInstance.result.then(function (result) {

        model = $scope.prepModelForAPI(model);

        var _model = JSON.parse(JSON.stringify(model));

        _model.silenced = true;
        _model.silence_until = $scope.getSilenceDate(result);

        if (!_model) {
          return false;
        }
        $scope._loading = true;
        $scope.update(_model)
          .then(function (res) {
            $scope.alertService.success('Successfully silenced the alert configuration');
            model.silenced = true;
            model.silence_until = $scope.getSilenceDate(result);
          })
          .catch(function () {
            $scope.alertService.danger('Error silencing the alert configuration, ' + err);
          })
          .finally(function () {
            $scope._loading = false;
          });
      });
    };

    $scope.unSilenceRule = function (model) {
      model = $scope.prepModelForAPI(model);

      var _model = JSON.parse(JSON.stringify(model));

      _model.silenced = false;
      _model.silence_until = null;

      if (!_model) {
        return false;
      }

      $scope._loading = true;
      $scope.update(_model)
        .then(function (res) {
          $scope.alertService.success('Successfully unsilenced the alert configuration');
          model.silenced = false;
          model.silence_until = null;
        })
        .catch(function () {
          $scope.alertService.danger('Error silencing the alert configuration, ' + err);
        })
        .finally(function () {
          $scope._loading = false;
        });
    };

    $scope.getSilenceDate = function (result) {
      if (!result) {
        return;
      }

      switch (result) {
        case '2hours':
        case '4hours':
        case '6hours':
        case '12hours':
        case '24hours':
          return moment(Date.now()).add(result.split('h')[0], 'hours');
        case '7days':
          return moment(Date.now()).add(7, 'days');
        case 'forever':
          return null;
      }
    };

    $scope.getSilencedUntil = function (silenced_until) {
      if (!silenced_until) {
        return 'This alert is silenced forever';
      }

      return 'This alert will be automatically unsilenced ' + moment.utc(silenced_until).fromNow();
    };

    $scope.isAccountSilenced = function () {
      var acc = User.getAccount();
      return acc.silence_alerts;
    };

    $scope.accountSilenceUntil = function () {
      return;
    };

    /**
     * @name onClickRefresh
     * @description update data on page
     */
    $scope.onClickRefresh = function () {
      $scope.$emit('list');
      $scope.autoRefresh({
        autorefresh: $config.TRAFFIC_ALERTS_TIME_REFRESH_SEC
      });
    };

    var timeReload;
    /**
     * @name  autoRefresh
     * @description
     * @param  {Object} option
     * @return
     */
    $scope.autoRefresh = function (option) {
      if (!!timeReload) {
        $interval.cancel(timeReload);
      }

      if (!!option && !!option.autorefresh && option.autorefresh !== '') {
        timeReload = $interval(
          function () {
            if ($state.current.name !== 'index.accountSettings.trafficAlerts') {
              // NOTE: don't run auto refresh if type of the page is changed
              return;
            }
            $scope.$emit('list');
            $scope.autoRefresh(option);
          }, option.autorefresh * 1000, 1);
      }
    };
  }
})();

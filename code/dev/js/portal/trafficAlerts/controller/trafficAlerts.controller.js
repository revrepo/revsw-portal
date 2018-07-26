(function() {
  'use strict';

  angular
    .module('revapm.Portal.TrafficAlerts')
    .controller('TrafficAlertsController', TrafficAlertsController);

  /*@ngInject*/
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
    $scope.notif_lists = [];
    $scope.companies = [];
    $scope.domains = [];

    $scope.ruleTypes = $config.TRAFFIC_ALERTS_RULE_TYPES;
    $scope.targetTypes = $config.TRAFFIC_ALERTS_TARGET_TYPES;

    $scope.$watch('model.rule_type', function(newVal, oldVal) {
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
    // NOTE: add additional actions for this controller (@see CRUDController)
    $scope.dependencies.push({
      companies: Companies.query().$promise
        .then(function(data) {
          return _.sortBy(data, 'companyName');
        })
        .then(function(data) {
          $scope.companies = data;
          return data;
        })
    });
    $scope.dependencies.push({
      domains: DomainsConfig.query().$promise
        .then(function(data) {
          return _.sortBy(data, 'domain_name');
        })
        .then(function(data) {
          $scope.domains = data;
          return data;
        })
    });
    $scope.dependencies.push({
      notif_lists: NotificationLists.query({}).$promise
        .then(function(data) {
          $scope.notif_lists = data;
          return data;
        })
    });

    // NOTE: additional action after load list and additional data (@see CRUDController)
    $scope.dependenciesListAction = function(data) {
      if ($scope.records) {
        $scope.records.forEach(function(rule) {
          rule.companyName = data.companies.find(function(acc) {
            return acc.id === rule.account_id;
          }).companyName;
        });
      }
    };

    /**
     * @name  dependencies
     * @description
     *  Release controller data dependencies
     * @return {Promise}
     */
    $scope.$on('$stateChangeSuccess', function() {
      if ($state.is($scope.state)) {
        $scope
          .list(null)
          // .then(function(dictionaries) {
          //   /*if (res && res.length > 0) {
          //     res.forEach(function (rule) {
          //       TrafficAlerts.status({ id: rule.id }).$promise.then(function (res_) {
          //         rule.fileStatus = res_.status;
          //       });
          //     });
          //   }*/
          // })
          .then(function() {
            $scope.autoRefresh({
              autorefresh: $config.TRAFFIC_ALERTS_TIME_REFRESH_SEC
            });
          });
      } else {
        $scope.autoRefresh();
        if ($state.includes($scope.state + '.*')) {
          if ($scope.companies.length === 0 || $scope.domains.length === 0 || $scope.notif_lists.length === 0) {
            $scope._loading = true;
            $scope.dependenciesData()
              .finally(function() {
                $scope._loading = false;
              });
          }
        }
      }
    });

    $scope.disableSubmit = function(model) {
      return $scope._loading ||
        !model ||
        !model.name ||
        !model.target_type ||
        !model.target ||
        !model.rule_type ||
        !model.rule_config ||
        !model.notifications_list_id;
    };

    $scope.clearForm = function() {
      $scope.model = {};
    };

    $scope.prepModelForAPI = function(model) {
      // NOTE: use this place for make additional cheks and transformations
      return model;
    };

    $scope.createAlert = function(model) {

      model = $scope.prepModelForAPI(model);

      if (!model || $scope.disableSubmit(model) === true) {
        AlertService.danger('Please fill out the form before submitting');
      }

      $scope._loading = true;
      $scope
        .create(model)
        .then($scope.alertService.success)
        .catch($scope.alertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
    };

    $scope.updateAlert = function(model) {

      model = $scope.prepModelForAPI(model);

      if (!model || $scope.disableSubmit(model) === true) {
        $scope.alertService.danger('Please fill out the form before submitting');
      }

      $scope._loading = true;
      $scope.update(model)
        .then(function(res) {
          $scope.alertService.success(res);
          $scope.getTrafficAlert($scope.model.id);
        })
        .catch($scope.alertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
    };

    /**
     * @name getTrafficAlert
     * @description get data from server by id
     *
     * @param {string} id
     */
    $scope.getTrafficAlert = function(id) {
      $scope.get(id)
        .catch($scope.alertService.danger);
    };

    $scope.deleteConfig = function(model) {
      if ($scope.isReadOnly() === true) {
        return;
      }

      $scope.confirm('confirmModal.html', model)
        .then(function() {
          $scope
            .delete(model)
            .then($scope.alertService.success)
            .catch($scope.alertService.danger);
        });
    };

    $scope.silenceRule = function(model) {

      var modalInstance = $uibModal.open({
        templateUrl: 'parts/trafficAlerts/silenceRule.html',
        controller: 'SilenceRuleController',
        size: 'md',
        resolve: {
          model: model
        }
      });

      modalInstance.result.then(function(result) {

        model = $scope.prepModelForAPI(model);

        var _model = JSON.parse(JSON.stringify(model));

        _model.silenced = true;
        _model.silence_until = $scope.getSilenceDate(result);

        if (!_model) {
          return false;
        }
        $scope._loading = true;
        $scope.update(_model)
          .then(function(res) {
            $scope.alertService.success('Successfully silenced the alert configuration');
            model.silenced = true;
            model.silence_until = $scope.getSilenceDate(result);
          })
          .catch(function() {
            $scope.alertService.danger('Error silencing the alert configuration, ' + err);
          })
          .finally(function() {
            $scope._loading = false;
          });
      });
    };

    $scope.unSilenceRule = function(model) {
      model = $scope.prepModelForAPI(model);

      var _model = JSON.parse(JSON.stringify(model));

      _model.silenced = false;
      _model.silence_until = null;

      if (!_model) {
        return false;
      }

      $scope._loading = true;
      $scope.update(_model)
        .then(function(res) {
          $scope.alertService.success('Successfully unsilenced the alert configuration');
          model.silenced = false;
          model.silence_until = null;
        })
        .catch(function() {
          $scope.alertService.danger('Error silencing the alert configuration, ' + err);
        })
        .finally(function() {
          $scope._loading = false;
        });
    };

    $scope.getSilenceDate = function(result) {
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

    $scope.getSilencedUntil = function(silenced_until) {
      if (!silenced_until) {
        return 'This alert is silenced forever';
      }

      return 'This alert will be automatically unsilenced ' + moment.utc(silenced_until).fromNow();
    };

    $scope.isAccountSilenced = function() {
      var acc = User.getAccount();
      return acc.silence_alerts;
    };

    $scope.accountSilenceUntil = function() {
      return;
    };

    /**
     * @name onClickRefresh
     * @description update data on page
     */
    $scope.onClickRefresh = function() {
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
    $scope.autoRefresh = function(option) {
      if (!!timeReload) {
        $interval.cancel(timeReload);
      }

      if (!!option && !!option.autorefresh && option.autorefresh !== '') {
        timeReload = $interval(
          function() {
            if ($state.current.name !== 'index.accountSettings.trafficAlerts') {
              // NOTE: don't run auto refresh if type of the page is changed
              return;
            }
            $scope.$emit('list');
            $scope.autoRefresh(option);
          }, option.autorefresh * 1000, 1);
      }
    };
    // NOTE: method return Notification List only for current Account Id
    $scope.getNotificationList = function() {
      var account_id = $scope.model.account_id;
      return _.sortBy(_.filter($scope.notif_lists, function(item) {
        return (!!account_id && account_id.indexOf(item.account_id) > -1);
      }), 'list_name');
    };
    /**
     * @name  getAccountsDomainNameList
     * @description method get array of domains for selected Account
     *
     * @param  {[type]} account_id [description]
     * @return {Array}            [description]
     */
    $scope.getAccountsDomainNameList = function() {
      var domains = [];
      var account_id = $scope.model.account_id;
      if (!angular.isArray(account_id)) {
        account_id = [account_id];
      }
      if (angular.isArray(account_id)) {
        angular.forEach(account_id, function(account_id) {
          angular.forEach(_.findByValues($scope.domains, 'account_id', account_id)
            .map(function(item) {
              return item;
            }),
            function(item) {
              domains.push(item);
            });
        });
      }
      $scope.domainPlaceholder = (domains.length > 0) ? 'Select domains...' : 'Domains list is empty...';
      return _.sortBy(_.uniq(domains), 'domain_name');
    };

    /**
     * @name onAccountSelect
     * @description action after user change Account
     * @param {*} model
     */
    $scope.onAccountSelect = function(model) {
      $scope.model.target = '';
      $scope.model.notifications_list_id = '';
    };
  }
})();

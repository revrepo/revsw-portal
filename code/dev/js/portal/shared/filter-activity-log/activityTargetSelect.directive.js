(function() {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('activityTargetSelect', activityTargetSelect)
    .service('ActivityTargetListService', ActivityTargetListService)
    .run( /*ngInject*/ function($timeout, $rootScope, ActivityTargetListService) {
      $rootScope.$on('update:searchData', function() {
        // NOTE: list will update
        $timeout(ActivityTargetListService.init, 300);        
      });
      $rootScope.$on('clear-all', function(event, args) {
        ActivityTargetListService.clear();
      });
    });

  function ActivityTargetListService($q, DomainsConfig, Companies, Users, User, Apps, DashboardSrv, ApiKeys, DNSZones) {
    'ngInject';
    var service = this;  
    this.init = function() {
      var def = $q.defer();
      service.data.length = 0;
      service.data.push({ id: null, name: 'All Activity Targets', targetType: null });

      if (!User.isAuthed()) {
        return $q.when(service.data);
      }

      DomainsConfig.query().$promise.then(function(data) {
        data.forEach(function(item) {
          var name_ = item.domain_name + ' (Domain Configuration)';
          service.data.push({ id: item.id, accountId: item.account_id, name: name_, targetType: 'domain' });
        });
      });

      Companies.query().$promise.then(function(data) {
        data.forEach(function(item) {
          var name_ = item.companyName + ' (Account)';
          service.data.push({ id: item.id, accountId: item.account_id, name: name_, targetType: 'account' });
        });
      });

      Users.query().$promise.then(function(data) {
        data.forEach(function(item) {
          var name_ = item.firstname + ' ' + item.lastname + '(' + item.email + ')';
          service.data.push({ id: item.user_id, name: name_, targetType: 'user' });
        });
      });

      Apps.query().$promise.then(function(data) {
        data.forEach(function(item) {
          var name_ = item.app_name + ' (App)';
          service.data.push({ id: item.id, accountId: item.account_id, name: name_, targetType: 'app' });
        });
      });

      ApiKeys.query().$promise.then(function(data) {
        data.forEach(function(item) {
          var name_ = item.key_name + ' (API Key)';
          service.data.push({ id: item.id, accountId: item.account_id, name: name_, targetType: 'apikey' });
        });
      });
      DNSZones.query().$promise.then(function(data) {
        data.forEach(function(item) {
          var name_ = item.zone + '(DNS Zone)';
          service.data.push({ id: item.id, accountId: item.account_id, name: name_, targetType: 'dnszone' });
        });
      });
      // TODO: not released auditlog
      // DashboardSrv.getAll().then(function(data) {
      //   data.forEach(function(item) {
      //     var name_ = item.title + '(Dashboard)';
      //     item.targetType = 'dashboard';
      //     item.name = name_;
      //     service.data.push(item);
      //   });
      // });
      return def.promise;
    };

    this.clear = function() {
      this.data.length = 0;
      this.data = [];
      return $q.when([]);
    };

    this.data = [];

    return this;
  }
  /*@ngInject*/
  function activityTargetSelect(User, $localStorage, AlertService, ActivityTargetListService) {
    return {
      restrict: 'E',
      templateUrl: 'parts/shared/filter-activity-log/activity-target-select.tpl.html',
      scope: true,
      replace: true,
      bindToController: {
        activityTarget: '=ngModel',
        targetType: '@',
        accountId: '@',
        onSelect: '&'
      },
      controllerAs: '$ctrl',
      controller: /*@ngInject*/ function($scope, ActivityTargetListService) {
        var $ctrl = this;
        $ctrl.activityTargetList = ActivityTargetListService.data;
        if ($ctrl.activityTargetList.length === 0) {
          ActivityTargetListService.init();
        }
        $ctrl.filterAccountAndAllItem = function(item) {
          // item 'All Activity Targets' need to be in always in list
          if (item.id === null) {
            return true;
          }
          if ($ctrl.targetType !== '' && $ctrl.targetType !== item.targetType) {
            return false;
          }
          if ($ctrl.accountId !== '') {
            if (angular.isArray(item.accountId)) {
              return (item.accountId.indexOf($ctrl.accountId) !== -1);
            } else {
              return item.accountId === $ctrl.accountId;
            }
          } else {
            return true;
          }
          return false;
        };
        // if changing targetType then need to change activityTarget
        $scope.$watch(function() {
            return $ctrl.targetType;
          },
          function(newVal) {
            if (newVal === '' || (!!$ctrl.activityTarget && $ctrl.activityTarget.targetType !== newVal)) {
              $ctrl.activityTarget = null;
            }
          });
        // if changing accountId then need to change activityTarget
        $scope.$watch(function() {
            return $ctrl.accountId;
          },
          function(newVal) {
            if (newVal === '' || (!!$ctrl.activityTarget && $ctrl.activityTarget.accountId !== newVal)) {
              $ctrl.activityTarget = null;
            }
          });
      }
    };
  }
})();

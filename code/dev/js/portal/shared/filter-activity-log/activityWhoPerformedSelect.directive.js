(function() {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('activityWhoPerformedSelect', activityWhoPerformedSelect)
    .service('ActivityWhoPerformedListService', ActivityWhoPerformedListService)
    .run( /*ngInject*/ function($timeout, $rootScope, ActivityWhoPerformedListService) {
      $rootScope.$on('update:searchData', function() {
        // NOTE: list will updated
        $timeout(ActivityWhoPerformedListService.init, 300);
      });
    });

  function ActivityWhoPerformedListService($q, DomainsConfig, Companies, Users, User, Apps, DashboardSrv, ApiKeys, DNSZones) {
    'ngInject';
    var service = this;
    this.init = function() {
      var def = $q.defer();
      service.data.lenght = 0;
      service.data.push({ id: null, name: 'All Users and All API Keys', userType: 'all' });
      if (!User.isAuthed()) {
        return $q.when(service.data);
      }

      Users.query().$promise
        .then(function(data) {
          data.forEach(function(item) {
            var name_ = item.firstname + ' ' + item.lastname + ' (' + item.email + ')';
            service.data.push({ id: item.user_id, userType: 'user', name: name_, accountId: item.companyId });
          });
        });

      ApiKeys.query().$promise
        .then(function(data) {
          data.forEach(function(item) {
            var name_ = item.key_name + ' (API Key)';
            service.data.push({ id: item.id, userType: 'apikey', name: name_, accountId: item.account_id });
          });
        });
      def.resolve();
      return def.promise;
    };

    this.clear = function() {
      this.data.lenght = 0;
      return $q.when([]);
    };

    this.data = [];
    return this;
  }
  /*@ngInject*/
  function activityWhoPerformedSelect(User, $localStorage, AlertService, ActivityWhoPerformedListService) {
    return {
      restrict: 'E',
      templateUrl: 'parts/shared/filter-activity-log/activity-who-performed-select.tpl.html',
      scope: true,
      replace: true,
      bindToController: {
        whoPerformed: '=ngModel'
      },
      controllerAs: '$ctrl',
      controller: /*@ngInject*/ function($scope, ActivityWhoPerformedListService) {
        var $ctrl = this;
        $ctrl.whoPerformedList = ActivityWhoPerformedListService.data;
        if ($ctrl.whoPerformedList.length === 0) {
          ActivityWhoPerformedListService.init();
        }

      }
    };
  }
})();

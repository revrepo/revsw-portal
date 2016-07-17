(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .directive('subscriptionSummary', function() {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          subscription: '=ngModel'
        },
        templateUrl: '/parts/profile/directives/subscription-summary.tpl.html',
        controller: /*ngInject*/ function($scope, $config) {
          $scope.SudscriptionStates = $config.SUBSCRIPTION_STATES;
        }
      };
    });
})(angular);

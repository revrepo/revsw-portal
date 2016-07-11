(function() {
  'use strict';

  angular.module('revapm.Portal.DNSZoneRecords')
    .directive('dnsZoneRecordAnswer', dnsZoneRecordAnswer)
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/dns_zone_records/dns-zone-record-answer/dns-zone-record-answer.tpl.html', true);
    });
  /**
   * @name  dnsZoneRecordAnswer
   * @description
   *
   * @return {Object}
   */
  function dnsZoneRecordAnswer() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        recordAnswer: '=ngModel',
        recordType: '@recordType'
      },
      templateUrl: 'parts/dns_zone_records/dns-zone-record-answer/dns-zone-record-answer.tpl.html',
      controllerAs: '$ctrl',
      controller: function dnsZoneRecordAnswerController($scope, DNSZoneRecordsAnswerParser) {
        'ngInject';
        var $ctrl = this;
        if (this.recordAnswer) {
          this.newanswer = DNSZoneRecordsAnswerParser.unparse(this.recordType, this.recordAnswer);
        }

        $scope.$watch(function() {
          return $ctrl.newanswer;
        }, function(newVal, oldVal) {
          _.extend($ctrl.recordAnswer.answer, DNSZoneRecordsAnswerParser.parse($ctrl.recordType, newVal));
        }, true);

      }
    };
  }
})();

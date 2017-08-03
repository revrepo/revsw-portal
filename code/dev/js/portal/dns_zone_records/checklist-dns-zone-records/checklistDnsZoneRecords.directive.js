(function() {
  'use strict';

  angular.module('revapm.Portal.DNSZoneRecords')
    .directive('checklistDnsZoneRecords', checklistDnsZoneRecords)
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/dns_zone_records/dns-zone-record-answer/dns-zone-record-answer.tpl.html', true);
    });
  /**
   * @name  checklistDnsZoneRecords
   * @description
   *
   * @return {Object}
   */
  function checklistDnsZoneRecords() {
    return {
      restrict: 'EA',
      replace: true,
      scope: true,
      bindToController: {
        recordsList: '=ngModel',
        dnsZoneId: '@'
      },
      templateUrl: 'parts/dns_zone_records/checklist-dns-zone-records/checklist-dns-zone-records.tpl.html',
      controllerAs: '$ctrl',
      controller: function checklistDnsZoneRecordsController($scope, DNSZoneRecords, DNSZoneRecordsAnswerParser) {
        'ngInject';
        var $ctrl = this;

        angular.forEach($ctrl.recordsList, function(item) {
          // NOTE: set for all items default properties
          item.$$isExists = false;
          item.$$isSelected = !true;
        });
      }
    };
  }
})();

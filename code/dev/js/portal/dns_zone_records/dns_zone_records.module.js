(function(angular) {
  'use strict';

  angular.module('revapm.Portal.DNSZoneRecords', [
      'ngStorage',
      'revapm.Portal.Shared',
      'revapm.Portal.Config',
      'revapm.Portal.Resources',
      'ui.router',
      'ui.select',
      'ng.jsoneditor',
      'ngSanitize',
      'toggle-switch',
      'toaster'
    ])
    .factory('DNSZoneRecordsAnswerParser', DNSZoneRecordsAnswerParser)
    .filter('mergearray', function() {
      //  'ngInject';
      var sep = null;
      return function(arr) {
        if (!arr) {
          return null;
        }
        if (sep == null) { sep = ' '; }
        return arr.join(sep);
      };
    })
    .filter('answerlist', ['$filter', function($filter, n) {
      return function(answers, n) {
        var shortlist = answers;
        if (n) { shortlist = $filter('limitTo')(answers, n); }
        var out = shortlist.join(', ');
        if (shortlist.length < answers.length) {
          out += ', ...';
        }
        return out;
      };
    }]);

  function DNSZoneRecordsAnswerParser($config) {
    'ngInject';
    var DNS_CONST = $config.DNS_DEFAULT_VALUES;
    return {
      parse: function(type, answer) {
        switch (type) {
          case 'AFSDB':
            return new Array(answer.subtype, answer.host);
          case 'HINFO':
            return new Array(answer.hardware, answer.os);
          case 'MX':
            // NOTE: constructtion "new Array(answer.priority || DNS_CONST.MX_PRIORITY, answer.host)"
            // NOTE: not will be work if "answer.priority" equal 0(zero)
            if(answer.priority === undefined) {
              answer.priority = DNS_CONST.MX_PRIORITY;
            }
            return new Array(answer.priority, answer.host);
          case 'NAPTR':
            return new Array(answer.order, answer.preference, answer.flags, answer.service, answer.regexp, answer.replacement);
          case 'RP':
            return new Array(answer.email, answer.txt_dname);
          case 'SRV':
            if(answer.priority === undefined) {
              answer.priority = DNS_CONST.SRV_PRIORITY;
            }
            if(answer.weight === undefined) {
              answer.weight = DNS_CONST.SRV_WEIGHT;
            }
            if(answer.port === undefined) {
              answer.port =  DNS_CONST.SRV_PORT;
            }
            return new Array(answer.priority, answer.weight, answer.port, answer.host);
          default:
            return new Array(answer.value);
        }
      },
      unparse: function(type, answer) {
        var a = answer.answer;
        switch (type) {
          case 'AFSDB':
            return {
              subtype: a[0],
              host: a[1]
            };
          case 'HINFO':
            return {
              hardware: a[0],
              os: a[1]
            };
          case 'MX':
            return {
              priority: a[0],
              host: a[1]
            };
          case 'NAPTR':
            return {
              order: a[0],
              preference: a[1],
              flags: a[2],
              service: a[3],
              regexp: a[4],
              replacement: a[5]
            };
          case 'RP':
            return {
              email: a[0],
              txt_dname: a[1]
            };
          case 'SRV':
            return {
              priority: a[0],
              weight: a[1],
              port: a[2],
              host: a[3]
            };
          default:
            return {
              value: a[0]
            };
        }
      }
    };
  }
})(angular);

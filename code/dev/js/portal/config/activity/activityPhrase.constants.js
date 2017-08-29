(function () {
  'use strict';

  angular
    .module('revapm.Portal.Config')
    .constant('ActivityPhrase', {

      /**
       * List of phrases for activity type.
       *
       * @see {@link https://github.com/revrepo/revsw-api/blob/master/node_modules/revsw-audit/lib/schema.js}
       */
      ACTIVITY_TYPE: {
        'add': 'Added',
        'modify': 'Modified',
        'delete': 'Deleted',
        'publish': 'Published',
        'login': 'Logged In',
        'purge': 'Purged',
        'init2fa': 'Initialized 2FA',
        'enable2fa': 'Enabled 2FA',
        'disable2fa': 'Disabled 2FA',
        'resetpassword': 'Password Reset',
        'signup': 'Signed Up',
        'verify': 'Verified Domain Control',
        'verify_email': 'Verified Email Address'
      },

      /**
       * List of phrases for activity target.
       *
       * @see {@link https://github.com/revrepo/revsw-api/blob/master/node_modules/revsw-audit/lib/schema.js}
       */
      ACTIVITY_TARGET: {
        'user': 'User',
        'account': 'Company',
        'domain': 'Domain',
        'apikey': 'API Key',
        'app': 'App',
        'sslcert': 'SSL Certificate',
        'logshippingjob': 'Log Shipping Job',
        'sslname': 'SSL Name',
//        'object': 'Object',
        'dnszone':'DNS Zone',
        'dnsrecord': 'DNS Zone Record',
        'wafrule': 'WAF Rule'
      },
      /**
       * @name  EVENT_TYPES
       * @description
       *   Name Event in graphs
       * @type {Object}
       */
      EVENT_TYPES:{
        'domain': 'Domain Config Modification',
        'purge': 'Object Purge',
        'sslcert': 'SSL Config Modification',
        'wafrule': 'WAF Rule Modification'
      },
      /**
       * @name  EVENT_COLORS
       * @description
       *   Colors for Events in graphs
       * @type {Object}
       */
      EVENT_COLORS:{
        'domain': 'blue',
        'purge': 'green',
        'sslcert': 'red',
        'wafrule': 'magenta'
      }
    });


})();

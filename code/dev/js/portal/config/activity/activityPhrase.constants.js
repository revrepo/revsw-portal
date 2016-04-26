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
        'purge': 'Purged'
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
        'purge': 'Cache',
        'apikey': 'API Key',
        'team': 'Team',
        'app': 'App',
        'sslcert': 'SSL Certificate',
        'object': 'Object'
      }
    });


})();

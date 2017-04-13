(function(angular, window) {
  'use strict';
  angular
    .module('revapm.Portal.Config')
    .constant('$config', {

      /**
       * Server url
       */
      SERVER_URL: '',

      /**
       * URL to API
       */
      API_URL: window.API_URL || 'https://testsjc20-api01.revsw.net/v1',
      // API_URL: 'https://iad02-api01.revsw.net/v1',
      // API_URL: 'https://localhost:8000/v1',

      /**
       * HTTP Statuses
       */
      STATUS: {
        OK: 200,
        ACCEPTED: 202,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        TWO_FACTOR_AUTH_REQUIRED: 403,
        SUBSCRIPTION_REQUIRED: 418,
      },

      /**
       * User roles
       */
      ROLE: {
        USER: 'user',
        RESELLER: 'reseller',
        ADMIN: 'admin',
        REVADMIN: 'revadmin',
      },

      /**
       * List of application events
       */
      EVENTS: {
        DOMAIN_CHANGED: 'domain_changed',
        FILTER_CHANGED: 'filter_changed'
      },

      /**
       * List of icon classes for domain statuses
       */
      DOMAIN_STAGING_STATUS_ICONS: {
        InProgress: 'glyphicon-refresh spin',
        Published: 'glyphicon-ok-sign text-success',
        Modified: 'glyphicon-ok-sign text-primary'
      },
      DOMAIN_PRODUCTION_STATUS_ICONS: {
        InProgress: 'glyphicon-refresh spin',
        Published: 'glyphicon-ok-circle text-success',
        Modified: 'glyphicon-ok-circle text-primary'
      },
      /**
       * Interval delay for refreshing apps staging/global status
       */
      APP_STATUS_REFRESH_INTERVAL: 15000,

      /**
       * Interval delay for refreshing domain staging/global status
       */
      DOMAIN_STATUS_REFRESH_INTERVAL: 15000,
      /**
       * Interval delay for refreshing domain staging/global status in Edit Form
       */
      DOMAIN_STATUS_REFRESH_INTERVAL_EDIT_FORM: 25000,
      /**
       * List of icon classes for SSL Certificates statuses
       */
      SSL_CERT_STAGING_STATUS_ICONS: {
        InProgress: 'glyphicon-refresh spin',
        Published: 'glyphicon-ok-sign text-success',
        Modified: 'glyphicon-ok-sign text-primary'
      },
      SSL_CERT_PRODUCTION_STATUS_ICONS: {
        InProgress: 'glyphicon-refresh spin',
        Published: 'glyphicon-ok-circle text-success',
        Modified: 'glyphicon-ok-circle text-primary'
      },

      /**
       * Interval delay for refreshing SSL Certificate staging/global status
       */
      SSL_CERT_STATUS_REFRESH_INTERVAL: 15000,
       /**
       * Interval delay for refreshing WAF Rules Status staging/global status
       */
      WAF_RULE_STATUS_REFRESH_INTERVAL: 15000,
      /**
       * List of icon classes for WAF Rule  statuses
       */
      WAF_RULE_STAGING_STATUS_ICONS: {
        InProgress: 'glyphicon-refresh spin',
        Published: 'glyphicon-ok-sign text-success',
        Modified: 'glyphicon-ok-sign text-primary'
      },
      WAF_RULE_PRODUCTION_STATUS_ICONS: {
        InProgress: 'glyphicon-refresh spin',
        Published: 'glyphicon-ok-circle text-success',
        Modified: 'glyphicon-ok-circle text-primary'
      },
      /**
       * [LOGSHIPPERS_SOURCE_TYPES description]
       * @type {Object}
       */
      LOGSHIPPERS_SOURCE_TYPES: {
        domain: 'Domain',
        app: 'Application'
      },

      /**
       * [LOGSHIPPERS_DESTINATIONA_TYPES  description]
       * @type {Object}
       */
      LOGSHIPPERS_DESTINATIONA_TYPES: {
        // Syslog: 'Syslog',
        s3: 'S3',
        ftp: 'FTP',
        sftp: 'SFTP',
        // logstash: 'Logstash',
        elasticsearch: 'Elasticsearch'
      },
      /**
       * List of icon classes for Log Shippers statuses
       */
      LOGSHIPPERS_STAGING_STATUS_ICONS: {
        InProgress: 'glyphicon-refresh spin',
        stop: 'glyphicon-stop text-warning',
        active: 'glyphicon-play text-success',
        pause: 'glyphicon-pause text-primary'
      },

      LOGSHIPPERS_OPERATIONAL_MODES: {
        active: 'Active',
        pause: 'Pause',
        stop: 'Stop'
      },
      /**
       * [LOGSHIPPERS_GENERAL_JOB_STATUSIES description]
       * @type {Object}
       */
      LOGSHIPPERS_GENERAL_JOB_STATUSIES: {
        actived: 'Actived',
        stopped: 'Stopped',
        pause: 'Pause',
        paused_with_log_piling: 'Paused With Log_piling',
        Paused_by_revadmin: 'Paused by Rev Admin'
      },
      /**
       * Interval delay for refreshing Log Shippers status
       */
      LOGSHIPPERS_STATUS_REFRESH_INTERVAL: 25000,
      // Intro module configuration
      INTRO_IS_ACTIVE: (window.intro === true) ? true : false,
      ENABLE_SIMPLIFIED_SIGNUP_PROCESS: true,

      // Used by Angular Toaster
      SUCCESS_MESSAGE_DISPLAY_TIMEOUT: 5000,
      // PATTERNS
      PATTERNS: {
        NO_SPECIAL_CHARS: /^[A-Za-z0-9//_.' -]+$/,
        COMMENT_NO_SPECIAL_CHARS: /^[A-Za-zÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜŸäëïöüŸ¡¿çÇŒœßØøÅåÆæÞþÐð""\w\d\s-'.,“”&#@:?!()$\/\n\r-]+$/,
        IP_ADDRESS: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
        WILDCARD_DOMAIN_FIELD: /(^(\*\.[a-zA-Z0-9-\_]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)/,
        WILDCARD_DOMAINS_FIELDS: /(^\*\.(([a-zA-Z0-9-\_]{0,62})[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)/,
        URL: /(https?:)?\/\/.+/,
        HEADER_VALUE: /^[A-Za-z0-9.' -]+$/,
        DOMAIN: /(?=^.{4,253}$)(^((?!-)(?!\_)[a-zA-Z0-9-\_]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)/,
        DNS_RECORD_DOMAIN: /(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-\_]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)/,
        COOKIE: /^[A-Za-z0-9.' -]+$/,
        CACHE_BYPASS_LOCATION: /^[A-Za-z0-9//.' -]+$/,
        QUERY_STRINGS_OPTION: /^[A-Za-z0-9.' -]+$/,
        CONTACT_DATA: /^[A-Za-zÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜŸäëïöüŸ¡¿çÇŒœßØøÅåÆæÞþÐð$\/-]+$/,
        COMPANY_DATA: /^[A-Za-zÀÈÌÒÙ àèìòù ÁÉÍÓÚ Ý áéíóúý ÂÊÎÔÛ âêîôû ÃÑÕ ãñõ ÄËÏÖÜŸ äëïöüŸ ¡¿çÇŒœ ßØøÅå ÆæÞþ Ðð ""\w\d\s-'.,&#@:?!()$\/-]+$/,
        WAF_LOCATION_NAME: /^\/{1}(([A-Za-z0-9]+)(\/?){1})*$/
     },
      // HEADER OPERATION FOR DOMAIN CACHING RULE
      HEADER_OPERATIONS: {
        'add': 'Add',
        'remove': 'Remove',
        'replace': 'Replace'
      },
      // DOMAIN WAF ACTIONS
      WAF_ACTIONS:{
        'ALLOW': 'ALLOW',
        'BLOCK': 'BLOCK',
        'LOG': 'LOG',
        'DROP': 'DROP'
      },
      TIME_NOTE_DISPLAY: {
        MESSAGE: 'All times are shown in the computer’s local time zone'
      },
      REFRESH_NOW_TIMEOUT: 5000,
      PURGE_CACHED_OBJECTS: {
        LIMIT_HISTORY_ROWS: 100,
        DEFAULT_PAGE_LENGTH: 10
      },
      PURGE_JOB_ENVIRONMENTS_CHOICE: [{
        key: 'staging_only',
        name: 'Staging Only'
      }, {
        key: 'global_only',
        name: 'Global Only'
      }, {
        key: 'global_and_staging',
        name: 'Global and Staging'
      }],
      /**
       * [PURGE_JOB_STATUS description]
       * @type {Object}
       */
      PURGE_JOB_STATUS: {
        'InProgress': 'In Progress',
        'Success': 'Successful'
      },
      SSL_NAMES_VERIFICATION_METHODS: {
        'email': 'Email',
        'dns': 'DNS',
        'url': 'URL'
      },
      /**
       * @name SUBSCRIPTION_STATES
       * @description
       * @see https://help.chargify.com/subscriptions/subscription-states.html
       * @type {Object}
       */
      SUBSCRIPTION_STATES: {
        'trialing': 'Trialing',
        'trial_ended': 'Trial Ended',
        'active': 'Active',
        'soft_failure': 'Soft Failure',
        'past_due': 'Past Due',
        'canceled': 'Canceled',
        'unpaid': 'Unpaid',
        'expired': 'Expired',
        'assessing': 'Assessing',
        'pending': 'Pending',
        'suspended': 'Suspended',
        'paused': 'Paused',
        'failed_to_create': 'Failed To Create',
      },
      OAUTH: {
        GOOGLE_CLIENT_ID: '673633214510-oaj5a4e1vo7fnspj87vth3o81275vr3f.apps.googleusercontent.com',
        GITHUB_CLIENT_ID: '4ee21d3f0ff9b112dc0e'
      },
      /**
       * @name  DNS_DEFAULT_VALUES
       * @description
       *   Default values for DNS Zone Records
       * @type {Object}
       */
      DNS_DEFAULT_VALUES: {
        MX_PRIORITY: 10,
        SRV_PRIORITY: 10,
        SRV_WEIGHT: 5,
        SRV_PORT: 5060
      },
      /**
       * @name WAF_ACTIONS_DEFAULT
       * @description default WAF Action Rule for add
       * @type {Array}
       */
      WAF_ACTIONS_DEFAULT: {
        'condition': '$SQL >= 8', // TODO: set valid value
        'action': 'BLOCK'
      },
      /**
       * @name WAF_LOCATION_DEFAULT
       * @description default WAF Location Block for add
       */
      WAF_LOCATION_DEFAULT: {
        'location': '/',
        'enable_waf': true,
        'enable_learning_mode': true,
        'enable_sql_injection_lib': true,
        'enable_xss_injection_lib': true,
        'waf_rules': [],
        'waf_actions': [
            {
              'condition': '$SQL >= 8',
              'action': 'BLOCK'
            },
            {
              'condition': '$UWA >= 4',
              'action': 'DROP'
            },
            {
              'condition': '$XSS >= 8',
              'action': 'BLOCK'
            },
            {
              'condition': '$EVADE >= 4',
              'action': 'BLOCK'
            },
            {
              'condition': '$LIBINJECTION_XSS >= 8',
              'action': 'BLOCK'
            },
            {
              'condition': '$LIBINJECTION_SQL >= 8',
              'action': 'BLOCK'
            }
        ]
      }
    });

})(angular, window);

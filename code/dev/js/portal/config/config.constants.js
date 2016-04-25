(function () {
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
      DOMAIN_STAGING_STATUS_ICONS : {
        InProgress: 'glyphicon-refresh spin',
        Published: 'glyphicon-ok-sign text-success',
        Modified: 'glyphicon-ok-sign text-primary'
      },
      DOMAIN_PRODUCTION_STATUS_ICONS : {
        InProgress: 'glyphicon-refresh spin',
        Published: 'glyphicon-ok-circle text-success',
        Modified: 'glyphicon-ok-circle text-primary'
      },

      /**
       * Interval delay for refreshing domain staging/global status
       */
      DOMAIN_STATUS_REFRESH_INTERVAL: 5000,
      /**
       * List of icon classes for SSL Certificates statuses
       */
      SSL_CERT_STAGING_STATUS_ICONS : {
        InProgress: 'glyphicon-refresh spin',
        Published: 'glyphicon-ok-sign text-success',
        Modified: 'glyphicon-ok-sign text-primary'
      },
      SSL_CERT_PRODUCTION_STATUS_ICONS : {
        InProgress: 'glyphicon-refresh spin',
        Published: 'glyphicon-ok-circle text-success',
        Modified: 'glyphicon-ok-circle text-primary'
      },

      /**
       * Interval delay for refreshing SSL Certificate staging/global status
       */
      SSL_CERT_STATUS_REFRESH_INTERVAL: 5000,
    });

})();

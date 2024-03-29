(function () {
  'use strict';

  angular.module('revapm.Portal', [
    'revapm.Portal.Auth',
    'revapm.Portal.Profile',
    'revapm.Portal.Users',
    'revapm.Portal.Groups',
    'revapm.Portal.Domains',
    'revapm.Portal.SSL_certs',
    'revapm.Portal.SSLNames',
    'revapm.Portal.stagingEnvironment',
    'revapm.Portal.Companies',
    'revapm.Portal.Cache',
    'revapm.Portal.ImportConfig',
    'revapm.Portal.Reports',
    'revapm.Portal.Mobile',
    'revapm.Portal.Usage',
    'revapm.Portal.Keys',
    'revapm.Portal.Apps',
    'revapm.Portal.Signup',
    'ui.router',
    'ui.bootstrap.typeahead',
    'ui.bootstrap.tpls',
    'ui.bootstrap.tooltip',
    'ui.bootstrap.popover',
    'ui.bootstrap.accordion',
    'hljs',
    'revapm.Portal.Dashboard',
    'datatables',
    'datatables.bootstrap',
    'ngFileSaver',
    'revapm.Portal.LogShippers',
    'angular-intro',
    'ngMessages',
    'ngAnimate',
    'toaster',
    'angular-loading-bar',
    'revapm.Portal.DNSAnalytics',
    'revapm.Portal.DNSZoneRecords',
    'revapm.Portal.DNSZones',
    'revapm.Portal.AzureResources',
    'revapm.Portal.AzureSubscriptions',
    'revapm.Portal.WAFAnalytics',
    'revapm.Portal.WAFRules',
    'revapm.Portal.Notifications',
    'revapm.Portal.TrafficAlerts',
    'revapm.Portal.networkIPBlocks',
    'revapm.Portal.Invitation',
    'ngYoutubeEmbed',
    'satellizer'
  ]);

})();

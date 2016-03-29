(function() {
  'use strict';
  /**
   * @name revapm.Portal.BlueTriangleTech
   * @ngdoc  directive
   */
  angular.module('revapm.Portal.BlueTriangleTech')
  .value('BTTPortalConfig', {
    authKey: 'a340ef373d412edcb431cf11a0b627c9',
    url_api: 'https://portal.bluetriangletech.com/BTTPortal/api/conversions_html.php',
    url_demo: 'https://portal.bluetriangletech.com/BTTPortal/api/conversions_html.php' +
      '?&ReportPage%5B%5D=subcategory&BrowserType=All%20Browsers&Country=All%20Countries&GranularitySelect=1.0&StatSig=0&siteID=567' +
      '&authKey=a340ef373d412edcb431cf11a0b627c9&timePeriod=hours_3&slowestFastest=slowest_500&refresh_rate=60&StatMethod=85&TimeZone=America/New_York' +
      '&startEpoch=1458872580&endEpoch=1458883380&offset=10800&startTime=22:23&endTime=01:23&startDate=2016-3-24&endDate=2016-3-24'
  });
})();

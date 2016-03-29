(function() {
  'use strict';
  angular.module('revapm.Portal.BlueTriangleTech')
    .factory('BTTPortalService', BTTPortalService);


  /**
   *
   * @name  BTTPortalService
   * @description
   * @param {[type]} $q        [description]
   * @param {[type]} BTTPortal [description]
   */
  function BTTPortalService($q, BTTPortalConfig, $httpParamSerializerJQLike) {
    'ngInject';
    // TODO: create value BTTPortalConfig.defaults
    var _def = {
      ReportPage: ['subcategory'],
      GranularitySelect: '1.0',
      TimeZone: 'America/New_York',
      siteID: 567,
      // authKey: 'a340ef373d412edcb431cf11a0b627c9',
      startDate: '2016-03-24',
      startTime: '22:23',
      endDate: '2016-03-24',
      endTime: '01:23',
      StatMethod: 85,
      startEpoch: '1458872580',
      endEpoch: '1458883380',
      offset: '10800',
      // scrollx: 0,
      // scrolly: 500,
      // companyOptions: 567,
      // session: '',
      // navStart: '',
      // reportType: 'Conversions',
      // BroswerType: ['All Browsers'],
      // Country: ['All Countries'],
      // PerformanceMetric: '',
      // siteText: '',
      // filterTable: '',
      // keyOnly: true,
      // auto_calc_minSample: 'on',
      // StatSig: 0,
    };

    /**
     * @name  generateUrl
     * @description
     * @param  {Object} filters
     * @return {Promise}
     */
    function generateUrl(filters) {
      var def = $q.defer();
      var _count_last_days = '7'; // default count days

      if (filters) {
        _count_last_days = filters.count_last_day || '7';
        if (filters.country) {
          _.merge(_def, {
            'Country': [filters.country]
          });
        }
      }

      var _startTime = moment().subtract(_count_last_days, 'days');
      var _endTime = moment(); //.subtract('1', 'days');
      var _now = {
        authKey: BTTPortalConfig.authKey,
        startEpoch: _startTime.valueOf().toString().substr(0, 10), //'1458366575'
        startDate: _startTime.format('YYYY-M-DD'), // date format '2016-03-24',
        startTime: _startTime.format('HH:mm'), // time format '22:23',

        endEpoch: _endTime.valueOf().toString().substr(0, 10), //'1459230575',
        endDate: _endTime.format('YYYY-M-DD'), //'2016-3-24',
        endTime: _endTime.format('HH:mm'), //'01:23',
      };

      var url_data = $httpParamSerializerJQLike(_.merge(_def, _now));
      def.resolve(BTTPortalConfig.url_api + '?&' + url_data);
      return def.promise;
    }
    return {
      generateUrl: generateUrl
    };
  }
})();

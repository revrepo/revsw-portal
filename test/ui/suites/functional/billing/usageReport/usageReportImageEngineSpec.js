/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Rev Software, Inc. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Rev Software, Inc.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Rev Software, Inc.
 */

var config = require('config');
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');
var Constants = require('./../../../../page_objects/constants');

describe('Functional', function () {
  var user = config.get('portal.users.revAdmin');
  describe('Usage Report Image Engine', function () {
    describe('With user: ' + user.role, function () {
      /* Too much camel_case */
      /* jshint ignore:start */
      var date = new Date(new Date().setHours(0,0,0,0));
      var to = date.getTime();
      var from = date.setDate(1);
      var avgTrafficPerDay = 0;
      var avgSentBytesPerDay = 0;
      var avgRecvBytesPerDay = 0;
      var revTestId = config.get('portal.users.admin').account.id;
      var sentBps = 0;
      var recvBps = 0;
      var cacheHits = {};
      var portHits = {};
      var bytesToGB = function (bytes) {
        return (bytes / 1024 / 1024 / 1024);
      };
      var bpsToMbps = function (bps) {
        return (bps / 1024 / 1024);
      };
      beforeAll(function (done) {
        /* jshint camelcase:false */
        Portal.signIn(user);
        Portal.helpers.nav.goToUsageReport();
        Portal.billing.usageReportPage.setCompanyName('Rev Test');
        Portal.billing.usageReportPage.clickUpdateReport().then(function () {
          // Get our traffic data
          Portal
            .usageReportHelpers
            .getTrafficAvgPerDay(revTestId, from, to, user).then(function (res) {
              var count = 1;
              var avg = 0;
              var avgSentBytes = 0;
              var avgRecvBytes = 0;
              sentBps = bpsToMbps(res.dataTraffic.billable_sent_bps);
              recvBps = bpsToMbps(res.dataTraffic.billable_received_bps);
              cacheHits = res.cacheHits;
              portHits = res.portHits;
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].count !== 0) {                  
                  avg += res.data[i].count;
                  avgSentBytes += res.data[i].sent_bytes;
                  avgRecvBytes += res.data[i].received_bytes;
                  count++;                  
                }
              }
              avgTrafficPerDay = avg / count;
              avgSentBytesPerDay = avgSentBytes / count;
              avgRecvBytesPerDay = avgRecvBytes / count;
              done();
            });
        });
      });

      afterAll(function () {
        Portal.signOut();
      });

      String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
      };

      it('should display correct amount of Optimized Images', function () {
        Portal.billing.usageReportPage.getFormByName('ImageEngine Usage').getText().then(function (text) {
          var total = text.replaceAll('\'', '').split('\n')[2];
          date = new Date();
          expect(total - (avgTrafficPerDay * 30)).toBeLessThan(100);
        });
      });

      it('should display correct amount of Original Traffic', function () {
        Portal.billing.usageReportPage.getFormByName('ImageEngine Usage').getText().then(function (text) {
          var total = text.replaceAll('\'', '').split('\n')[4].replace(' GB', '');;
          date = new Date();
          expect(total - (avgTrafficPerDay * 30)).toBeLessThan(100);
        });
      });

      it('should display correct amount of Optimized Traffic', function () {
        Portal.billing.usageReportPage.getFormByName('ImageEngine Usage').getText().then(function (text) {
          var total = text.replaceAll('\'', '').split('\n')[6].replace(' GB', '');;
          date = new Date();
          expect(total - (avgTrafficPerDay * 30)).toBeLessThan(100);
        });
      });
      /* jshint ignore:end */
    });
  });
});

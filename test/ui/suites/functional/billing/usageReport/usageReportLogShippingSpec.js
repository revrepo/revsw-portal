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
  var user = config.get('portal.users.admin');
  describe('Usage Report Log Shipping Jobs', function () {
    describe('With user: ' + user.role, function () {
      var jobData = DataProvider.generateLogShippingJobData({}, user.role);
      var logJobsCount = 0;
      beforeAll(function (done) {
        // get the amount of log shipping jobs we have
        Portal.signIn(user);
        Portal.helpers.nav.goToLogShipping();
        Portal.logShipping.listPage.table.getRows().count().then(function (count) {
          logJobsCount = count;
          done();
        });
      });

      afterAll(function () {
        Portal.signOut();
      });

      it('should display correct amount of Log Shipping Jobs', function (done) {
        Portal.usageReportHelpers.generateReport(user).then(function () {
          Portal.helpers.nav.goToUsageReport().then(function () {
            Portal
              .usageReportHelpers
              .expectValue(Portal
                .billing
                .usageReportPage, 'Total\n' + logJobsCount, done, 'Log Shipping Jobs');
          });
        });
      });

      it('should display correct amount of ' +
        ' Log Shipping Jobs after creating a new job', function (done) {
          Portal.helpers.nav.goToLogShipping();
          Portal.logShipping.listPage.clickAddNewLogShippingJob();
          Portal.logShipping.addPage.form.setJobName(jobData.name);
          if (user.role !== 'Admin') {
            Portal.logShipping.addPage.form.setAccount(jobData.account);
          }
          Portal.logShipping.addPage.clickCreateJobBtn().then(function () {
            Portal.usageReportHelpers.generateReport(user).then(function () {
              Portal.helpers.nav.goToUsageReport().then(function () {
                Portal
                  .usageReportHelpers
                  .expectValue(Portal
                    .billing
                    .usageReportPage, 'Total\n' + (logJobsCount + 1), done, 'Log Shipping Jobs');
              });
            });
          });
        });

      it('should display correct amount of ' +
        ' Log Shipping Jobs after deleting job', function (done) {
          Portal.helpers.nav.goToLogShipping();
          Portal.logShipping.listPage.searchAndClickDelete(jobData.name);
          Portal.dialog.clickOk().then(function () {
            Portal.usageReportHelpers.generateReport(user).then(function () {
              Portal.helpers.nav.goToUsageReport().then(function () {
                Portal
                  .usageReportHelpers
                  .expectValue(Portal
                    .billing
                    .usageReportPage, 'Total\n' + (logJobsCount), done, 'Log Shipping Jobs');
              });
            });
          });
        });
    });
  });
});

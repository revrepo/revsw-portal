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
  describe('Usage Report Domains', function () {
    describe('With user: ' + user.role, function () {
      var myDomain = DataProvider.generateDomain('my-domain');
      var domainCount = 0;
      var domainsPerPage = 25;
      var sslEnabled = 0;
      var customVCLRules = 0;
      var wafEnabled = 0;
      var eAnalyticsEnabled = 0;
      var luaEnabled = 0;
      var deletedDomains = 0;
      beforeAll(function (done) {
        // get the amount of domains we have
        var lastPageDomains = 0;
        var pages = 0;
        Portal.signIn(user);
        Portal.helpers.nav.goToUsageReport();
        Portal.billing.usageReportPage.getDomainsForm().then(function (text) {
          sslEnabled = parseInt(text.split('\n')[6]);
          customVCLRules = parseInt(text.split('\n')[8]);
          wafEnabled = parseInt(text.split('\n')[12]);
          eAnalyticsEnabled = parseInt(text.split('\n')[10]);
          luaEnabled = parseInt(text.split('\n')[14]);
          deletedDomains = parseInt(text.split('\n')[4]);
        });
        Portal.helpers.nav.goToDomains();
        Portal.domains.listPage.pager.getLastBtn().click();
        Portal.domains.listPage.table.getRows().count().then(function (count) {
          lastPageDomains = count;
          Portal.domains.listPage.pager.getCurrentPageIndex().then(function (text) {
            domainCount = (domainsPerPage * (text - 1)) + lastPageDomains;
            done();
          });
        });
      });

      afterAll(function () {
        Portal.signOut();
      });

      it('should display correct amount of active domains', function (done) {
        Portal.usageReportHelpers.generateReport(user).then(function () {
          Portal.helpers.nav.goToUsageReport().then(function () {
            Portal
              .usageReportHelpers
              .expectValue(Portal
                .billing
                .usageReportPage, 'Active\n' + domainCount, done, 'Domains');
          });
        });
      });

      it('should display correct amount of active ' +
        ' domains after creating a new domain', function (done) {
          Portal.helpers.nav.goToDomains();
          Portal.domains.listPage.clickAddNewDomain();
          Portal.domains.addPage.createDomain(myDomain);
          Portal.alerts.waitToDisplay().then(function () {
            Portal.usageReportHelpers.generateReport(user).then(function () {
              Portal.helpers.nav.goToUsageReport().then(function () {
                Portal
                  .usageReportHelpers
                  .expectValue(Portal
                    .billing
                    .usageReportPage, 'Active\n' + (domainCount + 1), done, 'Domains');
              });
            });
          });
        });

      it('should display correct amount of SSL Enabled ' +
        ' domains after updating a domain', function (done) {
          Portal.helpers.nav.goToDomains();
          Portal.domains.listPage.searchAndClickEdit(myDomain.name);
          Portal.domains.editPage.fillDemo(myDomain.name);
          Portal.domains.editPage.clickUpdateDomain();
          Portal.dialog.clickOk();
          Portal.alerts.waitToDisplay().then(function () {
            Portal.usageReportHelpers.generateReport(user).then(function () {
              Portal.helpers.nav.goToUsageReport().then(function () {
                Portal
                  .usageReportHelpers
                  .expectValue(Portal
                    .billing
                    .usageReportPage, 'SSL Enabled\n' + (sslEnabled + 1), done, 'Domains');
              });
            });
          });
        });

      it('should display correct amount of Custom VCL Rules ' +
        ' domains after updating a domain', function (done) {
          Portal.usageReportHelpers.generateReport(user).then(function () {
            Portal.helpers.nav.goToUsageReport().then(function () {
              Portal
                .usageReportHelpers
                .expectValue(Portal
                  .billing
                  .usageReportPage, 'Custom VCL Rules\n' + (customVCLRules + 1), done, 'Domains');
            });
          });
        });

      it('should display correct amount of Enhanced Analytics Enabled ' +
        ' domains after updating a domain', function (done) {
          Portal.usageReportHelpers.generateReport(user).then(function () {
            Portal.helpers.nav.goToUsageReport().then(function () {
              Portal
                .usageReportHelpers
                .expectValue(Portal
                  .billing
                  .usageReportPage,
                'Enhanced Analytics Enabled\n' + (eAnalyticsEnabled + 1),
                done,
                'Domains');
            });
          });
        });

      it('should display correct amount of WAF Enabled ' +
        ' domains after updating a domain', function (done) {
          Portal.usageReportHelpers.generateReport(user).then(function () {
            Portal.helpers.nav.goToUsageReport().then(function () {
              Portal
                .usageReportHelpers
                .expectValue(Portal
                  .billing
                  .usageReportPage,
                'WAF Enabled\n' + (wafEnabled + 1),
                done,
                'Domains');
            });
          });
        });

      it('should display correct amount of Lua Feature Enabled ' +
        ' domains after updating a domain', function (done) {
          Portal.usageReportHelpers.generateReport(user).then(function () {
            Portal.helpers.nav.goToUsageReport().then(function () {
              Portal
                .usageReportHelpers
                .expectValue(Portal
                  .billing
                  .usageReportPage,
                'Lua Feature Enabled\n' + (luaEnabled + 1),
                done,
                'Domains');
            });
          });
        });

      it('should display correct amount of active ' +
        ' domains after deleting a domain', function (done) {
          Portal.helpers.nav.goToDomains();
          Portal.domains.listPage.searchAndClickDelete(myDomain.name);
          Portal.dialog.clickOk();
          Portal.alerts.waitToDisplay().then(function () {
            Portal.usageReportHelpers.generateReport(user).then(function () {
              Portal.helpers.nav.goToUsageReport().then(function () {
                Portal
                  .usageReportHelpers
                  .expectValue(Portal
                    .billing
                    .usageReportPage,
                  'Active\n' + (domainCount),
                  done,
                  'Domains');
              });
            });
          });
        });

      it('should display correct amount of deleted ' +
        ' domains after deleting a domain', function (done) {
          Portal.usageReportHelpers.generateReport(user).then(function () {
            Portal.helpers.nav.goToUsageReport().then(function () {
              Portal
                .usageReportHelpers
                .expectValue(Portal
                  .billing
                  .usageReportPage,
                'Deleted\n' + (deletedDomains + 1),
                done,
                'Domains');
            });
          });
        });
    });
  });
});

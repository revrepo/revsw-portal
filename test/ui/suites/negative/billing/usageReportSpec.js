/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2018] Rev Software, Inc.
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
var Portal = require('./../../../page_objects/portal');
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');
var API = require('./../../../common/api').API;

describe('Negative: ', function() {
  describe('Usage Report', function() {
    var adminUser = config.get('portal.users.admin');
    var data = DataProvider.generateUsageReportData(adminUser);
    var tempCompanyName = data.companyName;

    beforeAll(function() {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToUsageReport();
    });

    afterAll(function() {
      Portal.signOut();
    });

    it('should check that Update Report fails with invalid date', function() {
      data.companyName = 'Wrong Company 01';
      Portal.billing.usageReportPage.updateReport(data);
      var result = Portal.billing.usageReportPage.getCompanyName();
      expect(result).toEqual(tempCompanyName);
    });

    it('should check that Update Report fails with empty date', function() {
      data.companyName = '   ';
      Portal.billing.usageReportPage.updateReport(data);
      var result = Portal.billing.usageReportPage.getCompanyName();
      expect(result).toBe(tempCompanyName);
    });

    it('should check that Update Report fails with special characters date', function() {
      data.companyName = 'abcdefg!@#$%';
      Portal.billing.usageReportPage.updateReport(data);
      var result = Portal.billing.usageReportPage.getCompanyName();
      expect(result).toBe(tempCompanyName);
    });

    describe('amount of Enhanced Analytics Enabled', function() {
      var myDomain = DataProvider.generateDomain('my-domain');
      var domainCount = 0;
      var domainValues;
      beforeAll(function(done) {
        // get the amount of domains we have
        API.helpers.authenticate(adminUser).then(function() {
          API.resources.domainConfigs
            .getAll()
            .expect(200)
            .then(function(res) {
              domainCount = res.body.length;
              Portal.signIn(adminUser);
              Portal.helpers.nav.goToUsageReport().then(function() {
                Portal.billing.usageReportPage
                  .getAllDomainsValues()
                  .then(function(res) {
                    // get the domain values from usage report page
                    domainValues = res;
                    done();
                  });
              });
            })
            .catch(done);
        });
      });

      it('shoul not change after add new domain with default settings', function(done) {
        Portal.helpers.nav.goToDomains();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.createDomain(myDomain);
        Portal.alerts.waitToDisplay().then(function() {
          Portal.usageReportHelpers
            .generateReport({ accountId: adminUser.account.id })
            .then(function() {
              Portal.helpers.nav.goToUsageReport().then(function() {
                Portal.usageReportHelpers
                  .expectValue(
                    domainCount + 1,
                    Constants.USAGE_REPORT_IDS.ACTIVE_DOMAINS,
                    adminUser.account.id
                  )
                  .then(function() {
                    expect(true).toBeTruthy();
                    Portal.helpers.nav.goToUsageReport().then(function() {
                      Portal.usageReportHelpers
                        .expectValue(
                          parseInt(domainValues.analyticsEnhanced),
                          Constants.USAGE_REPORT_IDS.ANALYTICS_ENHANCED_DOMAINS,
                          adminUser.account.id
                        )
                        .then(function() {
                          expect(true).toBeTruthy();
                          done();
                        });
                    });
                  })
                  .catch(function(err) {
                    throw new Error(err);
                  });
              });
            });
        });
      });
    });
  });
});

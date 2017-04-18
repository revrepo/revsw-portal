/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
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

describe('Smoke: ', function () {
  describe('Usage Report', function () {

    var adminUser = config.get('portal.users.admin');
    var data = DataProvider.generateUsageReportData(adminUser);
    var tempCompanyName = data.companyName;

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToUsageReport();
    });

    afterAll(function () {
      Portal.signOut();
    });

    it('should open Update Report page', function() {
      var title = Portal.billing.usageReportPage.getTitle();
      expect(title).toEqual('Usage Report');
    });

    it('should display "Billing Zones Details" in modal window', function() {
      Portal.billing.usageReportPage.updateReport(data);
      var btnGetBillingZonesDetails = Portal.billing.usageReportPage.getBillingZonesDetailsBtn();
      expect(btnGetBillingZonesDetails.isDisplayed()).toBeTruthy();
      btnGetBillingZonesDetails.click();
      var modal = Portal.billing.usageReportPage.getBillingZonesDetailsDialog();
      expect(modal.isDisplayed()).toBeTruthy();
      expect(Portal.dialog.getCancelBtn().isDisplayed()).toBeTruthy();
      Portal.dialog.getCancelBtn().click();
    });

    describe('Dialog "Billing Zones Details"', function () {
      beforeAll(function () {
        var btnGetBillingZonesDetails = Portal.billing.usageReportPage.getBillingZonesDetailsBtn();
        expect(btnGetBillingZonesDetails.isDisplayed()).toBeTruthy();
        btnGetBillingZonesDetails.click();
      });

      var arrayText = [
        'Asia',
        'Europe',
        'North America',
        'South America',
        'San Jose, California, USA'
      ];

      arrayText.forEach(function (textDisplay) {
        it('should display text "' + textDisplay + '"',
          function () {
            var bodyText = Portal.dialog.getBodyText();
            expect(bodyText.isPresent()).toBe(true);
            bodyText.then(function (text) {
              expect(text).toContain(textDisplay);
            });
          });
      });
    });

    // NOTE: smoke test check only display text, but do not validate values
    it('should display SSL Certs section with correct report properties', function() {

          var reportPropertiesSSLCerts = {
            active: 'Active',
            deleted: 'Deleted'
          };

          var result = Portal.billing.usageReportPage.getSSLCertsViewText();

          result.then(function(dataText){
            expect(dataText).toContain(reportPropertiesSSLCerts.active);
            expect(dataText).toContain(reportPropertiesSSLCerts.deleted);
          });
        });

      it('should display SSL Names section with correct report property', function() {

          var reportPropertiesSSLNames = {
            total: 'Total'
          };

          var result = Portal.billing.usageReportPage.getSSLNamesViewText();

          result.then(function(dataText){
            expect(dataText).toContain(reportPropertiesSSLNames.total);
          });
        });
  });
});

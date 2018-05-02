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
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');
var Constants = require('./../../../../page_objects/constants');

describe('Functional', function () {
  describe('Accounts sorting', function () {

    var revAdminUser = config.get('portal.users.revAdmin');

    beforeAll(function () {
      Portal.signIn(revAdminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.helpers.nav.goToAccounts();
      // NOTE: set default sort order befor start
      Portal.admin.accounts.listPage.table.getHeader().clickCompanyName();
    });

    afterEach(function () {
    });

    it('should apply `descendant` sorting by `Company Name` column',
      function () {
        Portal.admin.accounts.listPage.table.getHeader().clickCompanyName();
        Portal.admin.accounts.listPage.table.getHeader().clickCompanyName();
        var companyName1 = Portal.admin.accounts.listPage
          .table.getFirstRow().getCompanyName();

          Portal.admin.accounts.listPage.table.getHeader().clickCompanyName();
        var companyName2 = Portal.admin.accounts.listPage
          .table.getFirstRow().getCompanyName();

        expect(companyName1).toBeLessThan(companyName2);
      });

    it('should apply `ascendant` sorting by `Company Name` column',
      function () {
        Portal.admin.accounts.listPage.table.getHeader().clickCompanyName();
        var companyName1 = Portal.admin.accounts.listPage
          .table.getFirstRow().getCompanyName();

        Portal.admin.accounts.listPage.table.getHeader().clickCompanyName();
        var companyName2 = Portal.admin.accounts.listPage
          .table.getFirstRow().getCompanyName();

        expect(companyName1).toBeGreaterThan(companyName2);
      });

    it('should apply `descendant` sorting by `Created At` column',
      function () {
        Portal.admin.accounts.listPage.table.getHeader().clickCreatedAt();
        var createdAt1 = Portal.admin.accounts.listPage
          .table.getFirstRow().getCreatedAt();

        Portal.admin.accounts.listPage.table.getHeader().clickCreatedAt();
        var createdAt2 = Portal.admin.accounts.listPage
          .table.getFirstRow().getCreatedAt();

        expect(createdAt1).not.toEqual(createdAt2);
      });

    it('should apply `ascendant` sorting by `Created At` column',
      function () {
        Portal.admin.accounts.listPage.table.getHeader().clickCreatedAt();
        Portal.admin.accounts.listPage.table.getHeader().clickCreatedAt();
        var createdAt1 = Portal.admin.accounts.listPage
          .table.getFirstRow().getCreatedAt();

        Portal.admin.accounts.listPage.table.getHeader().clickCreatedAt();
        var createdAt2 = Portal.admin.accounts.listPage
          .table.getFirstRow().getCreatedAt();

        expect(createdAt1).not.toEqual(createdAt2);
      });

    it('should apply `descendant` sorting by `Billing Plan` column',
      function () {
        Portal.admin.accounts.listPage.table.getHeader().clickBillingPlan();
        var billingPlan1 = Portal.admin.accounts.listPage
          .table.getFirstRow().getCompanyName();

        Portal.admin.accounts.listPage.table.getHeader().clickBillingPlan();
        var billingPlan2 = Portal.admin.accounts.listPage
          .table.getFirstRow().getCompanyName();

        expect(billingPlan1).not.toBe(billingPlan2);
      });

    it('should apply `ascendant` sorting by `Billing Plan` column',
      function () {
        Portal.admin.accounts.listPage.table.getHeader().clickBillingPlan();
        Portal.admin.accounts.listPage.table.getHeader().clickBillingPlan();
        var billingPlan1 = Portal.admin.accounts.listPage
          .table.getFirstRow().getCompanyName();

        Portal.admin.accounts.listPage.table.getHeader().clickBillingPlan();
        var billingPlan2 = Portal.admin.accounts.listPage
          .table.getFirstRow().getCompanyName();

        expect(billingPlan1).not.toBe(billingPlan2);
      });
  });
});

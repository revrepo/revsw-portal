/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2015] Rev Software, Inc.
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

describe('Smoke', function () {  // jshint ignore:line
  describe('Edit Accounts', function () {

    var revAdminUser = config.get('portal.users.revAdmin');
    var accountProfile = DataProvider.generateAccountProfileData();
    var billingContact = DataProvider.generateAccountBillingData();

    beforeAll(function () {
      Portal.signIn(revAdminUser);
      Portal.createAccounts([accountProfile]);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.helpers.nav.goToAccounts();
    });

    afterEach(function () {
    });

    it('should edit an account and Update Company Profile',
      function () {
        var account1 = accountProfile.companyName;
        var account2 = accountProfile.companyName + '_UPDATED';
        Portal.admin.accounts.listPage.searchAndClickEdit(account1);

        accountProfile.companyName = account2;
        Portal.admin.accounts.editPage
          .updateAccountProfile(accountProfile, billingContact);
        Portal.dialog.clickOk();

        Portal.helpers.nav.goToAccounts();
        Portal.admin.accounts.listPage.searcher.clearSearchCriteria();
        Portal.admin.accounts.listPage.searcher.setSearchCriteria(account2);
        var allRows = Portal.admin.accounts.listPage.table.getRows();
        expect(allRows.count()).toEqual(1);
      });

    it('should edit a account and Create Billing Profile',
      function () {
        var account1 = accountProfile.companyName;
        Portal.admin.accounts.listPage.searchAndClickEdit(account1);
        Portal.admin.accounts.editPage
          .createBillingContact(accountProfile, billingContact);
        Portal.dialog.clickOk();

        var res = Portal.admin.accounts.editPage.isDisplayedBillingContact();
        expect(res).toBe(false);
      });
  });
});

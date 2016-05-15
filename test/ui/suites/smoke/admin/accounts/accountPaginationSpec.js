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
var Constants = require('./../../../../page_objects/constants');

describe('Smoke', function () {
  describe('Accounts pagination', function () {

    var revAdminUser = config.get('portal.users.revAdmin');

    beforeAll(function () {
      Portal.signIn(revAdminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.getAdminPage();
      Portal.header.goTo(Constants.sideBar.admin.ACCOUNTS);
    });

    afterEach(function () {
    });

    it('should be displayed total of 25 accounts as maximum',
      function () {
        var rows = Portal.admin.accounts.listPage.table.getRows().count();
        expect(rows).toBe(25);
      });

    it('should be displayed when the amount of items exceeds the maximum ' +
      'amount configured to displayed in one page',
      function () {
        var text = 'unique_string_' + (new Date()).getTime();
        Portal.admin.accounts.listPage.searcher.setSearchCriteria(text);
        var page = Portal.admin.accounts.listPage.pager.isDisplayed();
        expect(page).toBe(false);
        Portal.admin.accounts.listPage.searcher.clearSearchCriteria();
        page = Portal.admin.accounts.listPage.pager.isDisplayed();
        expect(page).toBe(true);
      });

    it('should display the next page with next accounts when clicking ' +
      '"Next page"',
      function () {
        var firstAccountName = Portal.admin.accounts.listPage.table
          .getFirstRow()
          .getCompanyName();
        Portal.admin.accounts.listPage.pager.clickNext();
        var nextCompanyName = Portal.admin.accounts.listPage.table
          .getFirstRow()
          .getCompanyName();
        expect(firstAccountName).not.toEqual(nextCompanyName);
      });

    it('should display the previous page with previous accounts when ' +
      'clicking "Previous page"',
      function () {
        var firstCompanyName = Portal.admin.accounts.listPage.table
          .getFirstRow()
          .getCompanyName();
        Portal.admin.accounts.listPage.pager.clickNext();
        var nextFirstCompanyName = Portal.admin.accounts.listPage.table
          .getFirstRow()
          .getCompanyName();
        Portal.admin.accounts.listPage.pager.clickPrevious();
        var newFirstCompanyName = Portal.admin.accounts.listPage.table
          .getFirstRow()
          .getCompanyName();
        expect(newFirstCompanyName).not.toEqual(nextFirstCompanyName);
        expect(newFirstCompanyName).toEqual(firstCompanyName);
      });

    it('should display a set of accounts when clicking an specific page',
      function () {
        var firstCompanyName = Portal.admin.accounts.listPage.table
          .getFirstRow()
          .getCompanyName();
        Portal.admin.accounts.listPage.pager.clickPageIndex(2);
        var nextFirstCompanyName = Portal.admin.accounts.listPage.table
          .getFirstRow()
          .getCompanyName();
        expect(firstCompanyName).not.toEqual(nextFirstCompanyName);
      });

    it('should display the "Previous Page" button disabled when the first ' +
      'page is displayed',
      function () {
        expect(Portal.admin.accounts.listPage.pager.isPreviousBtnDisabled())
          .toBeTruthy();
      });

    it('should display the "Next Page" button disabled when the last page ' +
      'is displayed',
      function () {
        Portal.admin.accounts.listPage.pager
          .getAllPageIndexButtons()
          .count()
          .then(function (totalPages) {
            Portal.admin.accounts.listPage.pager.clickPageIndex(totalPages);
            expect(Portal.admin.accounts.listPage.pager.isNextBtnDisabled())
              .toBeTruthy();
          });
      });
  });
});

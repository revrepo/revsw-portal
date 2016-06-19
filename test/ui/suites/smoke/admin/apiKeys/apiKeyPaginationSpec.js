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
  describe('API Key Pagination', function () {

    var revAdminUser = config.get('portal.users.revAdmin');

    beforeAll(function () {
      Portal.signIn(revAdminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.getAdminPage();
      Portal.getApiKeysPage();
    });

    afterEach(function () {
    });

    // TODO: Leo, do we have a process which creates the required 25 keys?
    it('should be displayed total of 25 accounts as maximum',
      function () {
        var rows = Portal.admin.apiKeys.listPage.table.getRows().count();
        expect(rows).toBe(25);
      });

    it('should be displayed when the amount of items exceeds the maximum ' +
      'amount configured to displayed in one page',
      function () {
        var text = 'unique_string_' + (new Date()).getTime();
        Portal.admin.apiKeys.listPage.searcher.setSearchCriteria(text);
        var page = Portal.admin.apiKeys.listPage.pager.isDisplayed();
        expect(page).toBe(false);
        Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
        page = Portal.admin.apiKeys.listPage.pager.isDisplayed();
        expect(page).toBe(true);
      });

    it('should display the next page with next API Key when clicking ' +
      '"Next page"',
      function () {
        var firstKeyName = Portal.admin.apiKeys.listPage.table
          .getFirstRow()
          .getName();
        Portal.admin.apiKeys.listPage.pager.clickNext();
        var nextKeyName = Portal.admin.apiKeys.listPage.table
          .getFirstRow()
          .getName();
        expect(firstKeyName).not.toEqual(nextKeyName);
      });

    it('should display the previous page with previous API Keys when ' +
      'clicking "Previous page"',
      function () {
        var firstKeyName = Portal.admin.apiKeys.listPage.table
          .getFirstRow()
          .getName();
        Portal.admin.apiKeys.listPage.pager.clickNext();
        var nextFirstName = Portal.admin.apiKeys.listPage.table
          .getFirstRow()
          .getName();
        Portal.admin.apiKeys.listPage.pager.clickPrevious();
        var newFirstKeyName = Portal.admin.apiKeys.listPage.table
          .getFirstRow()
          .getName();
        expect(newFirstKeyName).not.toEqual(nextFirstName);
        expect(newFirstKeyName).toEqual(firstKeyName);
      });

    it('should display a set of API Keys when clicking an specific page',
      function () {
        var firstKeyName = Portal.admin.apiKeys.listPage.table
          .getFirstRow()
          .getName();
        Portal.admin.apiKeys.listPage.pager.clickPageIndex(2);
        var nextFirstName = Portal.admin.apiKeys.listPage.table
          .getFirstRow()
          .getName();
        expect(firstKeyName).not.toEqual(nextFirstName);
      });

    it('should display the "Previous Page" button disabled when the first ' +
      'page is displayed',
      function () {
        expect(Portal.admin.apiKeys.listPage.pager.isPreviousBtnDisabled())
          .toBeTruthy();
      });

    it('should display the "Next Page" button disabled when the last page ' +
      'is displayed',
      function () {
        Portal.admin.apiKeys.listPage.pager
          .getAllPageIndexButtons()
          .count()
          .then(function (totalPages) {
            Portal.admin.apiKeys.listPage.pager.clickPageIndex(totalPages);
            expect(Portal.admin.apiKeys.listPage.pager.isNextBtnDisabled())
              .toBeTruthy();
          });
      });
  });
});

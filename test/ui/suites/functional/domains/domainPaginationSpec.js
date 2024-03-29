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
var DEFAULT_LIMIT_RECORDS_IN_TABLE = config.get('$config.DEFAULT_LIMIT_RECORDS_IN_TABLE');

describe('Functional', function () {
  describe('Domain pagination', function () {

    var adminUser = config.get('portal.users.revAdmin');

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToDomains();
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.domains.listPage.pager.clickPageIndex(1);
    });

    it('should be not more than '+ DEFAULT_LIMIT_RECORDS_IN_TABLE+ ' domains on one page '+
    '(when $config.DEFAULT_LIMIT_RECORDS_IN_TABLE = '+DEFAULT_LIMIT_RECORDS_IN_TABLE+')',
      function () {
        Portal.domains.listPage.getListItems().then(function(elements) {
          expect(elements.length > DEFAULT_LIMIT_RECORDS_IN_TABLE).toBe(false);
        });
      });

    it('should display next-btn if full list and should ' +
       'not display if clean list',
      function () {
        var uniqueString = 'unique_string_' + (new Date()).getTime();
        Portal.domains.listPage.searcher.setSearchCriteria(uniqueString);
        expect(Portal.domains.listPage.pager.isDisplayed()).toBe(false);
        Portal.domains.listPage.searcher.clearSearchCriteria();
        expect(Portal.domains.listPage.pager.isDisplayed()).toBe(true);
      });

    it('should display the next page with next domains when clicking ' +
      '"Next page"',
      function () {
        var firstDomainName = Portal.domains.listPage.table
          .getFirstRow()
          .getName();
        Portal.domains.listPage.pager.clickNext();
        var nextDomainName = Portal.domains.listPage.table
          .getFirstRow()
          .getName();
        expect(firstDomainName).not.toEqual(nextDomainName);
      });

    it('should display the previous page with previous domains when ' +
      'clicking "Previous page"',
      function () {
        var firstDomainName = Portal.domains.listPage.table
          .getFirstRow()
          .getName();
        Portal.domains.listPage.pager.clickNext();
        var nextFirstDomainName = Portal.domains.listPage.table
          .getFirstRow()
          .getName();
        Portal.domains.listPage.pager.clickPrevious();
        var newFirstDomainName = Portal.domains.listPage.table
          .getFirstRow()
          .getName();
        expect(newFirstDomainName).not.toEqual(nextFirstDomainName);
        expect(newFirstDomainName).toEqual(firstDomainName);
      });

    it('should display a set of domains when clicking a specific page',
      function () {
        var firstDomainName = Portal.domains.listPage.table
          .getFirstRow()
          .getName();
        Portal.domains.listPage.pager.clickPageIndex(2);
        var nextFirstDomainName = Portal.domains.listPage.table
          .getFirstRow()
          .getName();
        expect(firstDomainName).not.toEqual(nextFirstDomainName);
      });

    it('should display the "Previous Page" button disabled when the first ' +
      'page is displayed',
      function () {
        expect(Portal.domains.listPage.pager.isPreviousBtnDisabled())
          .toBeTruthy();
      });

    it('should display the "Next Page" button disabled when the last page ' +
      'is displayed',
      function () {
        Portal.domains.listPage.pager
          .getAllPageIndexButtons()
          .count()
          .then(function (totalPages) {
            Portal.domains.listPage.pager.clickPageIndex(totalPages);
            expect(Portal.domains.listPage.pager.isNextBtnDisabled())
              .toBeTruthy();
          });
      });
  });
});

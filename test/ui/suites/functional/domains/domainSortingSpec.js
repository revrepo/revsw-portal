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
var Portal = require('./../../../page_objects/portal');
var DataProvider = require('./../../../common/providers/data');

describe('Functional', function () {
  describe('Domain sorting', function () {
    // use rev admin to test Account column aswell
    var adminUser = config.get('portal.users.revAdmin');
    var prefix = 'domain-sort-';

    beforeAll(function () {
      Portal.signIn(adminUser);
      var firstDomain = DataProvider.generateDomain(prefix + '1', true);
      var secondDomain = DataProvider.generateDomain(prefix + '2', true);
      Portal.createDomainIfNotExist(firstDomain);
      Portal.createDomainIfNotExist(secondDomain);
      Portal.helpers.nav.goToDomains();
      Portal.domains.listPage.searcher.setSearchCriteria(prefix);
    });

    it('should apply `ascendant` sorting by `name` column',
      function () {
        expect(Portal.domains.listPage.table.getRows().count()).toEqual(2);
        Portal.domains.listPage.table
          .getHeader()
          .getNameCell()
          .click();
        var firstRow = Portal.domains.listPage.table.getFirstRow();
        firstRow.getNameCell().getText();
        expect(firstRow.getNameCell().getText()).toContain(prefix + '1');
      });

    it('should apply `descendant` sorting by `name` column',
      function () {
        expect(Portal.domains.listPage.table.getRows().count()).toEqual(2);
        Portal.domains.listPage.table
          .getHeader()
          .getNameCell()
          .click();
        var firstRow = Portal.domains.listPage.table.getFirstRow();
        firstRow.getNameCell().getText();
        expect(firstRow.getNameCell().getText()).toContain(prefix + '2');
      });

    it('should apply `ascendant` sorting by `cName` column',
      function () {
        expect(Portal.domains.listPage.table.getRows().count()).toEqual(2);
        Portal.domains.listPage.table
          .getHeader()
          .getCNameCell()
          .click();
        var firstRow = Portal.domains.listPage.table.getFirstRow();
        firstRow.getNameCell().getText();
        expect(firstRow.getCNameCell().getText()).toContain(prefix + '1');
      });

    it('should apply `descendant` sorting by `cName` column',
      function () {
        expect(Portal.domains.listPage.table.getRows().count()).toEqual(2);
        Portal.domains.listPage.table
          .getHeader()
          .getCNameCell()
          .click();
        var firstRow = Portal.domains.listPage.table.getFirstRow();
        firstRow.getNameCell().getText();
        expect(firstRow.getCNameCell().getText()).toContain(prefix + '2');
      });

    it('should apply `ascendant` sorting by `last updated` column',
      function () {
        expect(Portal.domains.listPage.table.getRows().count()).toEqual(2);
        Portal.domains.listPage.table
          .getHeader()
          .getLastUpdatedCell()
          .click();
        var firstRow = Portal.domains.listPage.table.getFirstRow();
        firstRow.getNameCell().getText();
        expect(firstRow.getNameCell().getText()).toContain(prefix + '1');
      });

    it('should apply `descendant` sorting by `last updated` column',
      function () {
        expect(Portal.domains.listPage.table.getRows().count()).toEqual(2);
        Portal.domains.listPage.table
          .getHeader()
          .getLastUpdatedCell()
          .click();
        var firstRow = Portal.domains.listPage.table.getFirstRow();
        firstRow.getNameCell().getText();
        expect(firstRow.getNameCell().getText()).toContain(prefix + '2');
      });

    it('should apply `ascendant` sorting by `Account` column',
      function () {
        Portal.domains.listPage.searcher.clearSearchCriteria();
        Portal.domains.listPage.table.getHeader().clickAccount();
        var first;
        Portal.domains.listPage.table.getFirstRow().getAccount().then(function (val) {
          first = val;
          Portal.domains.listPage.table.getHeader().clickAccount();
          Portal.domains.listPage.table.getFirstRow().getAccount().then(function (val2) {
            expect(first).not.toEqual(val2);
          });
        });
      });

    it('should apply `descendant` sorting by `Account` column',
      function () {
        Portal.domains.listPage.searcher.clearSearchCriteria();
        var first;
        Portal.domains.listPage.table.getFirstRow().getAccount().then(function (val) {
          first = val;
          Portal.domains.listPage.table.getHeader().clickAccount();
          Portal.domains.listPage.table.getFirstRow().getAccount().then(function (val2) {
            expect(first).not.toEqual(val2);
          });
        });
      });
  });
});

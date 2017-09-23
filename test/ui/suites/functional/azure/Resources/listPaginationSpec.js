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
  describe('Resources pagination', function () {

    var revAdminUser = config.get('portal.users.revAdmin');

    beforeAll(function () {
      Portal.signIn(revAdminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.helpers.nav.goToResources();
    });

    it('should not display pagination if less than one page', function () {
      var resource = Portal
        .azureMarketplace
        .ResourcesPage
        .table
        .getFirstRow()
        .getName();

      Portal
        .azureMarketplace
        .ResourcesPage
        .searcher
        .setSearchCriteria(resource);

      expect(Portal
        .azureMarketplace
        .ResourcesPage
        .pager.isDisplayed()).toBeFalsy();

      Portal
        .azureMarketplace
        .ResourcesPage
        .searcher
        .clearSearchCriteria();

    });
    it('should switch pages when different page is clicked', function () {

      var firstRow = Portal
        .azureMarketplace
        .ResourcesPage
        .table
        .getFirstRow()
        .getSubId();

      Portal
        .azureMarketplace
        .ResourcesPage
        .pager
        .clickPageIndex(2);

      expect(
        Portal
          .azureMarketplace
          .ResourcesPage
          .table
          .getFirstRow()
          .getSubId()
      ).not.toEqual(firstRow);

      Portal
        .azureMarketplace
        .ResourcesPage
        .pager
        .clickPageIndex(1);

    });
    it('should go to next page when `next page` is clicked', function () {

      var firstRow = Portal
        .azureMarketplace
        .ResourcesPage
        .table
        .getFirstRow()
        .getSubId();

      Portal
        .azureMarketplace
        .ResourcesPage
        .pager
        .clickNext();

      expect(
        Portal
          .azureMarketplace
          .ResourcesPage
          .table
          .getFirstRow()
          .getSubId()
      ).not.toEqual(firstRow);

    });
    it('should go back when `previous page` is clicked', function () {

      var firstRow = Portal
        .azureMarketplace
        .ResourcesPage
        .table
        .getFirstRow()
        .getSubId();

      Portal
        .azureMarketplace
        .ResourcesPage
        .pager
        .clickPrevious();

      expect(
        Portal
          .azureMarketplace
          .ResourcesPage
          .table
          .getFirstRow()
          .getSubId()
      ).not.toEqual(firstRow);

    });
  });
});

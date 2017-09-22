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
  describe('Subscriptions pagination', function () {

    var revAdminUser = config.get('portal.users.revAdmin');

    beforeAll(function () {
      Portal.signIn(revAdminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.helpers.nav.goToSubscriptions();
    });

    afterEach(function () {
    });

    it('should not display pagination if there are less than 26 rows', function () {
      Portal
        .azureMarketplace.ResourcesPage
        .table
        .getRows()
        .count().then(function (rowsCount) {
          if (rowsCount < 26) {
            expect(Portal
              .azureMarketplace.ResourcesPage
              .pager
              .isDisplayed()).toBeFalsy();
          }
        });
    });
    it('should display pagination if there are more than 25 rows', function () {
      Portal
        .azureMarketplace.ResourcesPage
        .table
        .getRows()
        .count().then(function (rowsCount) {
          if (rowsCount > 25) {
            expect(Portal
              .azureMarketplace.ResourcesPage
              .pager
              .isDisplayed()).toBeTruthy();
          }
        });
    });
    it('should switch pages when different page is clicked', function () {
      Portal
        .azureMarketplace.ResourcesPage
        .table
        .getRows()
        .count().then(function (rowsCount) {
          if (rowsCount > 25) {
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
          }
        });
    });
    it('should go to next page when `next page` is clicked', function () {
      Portal
        .azureMarketplace.ResourcesPage
        .table
        .getRows()
        .count().then(function (rowsCount) {
          if (rowsCount > 25) {
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
          }
        });
    });
    it('should go back when `previous page` is clicked', function () {
      Portal
        .azureMarketplace.ResourcesPage
        .table
        .getRows()
        .count().then(function (rowsCount) {
          if (rowsCount > 25) {
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
            ).toEqual(firstRow);
          }
        });
    });
  });
});

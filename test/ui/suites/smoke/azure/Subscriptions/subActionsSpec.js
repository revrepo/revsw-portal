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
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');
var Constants = require('./../../../../page_objects/constants');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Subscription Actions', function () {

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToSubscriptions();
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
        });

        afterEach(function () {
        });


        it('should display "View" button from the first subscription',
          function () {
            expect(
              Portal
                .azureMarketplace
                .SubscriptionsPage
                .table
                .getFirstRow()
                .getViewBtn()
                .isDisplayed()
            ).toBeTruthy();
          });

        it('should display "Change Status" button from the first subscription',
          function () {
            expect(
              Portal
                .azureMarketplace
                .SubscriptionsPage
                .table
                .getFirstRow()
                .getChangeStatusBtn()
                .isDisplayed()
            ).toBeTruthy();
          });

        it('should display "View" window when view button is clicked',
          function () {
            Portal
              .azureMarketplace
              .SubscriptionsPage
              .table
              .getFirstRow()
              .clickViewBtn();
            expect(
              Portal
                .azureMarketplace
                .SubscriptionsPage
                .getViewModal()
                .isDisplayed()
            ).toBeTruthy();
          });

        it('should display "Close" button in view modal',
          function () {
            expect(
              Portal
                .azureMarketplace
                .SubscriptionsPage
                .getViewCloseBtn()
                .isDisplayed()
            ).toBeTruthy();

            Portal
              .azureMarketplace
              .SubscriptionsPage
              .clickViewCloseBtn();
          });

        it('should display "Change Status" window when change Status button is clicked',
          function () {
            Portal
              .azureMarketplace
              .SubscriptionsPage
              .table
              .getFirstRow()
              .clickChangeStatusBtn();
            expect(
              Portal
                .azureMarketplace
                .SubscriptionsPage
                .getStatusModal()
                .isDisplayed()
            ).toBeTruthy();
          });

        it('should display "Cancel" button in change Status modal',
          function () {
            expect(
              Portal
                .azureMarketplace
                .SubscriptionsPage
                .getStatusCancelBtn()
                .isDisplayed()
            ).toBeTruthy();
          });

        it('should display "Save" button in change Status modal',
          function () {
            expect(
              Portal
                .azureMarketplace
                .SubscriptionsPage
                .getStatusSaveBtn()
                .isDisplayed()
            ).toBeTruthy();
          });

        it('should display "Status" dropdown in change Status modal',
          function () {
            expect(
              Portal
                .azureMarketplace
                .SubscriptionsPage
                .getStatusDropDown()
                .isDisplayed()
            ).toBeTruthy();
          });
      });
    });
  });
});
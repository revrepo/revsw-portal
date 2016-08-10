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

describe('Smoke', function() {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin'),
  ];

  users.forEach(function(user) {

    describe('With user: ' + user.role, function() {

      describe('Activity Log List', function() {

        beforeAll(function() {
          Portal.signIn(user);
        });

        afterAll(function() {
          Portal.signOut();
        });

        beforeEach(function() {
          Portal.helpers.nav.goToActivityLog();
        });

        it('should display the Search input text in "Activity Log" page',
          function() {
            var displayed = Portal.admin.activityLog.listPage.isDisplayed();
            expect(displayed).toBeTruthy();
          });

        it('should display the Title input text in "Activity Log" page',
          function() {
            var title = Portal.admin.activityLog.listPage.getTitle();
            expect(title).toEqual('Activity Log');
          });

        it('should display button in row of list for show details',
          function() {
            var button = Portal.admin.activityLog.listPage.searchAndClickShowDetails(user.email);
            expect(button.isDisplayed()).toBeTruthy();
            Portal.dialog.clickCancel();
          });
      });
    });
  });
});

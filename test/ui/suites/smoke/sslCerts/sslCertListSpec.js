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

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('SSL Cert list', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToSSLCertificates();
        });

        it('should be displayed when clicking "SSL Certs" from sidebar',
          function () {
            expect(Portal.sslCerts.listPage.isDisplayed()).toBeTruthy();
          });

        it('should be displayed when "Back to list" button is clicked ' +
          'from "Edit SSL Cert" page',
          function () {
            Portal.sslCerts.listPage.table
              .getFirstRow()
              .clickEdit();
            Portal.sslCerts.editPage.clickBackToList();
            expect(Portal.sslCerts.listPage.isDisplayed()).toBeTruthy();
          });

        it('should be displayed when "Back to list" button is clicked from ' +
          '"Create SSL Cert" page',
          function () {
            Portal.sslCerts.listPage.clickAddNewSSLCert();
            Portal.sslCerts.addPage.clickBackToList();
            expect(Portal.sslCerts.listPage.isDisplayed()).toBeTruthy();
          });
      });
    });
  });
});

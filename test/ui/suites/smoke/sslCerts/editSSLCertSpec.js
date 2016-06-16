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
var Constants = require('./../../../page_objects/constants');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Edit SSL Cert', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.getSSLCertsPage();
        });

        it('should display edit SSL Cert button',
          function () {
          var editButton = Portal.sslCerts.listPage.table
            .getFirstRow()
            .getEditBtn();
          expect(editButton.isPresent()).toBeTruthy();
        });

        it('should display "Edit SSL Cert" form',
          function () {
          Portal.sslCerts.listPage.table
            .getFirstRow()
            .clickEdit();
          expect(Portal.sslCerts.editPage.isDisplayed()).toBeTruthy();
        });

        it('should allow to cancel an SSL Cert edition',
          function () {
          Portal.sslCerts.listPage.table
            .getFirstRow()
            .clickEdit();
          Portal.sslCerts.editPage.form.setCertName('Something Else');
          Portal.sslCerts.editPage.clickCancel();
          expect(Portal.sslCerts.listPage.isDisplayed()).toBeTruthy();
        });

        it('should update SSL Cert when filling all required data',
          function () {
          var sslCert = DataProvider.generateSSLCertData();
          Portal.createSSLCert(sslCert);
          // Edit cert name
          Portal.sslCerts.listPage.searcher.clearSearchCriteria();
          Portal.sslCerts.listPage.searcher.setSearchCriteria(sslCert.name);
          Portal.sslCerts.listPage.table
            .getFirstRow()
            .clickEdit();
          var valueAdded = ' updated';
          Portal.sslCerts.editPage.form.setCertName(valueAdded);
          Portal.sslCerts.editPage.clickUpdate();
          // Check alert message and data updated
          // Add modal steps
          var alert = Portal.alerts.getFirst();
          expect(alert.getText())
            .toContain(Constants.alertMessages.users.MSG_SUCCESS_UPDATE);
          var updatedCerttName = Portal.sslCerts.editPage.form.getCertName();
          expect(updatedCerttName).toContain(valueAdded);
          Portal.sslCerts.editPage.clickBackToList();
          // Delete created SSL Cert
          Portal.deleteSSLCert(sslCert);
        });
      });
    });
  });
});

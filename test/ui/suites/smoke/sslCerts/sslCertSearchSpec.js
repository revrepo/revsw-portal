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

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.revAdmin')
  ];

  var newSSLCert = DataProvider.generateSSLCertData();

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('SSL Certs search', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToSSLCertificates();
        });

        it('should be displayed when displaying SSL Certs List page',
          function () {
            var searchField = Portal.sslCerts.listPage.searcher
              .getSearchCriteriaTxtIn();
            expect(searchField.isPresent()).toBeTruthy();
          });

        it('should filter items according to text filled',
          function () {            
            Portal.sslCerts.listPage.clickAddNewSSLCert();
            Portal.sslCerts.addPage.createSSLCert(newSSLCert);
            Portal.helpers.nav.goToSSLCertificates();
            var phraseToSearch = newSSLCert.name;
            Portal.sslCerts.listPage.searcher.setSearchCriteria(phraseToSearch);
            var allRows = Portal.sslCerts.listPage.table.getRows();
            expect(allRows.count()).toEqual(1);
          });
      });
    });
  });
});

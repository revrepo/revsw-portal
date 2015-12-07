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
var Portal = require('./../../page_objects/portal');
var DataProvider = require('./../../common/providers/data');

describe('Negative', function () {
  describe('Edit domain', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = DataProvider.generateDomain('negativetest');

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.createDomain(myDomain);
      Portal.signOut();
    });

    afterAll(function () {
      Portal.signIn(adminUser);
      Portal.deleteDomain(myDomain);
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.signIn(adminUser);
      Portal.getDomainsPage();
    });

    afterEach(function () {
      Portal.signOut();
    });

    it('should not allow to edit the domain\'s name', function () {
      Portal.domains.listPage.searchAndClickEdit(myDomain.name);
      var domainNameField = 
        Portal.domains.editPage.domainForm.getDomainNameTxtIn();
      expect(domainNameField.isEnabled()).toBeTruthy();
    });

    it('should display an error message when trying to edit domain without ' +
      '"Domain Name"',
      function () {
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.domainForm.clearDomainName();
        Portal.domains.editPage.clickUpdateDomain();
        var alert = Portal.alerts.getFirst();
        var expectedMessage = 'child "firstname" fails because ["firstname" ' +
          'is not allowed to be empty]';
        expect(alert.getText()).toEqual(expectedMessage);
      });

    it('should display an error message when trying to edit domain without ' +
      '"Origin Server"',
      function () {
        Portal.userListPage.searchAndClickEdit(myDomain.email);
        Portal.domains.editPage.domainForm.clearOriginServer();
        Portal.domains.editPage.clickUpdateDomain();
        var alert = Portal.alerts.getFirst();
        var expectedMessage = 'child "lastname" fails because ["lastname" ' +
          'is not allowed to be empty]';
        expect(alert.getText()).toEqual(expectedMessage);
      });

    it('should display an error message when trying to edit domain without ' +
      '"Origin Host Header"',
      function () {
        Portal.userListPage.searchAndClickEdit(myDomain.email);
        Portal.domains.editPage.domainForm.clearOriginHostHeader();
        Portal.domains.editPage.clickUpdateDomain();
        var alert = Portal.alerts.getFirst();
        var expectedMessage = 'child "role" fails because ["role" must be ' +
          'a string]';
        expect(alert.getText()).toEqual(expectedMessage);
      });

    it('should display an error message when trying to edit domain without ' +
      '"Domain Origin Location"',
      function () {
        Portal.userListPage.searchAndClickEdit(myDomain.email);
        Portal.domains.editPage.domainForm.
          setDomainOriginLocation('--- Select role ---');
        Portal.domains.editPage.clickUpdateDomain();
        var alert = Portal.alerts.getFirst();
        var expectedMessage = 'child "role" fails because ["role" must be ' +
          'a string]';
        expect(alert.getText()).toEqual(expectedMessage);
      });
  });
});

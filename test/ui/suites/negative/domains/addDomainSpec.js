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
var Portal = require('./../../../page_objects/portal');
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Negative', function () {
  describe('Add domain', function () {

    // TODO: Add domain add tests for reseller and revadmin roles

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
      Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    it('should have both Create buttons disabled on fresh new domain form',
      function () {
        Portal.helpers.nav.goToDomains();
        Portal.domains.listPage.clickAddNewDomain();
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
        addBtn = Portal.domains.addPage.getCreateDomainAndAddMoreBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create a domain if domain name field has empty values',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.name = ' ';
        Portal.helpers.nav.goToDomains();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create a domain if origin server field has empty values',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.originServer = ' ';
        Portal.helpers.nav.goToDomains();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create domain if origin host header field has empty values',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.originHostHeader = ' ';
        Portal.helpers.nav.goToDomains();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create a domain, if location list option is not selected ',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.originLocation = '--- Select Location ---';
        Portal.helpers.nav.goToDomains();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create domain when all fields have white spaces',
      function () {
        var myDomain = DataProvider.generateDomain();
        Portal.helpers.nav.goToDomains();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create a domain if domain name field has white spaces',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.name = '';
        Portal.helpers.nav.goToDomains();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create a domain if origin server field has white space',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.originServer = '';
        Portal.helpers.nav.goToDomains();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create domain if origin host header field has white spaces',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.originHostHeader = '';
        Portal.helpers.nav.goToDomains();
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.fillForm(myDomain);
        var addBtn = Portal.domains.addPage.getCreateDomainBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create a domain with duplicate values', function () {
      var dupeDomain = DataProvider.generateDomain('dupedomain');
      Portal.helpers.nav.goToDomains();
      Portal.domains.listPage.clickAddNewDomain();
      Portal.domains.addPage.createDomain(dupeDomain);
      Portal.domains.addPage.createDomain(dupeDomain);

      var alert = Portal.alerts.getFirst();
      var expectedMsg = Constants.alertMessages.domains.MSG_FAIL_ADD_DUPLICATE_NAME;
      expect(alert.getText()).toContain(expectedMsg);
    });
  });
});

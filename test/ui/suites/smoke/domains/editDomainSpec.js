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

describe('Smoke', function () {
  describe('Edit domain', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = DataProvider.generateDomain('mydomain');

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.createDomain(myDomain);
    });

    afterAll(function () {
      Portal.deleteDomain(myDomain);
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.header.goTo(Constants.header.appMenu.WEB);
    });

    it('should display "Edit" domain page', function () {
      Portal.domains.listPage.searchAndClickEdit(myDomain.name);
      expect(Portal.domains.editPage.isDisplayed()).toBeTruthy();
    });

    it('should display "Back To List" domain button', function () {
      Portal.domains.listPage.searchAndClickEdit(myDomain.name);
      var backToListButton = Portal.domains.editPage.getBackToListBtn();
      expect(backToListButton.isPresent()).toBeTruthy();
    });

    it('should display "Validate" domain button', function () {
      Portal.domains.listPage.searchAndClickEdit(myDomain.name);
      var validateButton = Portal.domains.editPage.getValidateDomainBtn();
      expect(validateButton.isPresent()).toBeTruthy();
    });

    it('should display "Update" domain button', function () {
      Portal.domains.listPage.searchAndClickEdit(myDomain.name);
      var updateButton = Portal.domains.editPage.getUpdateDomainBtn();
      expect(updateButton.isPresent()).toBeTruthy();
    });

    it('should display "Publish" domain button', function () {
      Portal.domains.listPage.searchAndClickEdit(myDomain.name);
      var publishButton = Portal.domains.editPage.getPublishDomainBtn();
      expect(publishButton.isPresent()).toBeTruthy();
    });

    it('should display "Cancel" domain button', function () {
      Portal.domains.listPage.searchAndClickEdit(myDomain.name);
      var cancelButton = Portal.domains.editPage.getCancelBtn();
      expect(cancelButton.isPresent()).toBeTruthy();
    });

    it('should display "Edit Domain" form', function () {
      Portal.domains.listPage.searchAndClickEdit(myDomain.name);
      var domainForm = Portal.domains.editPage.domainForm.isDisplayed();
      expect(domainForm).toBeTruthy();
    });

    it('should allow to cancel an domain edition', function () {
      Portal.domains.listPage.searchAndClickEdit(myDomain.name);
      Portal.domains.editPage.domainForm.setOriginServer('x');
      Portal.domains.editPage.domainForm.setOriginHostHeader('x');
      Portal.domains.editPage.clickCancel();
      expect(Portal.domains.listPage.isDisplayed()).toBeTruthy();
    });
  });
});

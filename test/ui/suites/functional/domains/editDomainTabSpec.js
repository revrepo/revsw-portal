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

describe('Functional', function () {  // jshint ignore:line
  describe('Edit domain tabs', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = DataProvider.generateDomain('mydomain');

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.createDomain(myDomain);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.helpers.nav.goToDomains();
      Portal.domains.listPage.searchAndClickEdit(myDomain.name);
    });

    it('should keep correct active tab after clicking `Refresh`',
      function () {
        Portal.domains.editPage.clickTabACL();
        Portal.domains.editPage.clickRefreshBtn();
        expect(Portal.domains.editPage.form.getACLRulesEnableSw().isDisplayed()).toBeTruthy();
      }); 
      
      it('should reset active tab to `General Settings` after clicking `Cancel`',
      function () {
        Portal.domains.editPage.clickTabACL();
        Portal.domains.editPage.clickCancel();
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        expect(Portal.domains.editPage.form.getDomainNameTxtIn().isDisplayed()).toBeTruthy();
      });
  });
});

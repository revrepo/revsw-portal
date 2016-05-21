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

describe('Boundary', function () {
  describe('Edit domain', function () {

    var adminUser = config.get('portal.users.admin');
    var lenStr100 = new Array(100).join('x') + '.com';
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

    afterEach(function () {
    });

    it('should have action buttons disabled when trying to update domain with ' +
      'long value in origin server field (100)',
      function () {
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.form.setOriginServer(lenStr100);
        var validateBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(validateBtn.isEnabled()).toBeFalsy();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
    });

    it('should have action buttons disabled when trying to update domain with ' +
      'with value in origin host header field (100)',
      function () {
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.form.setOriginHostHeader(lenStr100);
        var validateBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(validateBtn.isEnabled()).toBeFalsy();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
    });

    it('should not alow to validate/update/publish a domain with value in origin ' +
        'server location field',
      function () {
        var location = '--- Select Location ---';
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.form.setDomainOriginLocation(location);
        var validateBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(validateBtn.isEnabled()).toBeFalsy();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
    });
  });
});

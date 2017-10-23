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
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.helpers.nav.goToDomains();
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

    it('should not allow to validate/update/publish a domain with value in data ' +
      'read timeout field (5)',
      function () {
        var val = 12345;
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.form.setDataReadTimeout(val);
        var validateBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(validateBtn.isEnabled()).toBeFalsy();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not allow to validate/update/publish a domain with value in comment ' +
      ' field (300)',
      function () {
        var lenStr300 = new Array(300).join('x') + 'teststring';
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.form.setComment(lenStr300);
        var validateBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(validateBtn.isEnabled()).toBeFalsy();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not allow to validate/update/publish a domain with value in origin ' +
      ' Monitoring HTTP Request field (300)',
      function () {
        var lenStr300 = new Array(300).join('x') + 'teststring';
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabOriginHealthMonitoring();
        Portal.domains.editPage.form.clickOriginHealthMonitoringBtn();
        Portal.domains.editPage.form.setOriginMonitoringHTTPrequest(lenStr300);
        var validateBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(validateBtn.isEnabled()).toBeFalsy();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not allow to validate/update/publish a domain with value in probe ' +
      ' timeout field (3)',
      function () {
        var val = 123;
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabOriginHealthMonitoring();
        Portal.domains.editPage.form.clickOriginHealthMonitoringBtn();
        Portal.domains.editPage.form.setProbeTimeout(val);
        var validateBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(validateBtn.isEnabled()).toBeFalsy();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not allow to validate/update/publish a domain with value in probe ' +
      ' interval field (5)',
      function () {
        var val = 12345;
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabOriginHealthMonitoring();
        Portal.domains.editPage.form.clickOriginHealthMonitoringBtn();
        Portal.domains.editPage.form.setProbeInterval(val);
        var validateBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(validateBtn.isEnabled()).toBeFalsy();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not allow to validate/update/publish a domain with value in ' +
      ' Expected HTTP Response Code field (1)',
      function () {
        var val = 1;
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabOriginHealthMonitoring();
        Portal.domains.editPage.form.clickOriginHealthMonitoringBtn();
        Portal.domains.editPage.form.setExpectedHTTPresponseCode(val);
        var validateBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(validateBtn.isEnabled()).toBeFalsy();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not allow to validate/update/publish a domain with value in ' +
      ' Expected HTTP Response Code field (4)',
      function () {
        var val = 1234;
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabOriginHealthMonitoring();
        Portal.domains.editPage.form.clickOriginHealthMonitoringBtn();
        Portal.domains.editPage.form.setExpectedHTTPresponseCode(val);
        var validateBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(validateBtn.isEnabled()).toBeFalsy();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

      it('should not allow to validate/update/publish a domain with an invalid value in ' +
      ' WAF -> Location',
      function () {
        var val = '/@';
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabWAF();
        Portal.domains.editPage.form.getWAFSwitch().click();
        Portal.domains.editPage.form.setWAFLocation(val);
        var validateBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(validateBtn.isEnabled()).toBeFalsy();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

      it('should not allow to validate/update/publish a domain with an invalid value in ' +
      ' Bot Protection -> Location',
      function () {
        var val = '/@';
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabBotProtection();
        Portal.domains.editPage.form.getBotProtectionEnableSw().click();
        Portal.domains.editPage.form.setBotLocation(val);
        var validateBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(validateBtn.isEnabled()).toBeFalsy();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

      it('should not allow to validate/update/publish a domain with an invalid value in ' +
      ' Bot Protection -> Call Type',
      function () {
        var val = '7';
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabBotProtection();
        Portal.domains.editPage.form.getBotProtectionEnableSw().click();
        Portal.domains.editPage.form.setBotCallType(val);
        var validateBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(validateBtn.isEnabled()).toBeFalsy();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });
  });
});

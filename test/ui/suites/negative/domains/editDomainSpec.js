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

describe('Negative', function () {
  describe('Edit domain', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = DataProvider.generateDomain('negativetest');

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.createDomain(myDomain);
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToDomains();
    });

    afterEach(function () {
      Portal.signOut();
    });

    it('should allow to update domain if form is filled with valid data', function () {
      Portal.domains.listPage.searchAndClickEdit(myDomain.name);
      expect(Portal.domains.editPage.getUpdateDomainBtn().isEnabled()).toBeTruthy();
    });
    it('should allow to validate domain if form is filled with valid data', function () {
      Portal.domains.listPage.searchAndClickEdit(myDomain.name);
      expect(Portal.domains.editPage.getValidateDomainBtn().isEnabled()).toBeTruthy();
    });

    it('should allow to publish domain if form is filled with valid data', function () {
      Portal.domains.listPage.searchAndClickEdit(myDomain.name);
      expect(Portal.domains.editPage.getPublishDomainBtn().isEnabled()).toBeTruthy();
    });


    it('should not allow to edit the domain\'s name', function () {
      Portal.domains.listPage.searchAndClickEdit(myDomain.name);
      var domainNameField =
        Portal.domains.editPage.form.getDomainNameTxtIn();
      expect(domainNameField.isEnabled()).toBeFalsy();
    });

    it('should not allow to validate/update/publish a domain without ' +
      '"Origin Server"',
      function () {
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.form.clearOriginServer();
        var validateBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(validateBtn.isEnabled()).toBeFalsy();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to update a domain without "Origin Host Header" value',
      function () {
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.form.clearOriginHostHeader();
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to publish a domain without "Origin Host Header" value',
      function () {
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.form.clearOriginHostHeader();
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to update a domain with invalid value in "Wildcard Domain Alias"',
      function () {
        var incorrectValue = 'a';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.form.clearWildcardDomainAlias();
        Portal.domains.editPage.form.setWildcardDomainAlias(incorrectValue);
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to publish a domain with invalid value in "Wildcard Domain Alias"',
      function () {
        var incorrectValue = 'a';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.form.clearWildcardDomainAlias();
        Portal.domains.editPage.form.setWildcardDomainAlias(incorrectValue);
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to update a domain with invalid value in "Probe Timeout"',
      function () {
        var incorrectValue = 'a';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabOriginHealthMonitoring();
        Portal.domains.editPage.form.clickOriginHealthMonitoringBtn();
        Portal.domains.editPage.form.setProbeTimeout(incorrectValue);
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to publish a domain with invalid value in "Probe Timeout"',
      function () {
        var incorrectValue = 'a';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabOriginHealthMonitoring();
        Portal.domains.editPage.form.clickOriginHealthMonitoringBtn();
        Portal.domains.editPage.form.setProbeTimeout(incorrectValue);
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to update a domain with invalid value in "Probe Interval"',
      function () {
        var incorrectValue = 'a';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabOriginHealthMonitoring();
        Portal.domains.editPage.form.clickOriginHealthMonitoringBtn();
        Portal.domains.editPage.form.setProbeInterval(incorrectValue);
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to publish a domain with invalid value in "Probe Interval"',
      function () {
        var incorrectValue = 'a';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabOriginHealthMonitoring();
        Portal.domains.editPage.form.clickOriginHealthMonitoringBtn();
        Portal.domains.editPage.form.setProbeInterval(incorrectValue);
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to update a domain with invalid value in ' +
      '"Expected HTTP Response Code"',
      function () {
        var incorrectValue = '1';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabOriginHealthMonitoring();
        Portal.domains.editPage.form.clickOriginHealthMonitoringBtn();
        Portal.domains.editPage.form.setExpectedHTTPresponseCode(incorrectValue);
        var updateBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to publish a domain with invalid value in ' +
      '"Expected HTTP Response Code"',
      function () {
        var incorrectValue = '1';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabOriginHealthMonitoring();
        Portal.domains.editPage.form.clickOriginHealthMonitoringBtn();
        Portal.domains.editPage.form.setExpectedHTTPresponseCode(incorrectValue);
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to publish a domain with empty value in ' +
      '"WAF -> Location"',
      function () {
        var incorrectValue = '';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabWAF();
        Portal.domains.editPage.form.clickWAFSwitch();
        Portal.domains.editPage.form.setWAFLocation(incorrectValue);
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to update a domain with empty value in ' +
      '"WAF -> Location"',
      function () {
        var incorrectValue = '';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabWAF();
        Portal.domains.editPage.form.clickWAFSwitch();
        Portal.domains.editPage.form.setWAFLocation(incorrectValue);
        var publishBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to validate a domain with empty value in ' +
      '"WAF -> Location"',
      function () {
        var incorrectValue = '';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabWAF();
        Portal.domains.editPage.form.clickWAFSwitch();
        Portal.domains.editPage.form.setWAFLocation(incorrectValue);
        var publishBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to publish a domain with empty value in ' +
      '"Bot protection -> Location"',
      function () {
        var incorrectValue = '';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabBotProtection();
        Portal.domains.editPage.form.clickBotProtectionEnableSw();
        Portal.domains.editPage.form.setBotLocation(incorrectValue);
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to update a domain with empty value in ' +
      '"Bot protection -> Location"',
      function () {
        var incorrectValue = '';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabBotProtection();
        Portal.domains.editPage.form.clickBotProtectionEnableSw();
        Portal.domains.editPage.form.setBotLocation(incorrectValue);
        var publishBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to validate a domain with empty value in ' +
      '"Bot protection -> Location"',
      function () {
        var incorrectValue = '';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabBotProtection();
        Portal.domains.editPage.form.clickBotProtectionEnableSw();
        Portal.domains.editPage.form.setBotLocation(incorrectValue);
        var publishBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to publish a domain with empty value in ' +
      '"Bot protection -> Call Type"',
      function () {
        var incorrectValue = '';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabBotProtection();
        Portal.domains.editPage.form.clickBotProtectionEnableSw();
        Portal.domains.editPage.form.setBotCallType(incorrectValue);
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to update a domain with empty value in ' +
      '"Bot protection -> Call Type"',
      function () {
        var incorrectValue = '';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabBotProtection();
        Portal.domains.editPage.form.clickBotProtectionEnableSw();
        Portal.domains.editPage.form.setBotCallType(incorrectValue);
        var publishBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to validate a domain with empty value in ' +
      '"Bot protection -> Call Type"',
      function () {
        var incorrectValue = '';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabBotProtection();
        Portal.domains.editPage.form.clickBotProtectionEnableSw();
        Portal.domains.editPage.form.setBotCallType(incorrectValue);
        var publishBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to publish a domain with empty value in ' +
      '"Bot protection -> Bot Protection ID"',
      function () {
        var incorrectValue = '';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabBotProtection();
        Portal.domains.editPage.form.clickBotProtectionEnableSw();
        Portal.domains.editPage.form.setBotProtectionID('a');
        Portal.domains.editPage.form.setBotProtectionID(incorrectValue);
        var publishBtn = Portal.domains.editPage.getPublishDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to update a domain with empty value in ' +
      '"Bot protection -> Bot Protection ID"',
      function () {
        var incorrectValue = '';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabBotProtection();
        Portal.domains.editPage.form.clickBotProtectionEnableSw();
        Portal.domains.editPage.form.setBotProtectionID('a');
        Portal.domains.editPage.form.setBotProtectionID(incorrectValue);
        var publishBtn = Portal.domains.editPage.getUpdateDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });

    it('should not be able to validate a domain with empty value in ' +
      '"Bot protection -> Bot Protection ID"',
      function () {
        var incorrectValue = '';

        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.clickTabBotProtection();
        Portal.domains.editPage.form.clickBotProtectionEnableSw();
        Portal.domains.editPage.form.setBotProtectionID('a');
        Portal.domains.editPage.form.setBotProtectionID(incorrectValue);
        var publishBtn = Portal.domains.editPage.getValidateDomainBtn();
        expect(publishBtn.isEnabled()).toBeFalsy();
      });
  });
});

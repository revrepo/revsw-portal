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

describe('Functional', function () {
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

    it('should not update domain with long value in origin server field (100)',
      function () {
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.domainForm.setOriginServer(lenStr100);
        Portal.domains.editPage.clickUpdateDomain();
        Portal.dialog.clickOk();

        var alert = Portal.alerts.getFirst();
        var expectedMsg = 'Domain updated';
        expect(alert.getText()).not.toEqual(expectedMsg);
    });

    it('should not update domain with value in origin host header field (100)',
      function () {
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.domainForm.setOriginHostHeader(lenStr100);
        Portal.domains.editPage.clickUpdateDomain();
        Portal.dialog.clickOk();

        var alert = Portal.alerts.getFirst();
        var expectedMsg = 'child "origin_host_header" fails because ["origin_';
        expect(alert.getText()).toContain(expectedMsg);
        expect(alert.getText()).toContain(lenStr100);
    });

    it('should not update domain with value in origin server location field',
      function () {
        var location = '--- Select location ---';
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.domainForm.setDomainOriginLocation(location);
        Portal.domains.editPage.clickUpdateDomain();
        Portal.dialog.clickOk();

        var alert = Portal.alerts.getFirst();
        var expectedMsg1 = 'child "origin_server_location_id" fails because';
        var expectedMsg2 = '["origin_server_location_id" must be a string]';
        expect(alert.getText()).toContain(expectedMsg1);
        expect(alert.getText()).toContain(expectedMsg2);
    });

    it('should validate the length value in origin host header field (100)',
      function () {
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.domainForm.setOriginHostHeader(lenStr100);
        Portal.domains.editPage.clickValidateDomain();

        var alert = Portal.alerts.getFirst();
        var expectedMsg = 'child "origin_host_header" fails because ["origin_';
        expect(alert.getText()).toContain(expectedMsg);
        expect(alert.getText()).toContain(lenStr100);
    });

    it('should validate the length value in domain origin location select',
      function () {
        var location = '--- Select location ---';
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.domainForm.setDomainOriginLocation(location);
        Portal.domains.editPage.clickValidateDomain();

        var alert = Portal.alerts.getFirst();
        var expectedMsg1 = 'child "origin_server_location_id" fails because';
        var expectedMsg2 = '["origin_server_location_id" must be a string]';
        expect(alert.getText()).toContain(expectedMsg1);
        expect(alert.getText()).toContain(expectedMsg2);
    });

    it('should not publish domain with value in origin host header field (100)',
      function () {
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.domainForm.setOriginHostHeader(lenStr100);
        Portal.domains.editPage.clickPublishDomain();
        Portal.dialog.clickOk();

        var alert = Portal.alerts.getFirst();
        var expectedMsg = 'child "origin_host_header" fails because ["origin_';
        expect(alert.getText()).toContain(expectedMsg);
        expect(alert.getText()).toContain(lenStr100);
    });

    it('should not publish domain with value in origin server location field',
      function () {
        var location = '--- Select location ---';
        Portal.domains.listPage.searchAndClickEdit(myDomain.name);
        Portal.domains.editPage.domainForm.setDomainOriginLocation(location);
        Portal.domains.editPage.clickPublishDomain();
        Portal.dialog.clickOk();

        var alert = Portal.alerts.getFirst();
        var expectedMsg1 = 'child "origin_server_location_id" fails because';
        var expectedMsg2 = '["origin_server_location_id" must be a string]';
        expect(alert.getText()).toContain(expectedMsg1);
        expect(alert.getText()).toContain(expectedMsg2);
    });
  });
});

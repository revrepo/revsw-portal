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

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
    });

    afterAll(function () {
    });

    beforeEach(function () {
      Portal.signIn(adminUser);
      Portal.getPage(Constants.hashFragments.domains.new);
    });

    afterEach(function () {
      Portal.signOut();
    });

    it('should not create domain when all required fields are empty',
      function () {
        var myDomain = DataProvider.generateDomain();
        Portal.domains.addPage.createDomain(myDomain);
        var alert = Portal.alerts.getFirst();
        var expectedMsg = 'child "domain_name" fails because ["domain_name" ' +
          'is required]';
        expect(alert.getText()).toEqual(expectedMsg);
      });

    it('should not create a domain if domain name field has blank values',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.name = '';
        Portal.domains.addPage.createDomain(myDomain);
        var alert = Portal.alerts.getFirst();
        var expectedMsg = 'child "domain_name" fails because ["domain_name" ' +
          'is not allowed to be empty]';
        expect(alert.getText()).toEqual(expectedMsg);
      });

    it('should not create a domain if origin server field has blank values',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.originServer = '';
        Portal.domains.addPage.createDomain(myDomain);
        var alert = Portal.alerts.getFirst();
        var expectedMsg = 'child "origin_server" fails because ' +
          '["origin_server" is not allowed to be empty]';
        expect(alert.getText()).toEqual(expectedMsg);
      });

    it('should not create domain if origin host header field has blank values',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.originHostHeader = '';
        Portal.domains.addPage.createDomain(myDomain);
        var alert = Portal.alerts.getFirst();
        var expectedMsg = 'child "origin_host_header" fails because ' +
          '["origin_host_header" is not allowed to be empty]';
        expect(alert.getText()).toEqual(expectedMsg);
      });

    it('should not create a domain, if location list option is not selected ',
      function () {
        var myDomain = DataProvider.generateDomain('mydomain');
        myDomain.originLocation = '--- Select location ---';
        Portal.domains.addPage.createDomain(myDomain);
        var alert = Portal.alerts.getFirst();
        var expectedMsg = 'child "origin_server_location_id" fails because ' +
          '["origin_server_location_id" is required]';
        expect(alert.getText()).toEqual(expectedMsg);
      });
  });
});

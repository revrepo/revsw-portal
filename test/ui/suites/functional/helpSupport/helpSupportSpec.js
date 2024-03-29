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
  describe('Help and Support', function () {

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToAPIDocumentation();
    });

    afterAll(function () {
      Portal.signOut();
    });

    it('should get "Customer Support" url and open the page',
      function () {
        var customerSupport = 'Open Ticket';
        var url = 'https://support.nuubit.net/hc/en-us/requests/new';
        expect(Portal.helpSupportPage.openUrl(customerSupport)).toEqual(url);
    });

    it('should get "API Documentation" url and open the page',
      function () {
        var customerSupport = 'API Documentation';
        var url = 'https://testsjc20-api01.revsw.net/';
        expect(Portal.helpSupportPage.openUrl(customerSupport)).toEqual(url);
    });

    it('should get "Knowledge Base" url and open the page',
      function () {
        var customerSupport = 'Knowledge Base';
        var url = 'https://support.nuubit.net/hc/en-us';
        expect(Portal.helpSupportPage.openUrl(customerSupport)).toEqual(url);
    });

    it('should get "Network Status" url and open the page',
      function () {
        var customerSupport = 'Network Status';
        var url = 'http://www.nuubitstatus.net/';
        expect(Portal.helpSupportPage.openUrl(customerSupport)).toEqual(url);
    });
  });
});

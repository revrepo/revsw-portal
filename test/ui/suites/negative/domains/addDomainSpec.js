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
  describe('Add domain', function () {

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
    });

    afterAll(function () {
    });

    beforeEach(function () {
      Portal.signIn(adminUser);
    });

    afterEach(function () {
      Portal.signOut();
    });

    it('should not create domain when a required field is filled with blank ' +
      'space chars',
      function () {
        var emptyDomain = {};
        Portal.createDomain(emptyDomain);
        var alert = Portal.alerts.getFirst();
        var expectedMsg = 'child "domain_name" fails because ["domain_name" ' +
          'is required]';
        expect(alert.getText()).toEqual(expectedMsg);
      });

    it('should not create a domain without blank space chars in domain name ' +
      'field',
      function () {
      });

    it('should not create a domain without blank space chars in origin ' +
      'server name ip field',
      function () {
      });

    it('should not create a domain without blank space chars in origin host ' +
      'header field',
      function () {
      });

    it('should not create a domain without blank space chars in domain ' +
      'origin location field',
      function () {
      });

    // it('should not create duplicated domains',
    //   function () {
    //     var emptyDomain = {
    //       name: 'mydomain.com',
    //       originServer: 'originservername.com',
    //       originHostHeader: 'originhostheader.com',
    //       originLocation: 'HQ Test Lab'
    //     };
    //     Portal.createDomain(emptyDomain);
    //     var alert = Portal.alerts.getFirst();
    //     var expectedMsg =
    //                  'The domain name is already registered in the system';
    //     expect(alert.getText()).toEqual(expectedMsg);
    //   });
  });
});

/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
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

describe('Smoke', function () {
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.secondReseller'),
    config.get('portal.users.user'),
    config.get('portal.users.roUser')
  ];

  users.forEach(function (user) {
    describe('For user: ' + user.role, function () {

      describe('Display user information', function () {
        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });
        it('should display User info in nav bar.',
          function () {
            var userInfoEl = Portal.header.getUserInfoEl();
            expect(userInfoEl.isDisplayed()).toBeTruthy();
          });

        switch (user.role) {
          case 'RO User':
            it('should display READ-ONLY message',
              function () {
                var userInfoEl = Portal.header.getUserInfoEl();
                expect(userInfoEl.getText()).toContain('READ-ONLY');
              });
            break;
          default:
            it('should not display READ-ONLY message',
              function () {
                var userInfoEl = Portal.header.getUserInfoEl();
                expect(userInfoEl.getText()).not.toContain('READ-ONLY');
              });
            break;
        }
      });
    });
  });

});

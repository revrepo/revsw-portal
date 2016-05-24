/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
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

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    //config.get('portal.users.admin'),
    //config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {
      describe('Add user', function () {

        beforeAll(function () {
          // Portal.signIn(user);
          var newUser = Portal.signUpUser();
          console.log(newUser);
        });

        afterAll(function () {
          // Portal.signOut();
          browser.ignoreSynchronization = true;
        });

        beforeEach(function () {
          // done
        });

        afterEach(function () {
          // done
        });

        it('should display "Add user" form', function () {
          console.log('END TEST!!!');
        });
      });
    });
  });
});

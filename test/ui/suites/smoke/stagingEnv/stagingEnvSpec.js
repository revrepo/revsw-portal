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

var users = [
  config.get('portal.users.admin'),
  config.get('portal.users.revAdmin'),
  config.get('portal.users.reseller'),
  config.get('portal.users.user')
];

var expectedIpAddress = '192.168.4.53';

describe('Smoke', function() {

  users.forEach(function(user) {

    describe('With user: ' + user.role, function() {
      describe('Staging Env', function() {

        beforeAll(function() {
          Portal.signIn(user);
          Portal.helpers.nav.goToStagingEnvironment();
        });

        afterAll(function() {
          Portal.signOut();
        });

        it('should display "Staging Env" page',
          function() {
            var expectedTitle = 'Staging Environment';
            var title = Portal.stagingEnv.page.getTitle();
            expect(title).toEqual(expectedTitle);
          });

        it('should display staging server ip address',
          function() {
            var ip = Portal.stagingEnv.page.getStagingServer();
            expect(ip).toBe(expectedIpAddress);
          });

        it('should display staging server ip address in etc/hosts config',
          function() {
            var configString = Portal.stagingEnv.page.getConfigString();
            expect(configString).toContain(expectedIpAddress);
          });

        it('should display staging server ip address in example string',
          function() {
            var exampleString = Portal.stagingEnv.page.getExampleString();
            expect(exampleString).toContain(expectedIpAddress);
          });
      });
    });
  });
});

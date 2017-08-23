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

describe('Smoke', function() {
  users.forEach(function(user) {
    describe('With user: ' + user.role, function() {
      describe('CDN IP Blocks', function() {

        beforeAll(function() {
          Portal.signIn(user);
          Portal.helpers.nav.goToCDNIPBlocks();
        });

        afterAll(function() {
          Portal.signOut();
        });

        it('should display "CDN IP Blocks" page',
          function() {
            var expectedTitle = 'CDN IP Blocks';
            var title = Portal.cdnIPBlocks.page.getTitle();
            expect(title).toEqual(expectedTitle);
          });

        it('should display IP subnets which may ship logs ',
          function() {
            var listIPSubnetsLogShipping = Portal.cdnIPBlocks.page.getListItemsLogShippingBlocksList();
            expect(listIPSubnetsLogShipping.count()).toBeGreaterThan(0);
          });

        it('should display IP subnets which may send origin requests',
          function() {
            var listIPSubnets = Portal.cdnIPBlocks.page.getListItemsEdgeBlocksList();
            expect(listIPSubnets.count()).toBeGreaterThan(0);
          });

      });
    });
  });
});

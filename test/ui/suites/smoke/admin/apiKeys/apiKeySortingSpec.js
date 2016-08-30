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
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');
var Constants = require('./../../../../page_objects/constants');

describe('Smoke', function () {

  describe('API Keys Sorting', function () {

    var revAdminUser = config.get('portal.users.revAdmin');

    beforeAll(function () {
      Portal.signIn(revAdminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.helpers.nav.goToAPIKeys();
    });

    afterEach(function () {
    });

    it('should apply `descendant` sorting by `API Key Name` column',
      function () {
        Portal.admin.apiKeys.listPage.table.getHeader().clickName();
        var name1 = Portal.admin.apiKeys.listPage.table.getFirstRow().getName();
        Portal.admin.apiKeys.listPage.table.getHeader().clickName();
        var name2 = Portal.admin.apiKeys.listPage.table.getFirstRow().getName();
        expect(name1).toBeLessThan(name2);
      });

    it('should apply `ascendant` sorting by `API Key Name` column',
      function () {
        Portal.admin.apiKeys.listPage.table.getHeader().clickName();
        Portal.admin.apiKeys.listPage.table.getHeader().clickName();
        var name1 = Portal.admin.apiKeys.listPage.table.getFirstRow().getName();
        Portal.admin.apiKeys.listPage.table.getHeader().clickName();
        var name2 = Portal.admin.apiKeys.listPage.table.getFirstRow().getName();
        expect(name1).toBeGreaterThan(name2);
      });
  });
});
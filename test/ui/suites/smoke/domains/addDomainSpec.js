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
var Portal = require('./../../page_objects/portal');
var DataProvider = require('./../../common/providers/data');

describe('Smoke', function () {
  describe('Add domain', function () {

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
      Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.getDomainsPage();
    });

    it('should display "Add domain" form', function () {
      Portal.domains.listPage.clickAddNewDomain();
      expect(Portal.addDomainPage.isDisplayed()).toBeTruthy();
      expect(Portal.addDomainPage.domainForm.isDisplayed()).toBeTruthy();
    });

    it('should allow to cancel a domain edition in domain form', function () {
      Portal.domains.listPage.clickAddNewDomain();
      Portal.addDomainPage.domainForm.setDomainName('smoke.test.com');
      Portal.addDomainPage.clickCancel();
      expect(Portal.domains.listPage.isDisplayed()).toBeTruthy();
    });

    it('should create a domain successfully when filling all required data',
      function () {
        // Create domain
        var smoketest = DataProvider.generateDomain('smoketest');
        Portal.domains.listPage.clickAddNewDomain();
        Portal.addDomainPage.createDomain(smoketest);
        // Check App alert notifications
        expect(Portal.alerts.getAll().count()).toEqual(1);
        expect(Portal.alerts.getFirst().getText()).toEqual('Domain created');
        // Delete created domain
        Portal.deleteDomain(smoketest);
      });
  });
});

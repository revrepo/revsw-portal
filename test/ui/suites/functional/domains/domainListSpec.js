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

describe('Functional', function () {
  describe('Domain list', function () {

    var user = config.get('portal.users.admin');

    beforeAll(function () {
      Portal.signIn(user);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.getDomainsPage();
    });

    it('should display domain with a Staging Status',
      function () {
        Portal.domains.listPage.domainsTbl
          .getRow(0)
          .getStagingStatusIcon()
          .isDisplayed()
          .then(function (isDisplayed) {
            expect(isDisplayed).toBeTruthy();
          });
      });

    it('should display domain with a Global Status',
      function () {
        Portal.domains.listPage.domainsTbl
          .getRow(0)
          .getGlobalStatusIcon()
          .isDisplayed()
          .then(function (isDisplayed) {
            expect(isDisplayed).toBeTruthy();
          });
      });

    it('should display a new domain created',
      function () {
        var myDomain = DataProvider.generateDomain('my-domain');
        // Create domain
        Portal.createDomain(myDomain);
        // Check domain is in list
        var newDomain = Portal.domains.listPage
          .searchAndGetFirstRow(myDomain.name);
        expect(newDomain.getName()).toEqual(myDomain.name);
        // Delete domain
        Portal.deleteDomain(myDomain);
      });

    // TODO: PeEnding, need to fix the validation
    xit('should display `In Progress` staging status right after creating a ' +
      'domain',
      function () {
        var myDomain = DataProvider.generateDomain('my-domain');
        // Create domain
        Portal.createDomain(myDomain);
        // Check domain is in list
        Portal.domains.listPage
          .searchAndGetFirstRow(myDomain.name)
          .getStagingStatusIcon()
          .getAttribute('tooltip')
          .then(function (isDisplayed) {
            console.log('STAGING', isDisplayed);
            Portal.deleteDomain(myDomain);
          });
      });

    // TODO: PeEnding, need to fix the validation and also create domain fails
    xit('should display `In Progress` global status right after creating a ' +
      'domain',
      function () {
        var myDomain = DataProvider.generateDomain('my-domain');
        // Create domain
        Portal.createDomain(myDomain);
        // Check domain is in list
        Portal.domains.listPage
          .searchAndGetFirstRow(myDomain.name)
          .getStagingStatusIcon()
          .getAttribute('tooltip')
          .then(function (isDisplayed) {
            console.log('STAGING', isDisplayed);
            Portal.deleteDomain(myDomain);
          });
      });
  });
});

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

describe('Workflow', function () {
  describe('Add Domain', function () {

    var user = config.get('portal.users.admin');

    beforeAll(function () {
      Portal.signIn(user);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.helpers.nav.goToDomains();
    });

    it('should allow to create a domain right after creating other domain',
      function () {
        var firstDomain = DataProvider.generateDomain('first-domain');
        var secondDomain = DataProvider.generateDomain('second-domain');
        // Create domain
        Portal.createDomain(firstDomain);
        // Check domain is in list
        Portal.domains.listPage.clickAddNewDomain();
        Portal.domains.addPage.createDomain(secondDomain);
        var alert = Portal.alerts.getFirst();
        var expectedMsg = Constants.alertMessages.domains.MSG_SUCCESS_ADD;
        expect(alert.getText()).toContain(expectedMsg);
      });

    it('should display `In Progress` staging status right after creating a ' +
      'domain',
      function () {
        var myDomain = DataProvider.generateDomain('my-domain');
        // Create domain
        Portal.createDomain(myDomain);
        // Check domain is in list
        Portal.domains.listPage
          .searchAndGetFirstRow(myDomain.name)
          .getStagingStatusIcon()
          .getAttribute('uib-tooltip')
          .then(function (tooltip) {
            expect(tooltip).toEqual('Staging Status: InProgress');
          });
      });

    it('should display `In Progress` global status right after creating a ' +
      'domain',
      function () {
        var myDomain = DataProvider.generateDomain('my-domain');
        // Create domain
        Portal.createDomain(myDomain);
        // Check domain is in list
        Portal.domains.listPage
          .searchAndGetFirstRow(myDomain.name)
          .getGlobalStatusIcon()
          .getAttribute('uib-tooltip')
          .then(function (tooltip) {
            expect(tooltip).toEqual('Global Status: InProgress');
          });
      });

    it('should display `Published` staging status some period of time after ' +
      'creating a domain',
      function () {
        var myDomain = DataProvider.generateDomain('my-domain');
        // Create domain
        Portal.createDomain(myDomain);
        // Wait for some period of time to get the domain Published
        Portal.domains.listPage.waitForStagingStatusToChange(myDomain);
        Portal.domains.listPage
          .searchAndGetFirstRow(myDomain.name)
          .getStagingStatusIcon()
          .getAttribute('uib-tooltip')
          .then(function (tooltip) {
            expect(tooltip).toEqual('Staging Status: Published');
          });
      });

    it('should display `Published` global status some period of time after ' +
      'creating a domain',
      function () {
        var myDomain = DataProvider.generateDomain('my-domain');
        // Create domain
        Portal.createDomain(myDomain);
        // Wait for some period of time to get the domain Published
        Portal.domains.listPage.waitForGlobalStatusToChange(myDomain);
        // Check domain is in list
        Portal.domains.listPage
          .searchAndGetFirstRow(myDomain.name)
          .getGlobalStatusIcon()
          .getAttribute('uib-tooltip')
          .then(function (tooltip) {
            expect(tooltip).toEqual('Global Status: Published');
          });
      });

    it('should display `Modified` global status some period of time after ' +
      'modifying a domain',
      function () {
        var myDomain = DataProvider.generateDomain('my-domain');
        var updatedDomain = {
          name: myDomain.name,
          originServer: 'UPDATED' + myDomain.originServer,
          originHostHeader: 'UPDATED' + myDomain.originHostHeader
        };
        // Create domain
        Portal.createDomain(myDomain);
        // Update domain
        Portal.updateDomain(updatedDomain);
        // Wait for the domain to get global status as Modified
        Portal.domains.listPage.waitForGlobalStatusToChange(myDomain);
        // Verify updated domain is in list
        Portal.domains.listPage
          .searchAndGetFirstRow(myDomain.name)
          .getGlobalStatusIcon()
          .getAttribute('uib-tooltip')
          .then(function (tooltip) {
            expect(tooltip).toEqual('Global Status: Modified');
          });
      });
  });
});

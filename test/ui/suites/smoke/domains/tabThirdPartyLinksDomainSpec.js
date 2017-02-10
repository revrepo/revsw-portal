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
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.user'),
    config.get('portal.users.admin'),
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Tabs switching (Third-Party Links)', function () {

        var EditPage = Portal.domains.editPage;
        var form = EditPage.form;
        var checkDisplay = function(elem) {
          return EditPage.elementIsDisplayed(elem);
        };

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToDomains();
          EditPage.clickEditDomain();
        });

        afterAll(function () {
          Portal.signOut();
        });

        it('should open tab "Third-Party Links"', function () {
          EditPage.clickTabThirdPartyLinks();
          expect(EditPage.tabIsActive('thirdPartyLinks') ).toBe(true);
        });

        it('should display "Accelerate Third-Party Links Embedded In HTML Code"', function () {
          EditPage.clickTabThirdPartyLinks();
          EditPage.switchBtns(form.getEnableAccelerateThirdPartyLinksEmbeddedInHTMLCode(), true);
          expect(checkDisplay('getEnableAccelerateThirdPartyLinksEmbeddedInHTMLCode')).toBe(true);
        });

      });
    });
  });
});

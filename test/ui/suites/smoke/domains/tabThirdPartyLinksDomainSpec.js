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

describe('Smoke', function() {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.user'),
    config.get('portal.users.admin'),
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller')
  ];

  users.forEach(function(user) {

    describe('With user: ' + user.role, function() {

      describe('Tabs switching (Third-Party Links)', function() {

        var EditPage = Portal.domains.editPage;
        var form = EditPage.form;
        var checkDisplay = function(elem) {
          return EditPage.elementIsDisplayed(elem);
        };

        beforeAll(function() {
          Portal.signIn(user);
          Portal.helpers.nav.goToDomains();
          EditPage.clickEditDomain();
        });

        afterAll(function() {
          Portal.signOut();
        });

        it('should open tab "Third-Party Links"', function() {
          EditPage.clickTabThirdPartyLinks();
          expect(EditPage.tabIsActive('thirdPartyLinks')).toBe(true);
        });
        describe('Elements into tab (Third-Party Links)', function() {

          beforeAll(function() {
            EditPage.clickTabThirdPartyLinks();
          });
          it('should display switch "Accelerate Third-Party Links Specified In HTML Code"',
            function() {
              EditPage.switchBtns(form.getEnable3rdPartyRewrite(), true);
              expect(checkDisplay('getEnable3rdPartyRewrite')).toBe(true);
            });
          // TODO: 3rd_party_urls
          it('should display switch "Accelerate Third-Party Links Generated Runtime ' +
            'in Inline JavaScript Code"',
            function() {
              EditPage.switchBtns(form.getEnable3rdPartyRootRewrite(), true);
              expect(checkDisplay('getEnable3rdPartyRootRewrite')).toBe(true);
            });
          // TODO: 3rd_party_root_rewrite_domains
          it('should display switch "Accelerate Third-Party Links Generated Runtime ' +
            ' in Third-Party JavaScript Code"',
            function() {
              EditPage.switchBtns(form.getEnable3rdPartyRuntimeRewrite(), true);
              expect(checkDisplay('getEnable3rdPartyRuntimeRewrite')).toBe(true);
            });
           // TODO: 3rd_party_runtime_domains
        });

      });
    });
  });
});

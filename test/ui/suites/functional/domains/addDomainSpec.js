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

describe('Functional', function () {

  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.user'),
    config.get('portal.users.roUser')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Add domain', function () {

        var myDomain = DataProvider.generateDomain('my-domain');

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        switch (user.role) {

          case 'RO User':

            it('RO user should not be able to go for create a new domain',
              function () {
                Portal.helpers.nav.goToDomains();
                Portal.domains.listPage.clickAddNewDomain();

                browser.getCurrentUrl().then(function(actualUrl) {
                  expect(actualUrl.replace(/.*(#.*)/g, '$1') !== Portal.constants.hashFragments.domains.new).toBe(true);
                });

              });

            it('RO user should not be able to create a domain if open ' +
              ' "Add New Domain Page" manually',
              function () {
                Portal.helpers.nav.goToDomains();
                Portal.goToCustomUrl(Portal.constants.hashFragments.domains.new);
                Portal.domains.addPage.createDomain(myDomain);
                var btnCreateDomain = Portal.domains.addPage.getCreateDomainBtn();
                expect(btnCreateDomain.isEnabled()).toBe(false);
                var btnCreateDomainAndAddMore = Portal.domains.addPage
                  .getCreateDomainAndAddMoreBtn();
                expect(btnCreateDomainAndAddMore.isEnabled()).toBe(false);
              });

            break;

          default:

            it('should create a domain and display a successful message',
              function () {
                Portal.helpers.nav.goToDomains();
                Portal.domains.listPage.clickAddNewDomain();
                Portal.domains.addPage.createDomain(myDomain);
                var alert = Portal.alerts.getFirst();
                var expectedMsg = Constants.alertMessages.domains
                  .MSG_SUCCESS_ADD;
                expect(alert.getText()).toContain(expectedMsg);
              });
        }
      });
    });
  });
});

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

describe('Functional', function() {
  describe('Edit domain GitHub Integration ', function() {

    var gitHubPersonalAccessTokenForAccountId = config.get('gitHubPersonalAccessTokenForAccountId');
    var credantionalsList = [
      // TODO: need change step create new domain config (use API helper) for run test for user
      config.get('portal.users.admin'),
      config.get('portal.users.revAdmin'),
      config.get('portal.users.reseller')
    ];

    credantionalsList.forEach(function(credantional) {

      describe('With user: ' + credantional.role, function() {

        describe('Modal dialog "GitHub Integration Settings"', function() {
          var EditPage = Portal.domains.editPage;

          beforeAll(function() {
            Portal.signIn(credantional);
          });

          afterAll(function() {
            Portal.signOut();
          });

          beforeEach(function() {
            Portal.helpers.nav.goToDomains();
          });

          it('should display after Turn On switch "GitHub Integration"',
            function() {
              var domain = DataProvider.generateDomain('mydomain');
              Portal.createDomain(domain);
              Portal.domains.listPage.searchAndClickEdit(domain.name);
              EditPage.setToSwitchBtnValue(EditPage.getGitHubIntegrationSw(), true);
              var modal = Portal.dialog.getModalEl();
              expect(Portal.dialog.isDisplayed()).toBeTruthy();
              expect(Portal.domains.editPage.formGitHubIntegrationSettings.isDisplayed())
                .toBeTruthy();

              Portal.domains.editPage.formGitHubIntegrationSettings.clickCancel();
              expect(Portal.domains.editPage.formGitHubIntegrationSettings.isDisplayed())
                .toBeFalsy();
            });

          it('should success verify "GitHub Integration Settings" for new Domain Config',
            function() {
              var domain = DataProvider.generateDomain('mydomain');
              Portal.createDomain(domain);
              Portal.domains.listPage.searchAndClickEdit(domain.name);
              EditPage.setToSwitchBtnValue(EditPage.getGitHubIntegrationSw(), true);
              var modal = Portal.dialog.getModalEl();
              expect(Portal.dialog.isDisplayed()).toBeTruthy();
              expect(Portal.domains.editPage.formGitHubIntegrationSettings.isDisplayed())
                .toBeTruthy();
              Portal.domains.editPage.formGitHubIntegrationSettings.fill({
                /*jshint camelcase: false */
                url: gitHubPersonalAccessTokenForAccountId[credantional.account.id].valid_config,
                token: gitHubPersonalAccessTokenForAccountId[credantional.account.id].token
              });
              Portal.domains.editPage.formGitHubIntegrationSettings.clickVerify();
              // TODO: add check success message text
              expect(Portal.domains.editPage.formGitHubIntegrationSettings.isDisplayed())
                .toBeFalsy();
            });

        });
      });
    });

  });
});

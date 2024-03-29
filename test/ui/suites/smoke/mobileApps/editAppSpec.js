/* jshint ignore:start */


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

var BROWSER_WAIT_TIMEOUT = 20000;

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    //config.get('portal.users.admin'), //TODO: it('should save SDKKey to clipboard' not working for this role
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin')
  ];
  var platforms = [
    Portal.constants.mobileApps.platforms.ios,
    Portal.constants.mobileApps.platforms.android
    // TODO: Test are not working for win mobile
    // Portal.constants.mobileApps.platforms.windowsMobile
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {
      describe('Edit App', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        platforms.forEach(function (platform) {

          describe('Platform: ' + platform, function () {

            beforeEach(function () {
              Portal.helpers.nav.goToMobileAppsMenuItem(platform);
            });

            afterEach(function () {
            });

            it('should display edit app button',
              function () {
                var editButton = Portal.mobileApps.listPage.table
                  .getFirstRow()
                  .getEditBtn();
                expect(editButton.isPresent()).toBeTruthy();
              });

            it('should display `Edit app` form',
              function () {
                Portal.mobileApps.listPage.table
                  .getFirstRow()
                  .clickEdit();
                expect(Portal.mobileApps.editPage.isDisplayed())
                  .toBeTruthy();
              });

            it('should allow to cancel an app edition',
              function () {
                Portal.mobileApps.listPage.table
                  .getFirstRow()
                  .clickEdit();
                Portal.mobileApps.editPage.form.setAppName('something');
                Portal.mobileApps.editPage.form.clickCancel();
                expect(Portal.mobileApps.listPage.isDisplayed()).toBeTruthy();
              });

            // TODO: Paste (ctrl + v is not working)
            xit('should save SDKKey to clipboard',
              function () {
                Portal.mobileApps.listPage.table
                  .getFirstRow()
                  .clickEdit();
                Portal.mobileApps.editPage.form.clickSDKKeyClipboardButton();
                Portal.mobileApps.editPage.form.clickShowSDKKeyButton();
                Portal.mobileApps.editPage.form
                  .getSDKKeyInput()
                  .getAttribute('value')
                  .then(function (value) {
                    Portal.mobileApps.editPage.form
                      .setSDKKey(protractor.Key.chord(protractor.Key.CONTROL, 'v'))
                      .then(function () {
                        return Portal.mobileApps.editPage.form
                          .getSDKKeyInput()
                          .getAttribute('value')
                          .then(function (pasteValue) {
                            expect(value).toEqual(pasteValue);
                          });
                      });
                  });
              });

            it('should update an app successfully when filling all required ' +
              'data',
              function () {
                var app = DataProvider.generateMobileApp(platform);

                /*                Portal.getAccountsPage();
                 Portal.admin.accounts.listPage.clickAddNewCompany();
                 Portal.admin.accounts.addCompany.createCompany(app);
                 browser.sleep(10000);
                 Portal.goToMobileApps();
                 Portal.header.goTo(platform);
                 browser.sleep(10000);*/

                Portal.mobileApps.listPage.addNew(app);
                expect(Portal.alerts.getAll().count()).not.toEqual(0);
                expect(Portal.alerts.getFirst().getText())
                  .toContain(Constants.alertMessages.app.MSG_SUCCESS_ADD);
                Portal.mobileApps.addPage.clickBackToList();
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                app = DataProvider.generateUpdateMobileApp(app);
                Portal.mobileApps.editPage.update(app);
                browser.ignoreSynchronization = true;
                Portal.dialog.clickOk();
                browser.wait(
                  protractor.ExpectedConditions.visibilityOf(
                    element(by.xpath('.//*[contains(text(),"' + Constants.alertMessages.app.MSG_SUCCESS_UPDATE + '")]'))
                  ), BROWSER_WAIT_TIMEOUT
                );
                expect(Portal.alerts.getAll().count()).not.toEqual(0);
                expect(Portal.alerts.getFirst().getText())
                  .toEqual(Constants.alertMessages.app.MSG_SUCCESS_UPDATE);
                element(by.xpath('.//body')).getAttribute('class').then(function () {
                  browser.ignoreSynchronization = false;
                });

                expect(Portal.mobileApps.editPage.form.getAppNameTxt().getAttribute('value')).toEqual(app.name);
                expect(Portal.mobileApps.editPage.form.getSelectedSDKEventsLoggingLevel().getText()).toEqual(app.SDKeventsLoggingLevel);
                expect(Portal.mobileApps.editPage.form.getComment().getAttribute('value')).toEqual(app.comment);
                expect(Portal.mobileApps.editPage.form.getSDKOperationModeDDown().getAttribute('value').getText()).toContain(app.sdkOperationMode);
                Portal.mobileApps.editPage.form.getConfigurationRefreshIntervalDDown().getAttribute('value').then(function (value) {
                  expect(value).toEqual(app.configurationRefreshInterval);
                });
                Portal.mobileApps.editPage.form.getConfigurationStaleTimeoutDDown()
                  .getAttribute('value').then(function (value) {
                    expect(value).toEqual(app.configurationStaleTimeout);
                  });
                element(by.xpath('.//body')).getAttribute('class').then(function () {
                  if (app.allowedTransportProtocolsAndSelectionPriority === 'STANDARD') {
                    Portal.mobileApps.editPage.form.getAllowedTransportProtocolsAndSelectionPrioritySTANDARD().getAttribute('checked').then(function (value) {
                      expect(value).toEqual('true');
                    });
                  }
                  if (app.allowedTransportProtocolsAndSelectionPriority === 'QUIC') {
                    Portal.mobileApps.editPage.form.getAllowedTransportProtocolsAndSelectionPriorityQUIC().getAttribute('checked').then(function (value) {
                      expect(value).toEqual('true');
                    });
                  }
                  if (app.allowedTransportProtocolsAndSelectionPriority === 'RMP') {
                    Portal.mobileApps.editPage.form.getAllowedTransportProtocolsAndSelectionPriorityRPM().getAttribute('checked').then(function (value) {
                      expect(value).toEqual('true');
                    });
                  }
                });

                Portal.mobileApps.editPage.form.getInitialTransportProtocol()
                  .getAttribute('value').then(function (value) {
                    expect(value).toEqual(app.initialTransportProtocol.toLowerCase());
                  });
                Portal.mobileApps.editPage.form.getAnalyticsReportingLevel().getAttribute('value').then(function (value) {
                  expect(value).toEqual(app.analyticsReportingLevel.toLowerCase());
                });
                Portal.mobileApps.editPage.form.getDomainsWhiteListValues().then(function (value) {
                  expect(value).toContain(app.domainsWhiteList);
                });
                Portal.mobileApps.editPage.form.getDomainsBlackListValues().then(function (value) {
                  expect(value).toContain(app.domainsBlackList);
                });

                // expect(Portal.mobileApps.editPage.form.getDomainsProvisionedListValues()).toContain(app.domainsProvisionedList);

                Portal.mobileApps.editPage.form.getTestingOffloadingRatio()
                  .getAttribute('value').then(function (value) {
                    expect(value).toContain(app.testingOffloadingRatio);
                  });


                /*              expect(Portal.alerts.getAll().count()).not.toEqual(0);
                 expect(Portal.alerts.getFirst().getText())
                 .toEqual(Constants.alertMessages.app.MSG_SUCCESS_UPDATE);*/
              });
          });
        });
      });
    });
  });
});


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

describe('Functional', function () {
  describe('ImageEngine ', function () {

    var users = [
      config.get('portal.users.revAdmin'),
      config.get('portal.users.admin'),
      config.get('portal.users.reseller')
    ];

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {
        // NOTE: create one domain for one user and all tests
        var myDomain = DataProvider.generateDomain('ie-mydomain');

        var EditPage = Portal.domains.editPage;
        var form = EditPage.form;
        beforeAll(function (done) {
          Portal.signIn(user);
          Portal.createDomain(myDomain);
          done();
        });

        afterAll(function (done) {
          Portal.signOut();
          done();
        });

        beforeEach(function (done) {
          Portal.helpers.nav.goToDomains();
          Portal.domains.listPage.searchAndClickEdit(myDomain.name);
          done();
        });

        describe('Verify domain config with enabled ImageEngine', function () {

          beforeEach(function (done) {
            EditPage.clickTabImageEngine();
            EditPage.switchBtns(form.getImageEngineSw(), true);
            var okBtn = Portal.dialog.getOkBtn();
            if(okBtn.isDisplayed()){
              Portal.dialog.clickOk();
            }
            done();
          });
          afterEach(function (done) {
            // NOTE: clear form for the new checks
            EditPage.form.clearInputsImageEngineForm();
            EditPage.switchBtns(form.getSetImageEngineConfigurationSw(), false);
            EditPage.switchBtns(form.getImageEngineSw(), false);
            done();
          });

          it('should verify success with default domain settings ',
            function () {
              EditPage.clickValidateDomain();
              var alert = Portal.alerts.getFirst();
              var expectedMsg = 'Successfully verified the domain configuration';
              expect(alert.getText()).toEqual(expectedMsg);
            });

          it('should verify success with correct value "ImageEngine Token"',
            function () {
              var correctImageEngineToken = 'nnml';
              EditPage.form.setImageEngineTokenTxtIn(correctImageEngineToken);
              expect(EditPage.form.getImageEngineTokenValue())
                .toEqual(correctImageEngineToken);
              EditPage.clickValidateDomain();

              var alert = Portal.alerts.getFirst();
              var expectedMsg = 'Successfully verified the domain configuration';
              expect(alert.getText()).toEqual(expectedMsg);
            });

          it('should verify success with correct value "ImageEngine Purge API Secret Key"',
            function () {
              var correctImageEngineAPIKey = 'api-test-key';
              EditPage.form.setImageEngineAPIKeyTxtIn(correctImageEngineAPIKey);
              expect(EditPage.form.getImageEngineAPIKeyValue())
                .toEqual(correctImageEngineAPIKey);
              EditPage.clickValidateDomain();
              var alert = Portal.alerts.getFirst();
              var expectedMsg = 'Successfully verified the domain configuration';
              expect(alert.getText()).toEqual(expectedMsg);
            });

          it('should verify success with correct value "ImageEngine Secondary Cache Storage"',
            function () {
              var correctImageEngineSecondaryCaheStorage = 'nnml.imgeng.in';
              EditPage.form.setImageEngineOriginServerTxtIn(correctImageEngineSecondaryCaheStorage);
              expect(EditPage.form.getImageEngineOriginServerValue())
                .toEqual(correctImageEngineSecondaryCaheStorage);
              EditPage.clickValidateDomain();
              var alert = Portal.alerts.getFirst();
              var expectedMsg = 'Successfully verified the domain configuration';
              expect(alert.getText()).toEqual(expectedMsg);
            });

          it('should verify success with enabled "Set Default ImageEngine Configuration"',
            function () {
              EditPage.switchBtns(form.getSetImageEngineConfigurationSw(), true);
              EditPage.clickValidateDomain();
              var alert = Portal.alerts.getFirst();
              var expectedMsg = 'Successfully verified the domain configuration';
              expect(alert.getText()).toEqual(expectedMsg);
            });
        });

        describe('Notification windows for ImageEngine', function () {
          beforeEach(function (done) {
            EditPage.clickTabVCL();
            EditPage.switchBtns(form.getCustomVCLrulesSw(), true);
            EditPage.clickTabImageEngine();
            EditPage.switchBtns(form.getImageEngineSw(), true);
            var okBtn = Portal.dialog.getOkBtn();
            if(okBtn.isDisplayed()) {
              Portal.dialog.clickOk();
            }
            done();
          });

          it('should display confirmation window when disable ' +
            'ImageEngine and Custom VCL Rules is enabled',
            function () {
              EditPage.clickTabImageEngine();
              EditPage.form.clickImageEngine();
              var okBtn = Portal.dialog.getOkBtn();
              expect(okBtn.isDisplayed()).toBeTruthy();
              Portal.dialog.clickOk();
              expect(EditPage.getSwitchBtnValue(form.getImageEngineSw())).toBe('false');
            });

          it('should not change "ImageEngine" if click "Cancel" in display confirmation window ',
            function () {
              EditPage.clickTabImageEngine();
              EditPage.form.clickImageEngine();
              var okBtn = Portal.dialog.getOkBtn();
              expect(okBtn.isDisplayed()).toBeTruthy();
              Portal.dialog.clickCancel();
              expect(EditPage.getSwitchBtnValue(form.getImageEngineSw())).toBe('true');
            });
        });

      });
    });
  });

});

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
var DataProvider = require('./../../../common/providers/data');
var Portal = require('./../../../page_objects/portal');

describe('Workflow', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.user'),
    config.get('portal.users.admin'),
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Domain Versions', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToDomains();
        });

        fit('should the Version "0" message appears for modified domain',
          function () {
            var message = 'Version "0" is the currently modified but ' +
              'not yet published domain configuration';
            var testDomain = DataProvider.generateDomain('versTestDomain');
            Portal.domains.listPage.clickAddNewDomain();
            Portal.domains.addPage.createDomain(testDomain);
            Portal.domains.addPage.clickBackToList();
            Portal.domains.listPage.searchAndClickEdit(testDomain.name);
            Portal.domains.editPage.form
              .setOriginHostHeader(testDomain.originHostHeader + '.upd');
            Portal.domains.editPage.clickUpdateDomain();
            Portal.dialog.clickOk();
            Portal.domains.addPage.clickBackToList();
            Portal.domains.listPage.searchAndGetFirstRow(testDomain.name)
              .clickVersions();
            expect(Portal.domains.versionsPage.getDomainConfigVersionWarning()
              .getText()).toBe(message);
          });

        it('should the Version "0" item appear in comparison drop-downs',
          function () {
            var testDomain = DataProvider.generateDomain('versTestDomain');
            Portal.domains.listPage.clickAddNewDomain();
            Portal.domains.addPage.createDomain(testDomain);
            Portal.domains.addPage.clickBackToList();
            Portal.domains.listPage.searchAndClickEdit(testDomain.name);
            Portal.domains.editPage.form
              .setOriginHostHeader(testDomain.originHostHeader + '.upd');
            Portal.domains.editPage.clickUpdateDomain();
            Portal.dialog.clickOk();
            Portal.domains.addPage.clickBackToList();
            Portal.domains.listPage.searchAndGetFirstRow(testDomain.name)
              .clickVersions();
            var dDownItems = [
              Portal.domains.versionsPage.getDomainConfigVersionLastAddedItem(),
              Portal.domains.versionsPage.getDomainCompareVersionLastAddedItem()
            ];
            dDownItems.forEach(function (item) {
              item.getText().then(function (text) {
                expect(text.indexOf('Version 0 Last updated')).toBe(0);
              });
            });
          });

        it('should appear new version after publish', function () {
          var testDomain = DataProvider.generateDomain('versTestDomain');
          Portal.domains.listPage.clickAddNewDomain();
          Portal.domains.addPage.createDomain(testDomain);
          Portal.domains.addPage.clickBackToList();
          Portal.domains.listPage.searchAndClickEdit(testDomain.name);
          Portal.domains.editPage.form
            .setOriginHostHeader(testDomain.originHostHeader + '.upd');
          Portal.domains.editPage.clickPublishDomain();
          Portal.dialog.clickOk();
          Portal.domains.editPage.waitForPublish();
          Portal.domains.addPage.clickBackToList();
          Portal.domains.listPage.searchAndGetFirstRow(testDomain.name)
            .clickVersions();
          var dDownItems = [
            Portal.domains.versionsPage.getDomainConfigVersionLastAddedItem(),
            Portal.domains.versionsPage.getDomainCompareVersionLastAddedItem()
          ];
          dDownItems.forEach(function (item) {
            item.getText().then(function (text) {
              expect(text.indexOf('Version 2 Last updated')).toBe(0);
            });
          });
        });

        it('should the Version 0 disappear from drop-downs after publish', function () {
          var testDomain = DataProvider.generateDomain('versTestDomain');
          Portal.domains.listPage.clickAddNewDomain();
          Portal.domains.addPage.createDomain(testDomain);
          Portal.domains.addPage.clickBackToList();
          Portal.domains.listPage.searchAndClickEdit(testDomain.name);
          Portal.domains.editPage.form
            .setOriginHostHeader(testDomain.originHostHeader + '.upd');
          Portal.domains.editPage.clickUpdateDomain();
          Portal.dialog.clickOk();
          Portal.domains.addPage.clickBackToList();
          Portal.domains.listPage.searchAndGetFirstRow(testDomain.name)
            .clickVersions();
          var dDownItems = [
            Portal.domains.versionsPage.getDomainConfigVersionLastAddedItem(),
            Portal.domains.versionsPage.getDomainCompareVersionLastAddedItem()
          ];
          dDownItems.forEach(function (item) {
            item.getText().then(function (text) {
              expect(text.indexOf('Version 0 Last updated')).toBe(0);
            });
          });
          Portal.helpers.nav.goToDomains();
          Portal.domains.listPage.searchAndClickEdit(testDomain.name);
          Portal.domains.editPage.clickPublishDomain();
          Portal.dialog.clickOk();
          Portal.domains.editPage.waitForPublish();
          Portal.domains.addPage.clickBackToList();
          Portal.domains.listPage.searchAndGetFirstRow(testDomain.name)
            .clickVersions();
          var dDowns = [
            Portal.domains.versionsPage.getDomainConfigVersionDDown(),
            Portal.domains.versionsPage.getDomainCompareVersionDDown()
          ];
          dDowns.forEach(function (dDown) {
            var item = dDown.element(by.xpath('.//*[contains(text(),' +
              '"Version 0 Last updated")]'));
            expect(item.isPresent()).toBeFalsy();
          });
        });

        it('should reflect the changes made on domain form', function () {
          var testDomain = DataProvider.generateDomain('versTestDomain');
          Portal.domains.listPage.clickAddNewDomain();
          Portal.domains.addPage.createDomain(testDomain);
          Portal.domains.addPage.clickBackToList();
          Portal.domains.listPage.searchAndClickEdit(testDomain.name);
          Portal.domains.editPage.form
            .setOriginHostHeader(testDomain.originHostHeader + '.upd');
          Portal.domains.editPage.clickPublishDomain();
          Portal.dialog.clickOk();
          Portal.domains.editPage.waitForPublish();
          Portal.domains.addPage.clickBackToList();
          Portal.domains.listPage.searchAndGetFirstRow(testDomain.name)
            .clickVersions();
          Portal.domains.versionsPage.setDomainConfigVersion('Version 1');
          Portal.domains.versionsPage.setDomainCompareVersion('Version 2');
          var prevVersionOrigHostHeader = Portal.domains.versionsPage
            .getResultOriginString('origin_host_header');
          var newVersionOrigHostHeader = Portal.domains.versionsPage
            .getResultComparedString('origin_host_header');
          expect(prevVersionOrigHostHeader)
            .toBe('origin_host_header: "' + testDomain.originHostHeader + '"');
          expect(newVersionOrigHostHeader)
            .toBe('origin_host_header: "' + testDomain.originHostHeader + '.upd"');
        });
      });
    });
  });
});
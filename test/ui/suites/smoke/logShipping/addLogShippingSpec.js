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
var Portal = require('./../../../page_objects/portal');
var DataProvider = require('./../../../common/providers/data');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.admin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {
      describe('Add Log Shipping', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToLogShipping();
          Portal.logShipping.listPage.clickAddNewLogShippingJob();
        });

        afterEach(function () {

        });

        it('should display "Add Log Shipping Job" form', function () {
          expect(Portal.logShipping.addPage.isDisplayed()).toBeTruthy();
          expect(Portal.logShipping.addPage.form.isDisplayed()).toBeTruthy();
        });

        it('should create a Log Shipping Job when filling all required data',
          function () {
            var logShippingJobToSearch = DataProvider.generateLogShippingJobData();
            if (user.role === 'Reseller') {
              logShippingJobToSearch.account = ['API QA Reseller Company'];
            }
            Portal.logShipping.addPage.createLogShippingJob(logShippingJobToSearch);
            Portal.logShipping.listPage.searcher
              .setSearchCriteria(logShippingJobToSearch.name);
            expect(Portal.logShipping.listPage
              .searchAndGetFirstRow(logShippingJobToSearch.name)
              .getJobName()).toEqual(logShippingJobToSearch.name);
          });

        it('should allow to cancel a Log Shipping Job addition', function () {
          Portal.logShipping.addPage.form.setJobName('something');
          Portal.logShipping.addPage.clickCancel();
          expect(Portal.logShipping.listPage.isDisplayed()).toBeTruthy();
        });

        it('should clear form after Cancel is clicked', function () {
          var newJob = DataProvider.generateLogShippingJobData();
          Portal.logShipping.addPage.form.fill(newJob);
          Portal.logShipping.addPage.clickCancel();
          Portal.logShipping.listPage.clickAddNewLogShippingJob();
          expect(Portal.logShipping.addPage.form.getJobName()).toEqual('');
        });
      });
    });
  });
});

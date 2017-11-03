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
var Constants = require('./../../../page_objects/constants');

describe('Functional', function () {
  describe('Intro Window', function () {

    var user = config.get('portal.users.user');

    beforeEach(function () {
      Portal.signIn(user, false);
    });

    afterEach(function () {
      Portal.signOut();
    });

    it('should click through all steps and click `Done` in the end', function (done) {
      browser.executeScript('window.localStorage.setItem("ngStorage-testEnv", "1");');
      var until = protractor.ExpectedConditions;
      browser.wait(until.presenceOf(Portal.header.getHeaderBar()), 30000);
      browser.refresh();
      Portal.intro.waitForStep();
      browser.executeScript('window.localStorage.removeItem("ngStorage-testEnv");');
      Portal.intro.getSteps().each(function (step) {
        Portal.intro.getDoneBtn().isPresent().then(function (e) {
          if (e) {
            browser.executeScript('$(".introjs-overlay").hide();');
            Portal.intro.clickDoneBtn();
            expect(Portal.intro.getIntroContainer().isPresent()).toBeFalsy();
            done();
          } else {
            Portal.intro.clickNextBtn();
            browser.wait(until.elementToBeClickable(Portal.intro.getNextBtn()), 5000);
          }
        });
      });
    });

    it('should load portal without intro popup after `Done` is clicked', function () {
      expect(Portal.intro.getIntroContainer().isPresent()).toBeFalsy();
    });

    it('should not display intro popup after `Skip` is clicked', function (done) {
      browser.executeScript('window.localStorage.setItem("ngStorage-testEnv", "1");');
      var until = protractor.ExpectedConditions;
      browser.wait(until.presenceOf(Portal.header.getHeaderBar()), 30000);
      browser.refresh();
      Portal.intro.waitForStep();
      browser.executeScript('window.localStorage.removeItem("ngStorage-testEnv");');
      Portal.intro.clickNextBtn();
      browser.executeScript('$(".introjs-overlay").hide();');
      browser.wait(until.elementToBeClickable(Portal.intro.getSkipBtn()), 5000);
      Portal.intro.clickSkipBtn();
      Portal.signOut().then(function () {
        Portal.signIn(user, false);
        expect(Portal.intro.getIntroContainer().isPresent()).toBeFalsy();
        done();
      });
    });
    it('should display intro if the steps are not completed', function () {
      var until = protractor.ExpectedConditions;
      browser.wait(until.presenceOf(Portal.header.getHeaderBar()), 60000);
      browser.executeScript('window.localStorage.removeItem("ngStorage-intro");');
      browser.refresh();
      Portal.intro.waitForStep();
      Portal.intro.clickNextBtn();
      browser.wait(until.elementToBeClickable(Portal.intro.getNextBtn()), 5000);
      browser.refresh();
      browser.wait(until.presenceOf(Portal.intro.getIntroContainer()), 60000);
      expect(Portal.intro.getIntroContainer().isDisplayed()).toBeTruthy();
      browser.executeScript('$(".introjs-overlay").hide();');
    });
  });
});

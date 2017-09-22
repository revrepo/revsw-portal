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
  describe('Copyright message on sign up page', function () {
    var adminUser = config.get('portal.users.admin');
    var defaultFooterMessage = Constants.footerMessage;

    it('should display copyright message on revsw sign up page', function () {
      Portal.load();
      Portal.loginPage.clickSignUp().then(function () {
        var footerMessage = Portal.signUp.plansPage.getFooterMessageText();
        expect(footerMessage).toEqual(defaultFooterMessage);
      });

    });

    it('should display copyright message on nuubit sign up page', function () {
      Portal.loadNuubit();
      Portal.loginPage.clickSignUp();

      var footerMessage = Portal.signUp.plansPage.getFooterMessageText();
      expect(footerMessage).toEqual(defaultFooterMessage);
    });

  });
});

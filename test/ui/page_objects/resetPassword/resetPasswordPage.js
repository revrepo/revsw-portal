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

// # Reset Password Page Object

var BROWSER_WAIT_TIMEOUT = 16000;

// This `Reset Password` Page Object abstracts all operations or actions that a
// common user could do in the Reset Password page from the Portal app/site.
var ResetPassword = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        css: 'h1.signup'
      }
    },
    textInputs: {
      newPass: {
        id: 'password'
      },
      repeatNewPass: {
        id: 'passwordRepeat'
      }
    },
    buttons: {
      cancel: {
        css: 'a.btn.btn-default'
      },
      reset: {
        css: 'button.btn.btn-success'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### ResetPasswordPage.getTitleLabel()
   *
   * Returns the ref to 'Reset Password Page Title' label
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLabel: function () {
    return element(
      by.css(this.locators.labels.title.css));
  },

  /**
   * ### ResetPasswordPage.getCancelBtn()
   *
   * Returns the ref to 'Cancel' btn
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function () {
    return element(
      by.css(this.locators.buttons.cancel.css));
  },

  /**
   * ### ResetPasswordPage.getResetBtn()
   *
   * Returns the ref to 'Reset' btn
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getResetBtn: function () {
    return element(
      by.css(this.locators.buttons.reset.css));
  },

  /**
   * ### ResetPasswordPage.getNewPasswordTxtIn()
   *
   * Returns the ref to 'New Password' Txt In
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getNewPasswordTxtIn: function () {
    return element(
      by.id(this.locators.textInputs.newPass.id));
  },

  /**
   * ### ResetPasswordPage.getRepeatPasswordTxtIn()
   *
   * Returns the ref to 'Repeat Password' Txt In
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getRepeatPasswordTxtIn: function () {
    return element(
      by.id(this.locators.textInputs.repeatNewPass.id));
  },

  /**
   * ### ResetPasswordPage.setNewPassword()
   *
   * Sets the value for 'New Password' Txt In
   *
   * @returns {Promise}
   */
  setNewPassword: function (value) {
    return this.getNewPasswordTxtIn()
      .sendKeys(value);
  },

  /**
   * ### ResetPasswordPage.setRepeatPassword()
   *
   * Sets the value for 'New Password' Txt In
   *
   * @returns {Promise}
   */
  setRepeatPassword: function (value) {
    return this.getRepeatPasswordTxtIn()
      .sendKeys(value);
  },

  /**
   * ### ResetPasswordPage.clickResetPassword()
   *
   * Performs click on 'Reset' button
   *
   * @returns {Object} Selenium WebDriver Element
   */
  clickReset: function () {
    return this.getResetBtn()
      .click();
  },

  /**
   * ### ResetPasswordPage.getTitle()
   *
   * Gets the inner text from the 'Title' label
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this.getTitleLabel()
      .getText();
  },

  isDisplayed: function () {
    return this.getTitleLabel()
      .isDisplayed();
  },

  waitToDisplay: function () {
    var me = this;
    return browser.wait(function () {
      return browser
        .isElementPresent(by.id(me.locators.textInputs.repeatNewPass.id));
    }, BROWSER_WAIT_TIMEOUT);
  },

  resetPassword: function (newPassword) {
    this.waitToDisplay();
    this.setNewPassword(newPassword);
    this.setRepeatPassword(newPassword);
    this.clickReset();
  }
};

module.exports = ResetPassword;

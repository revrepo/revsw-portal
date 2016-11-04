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

// # Dialog Page Object

var BROWSER_WAIT_TIMEOUT = 30000;

// Portal app has the ability to display confirm dialogs while doing several
// operations in the whole app. This Dialog PAge Objects abstracts those
// operations or actions that an common user could do in this kind of object.
var Dialog = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    modal: {
      className: 'modal-dialog',
      buttons: {
        ok: {
          css: 'button[ng-click="ok()"]'
        },
        verifyTxtRecord: {
          css: 'button[ng-click="ok(model)"]'
        },
        proceed: {
          css: '.modal-footer .btn-danger'
        },
        cancel: {
          css: 'button[ng-click="cancel()"]'
        },
        submit: {
          css: '.btn-primary'
        }
      },
      textInputs: {
        email: {
          id: 'email'
        }
      }
    }
  },

  // ## Methods

  /**
   * ### Dialog.isDisplayed()
   *
   * Checks whether the Dialog is displayed in the UI or not
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
        .getModalEl()
        .isPresent() &&
      this
        .getOkBtn()
        .isPresent();
  },

  /**
   * Waits for Modal Element to be visible
   *
   * @returns {Object} Promise
   */
  waitForModalEl: function () {
    var me = this;
    return browser.wait(
      protractor.ExpectedConditions.visibilityOf(
        element(by.className(me.locators.modal.className))
      ), BROWSER_WAIT_TIMEOUT
    );
  },

  /**
   * ### Dialog.getModalEl()
   *
   * Return the reference to the Modal Dialog (Selenium WebDriver Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getModalEl: function () {
    this.waitForModalEl();
    return element(by.className(this.locators.modal.className));
  },

  /**
   * ### Dialog.getOkBtn()
   *
   * Return the reference to the `OK` button (Selenium WebDriver Element) from
   * the Modal Dialog component from Portal app
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getOkBtn: function () {
    return this
      .getModalEl()
      .element(by.css(this.locators.modal.buttons.ok.css));
  },

  /**
   * ### Dialog.getVerifyTxtRecord()
   *
   * Return the reference to the `Verify Txt Record` button (Selenium WebDriver Element) from
   * the Modal Dialog component from Portal app
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getVerifyTxtRecord: function () {
    return this
        .getModalEl()
        .element(by.css(this.locators.modal.buttons.verifyTxtRecord.css));
  },

  /**
   * ### Dialog.getProceedBtn()
   *
   * Return the reference to the `Proceed` button (Selenium WebDriver Element)
   * from the Modal Dialog component from Portal app
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getProceedBtn: function () {
    return this
      .getModalEl()
      .element(by.css(this.locators.modal.buttons.proceed.css));
  },

  /**
   * ### Dialog.getCancelBtn()
   *
   * Return the reference to the `Cancel` button (Selenium WebDriver Element)
   * from the Modal Dialog component from Portal app
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function () {
    return this
      .getModalEl()
      .element(by.css(this.locators.modal.buttons.cancel.css));
  },

  /**
   * ### Dialog.getSubmitBtn()
   *
   * Return the reference to the `Submit` button (Selenium WebDriver Element)
   * from the Modal Dialog component from Portal app
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getSubmitBtn: function () {
    return this
      .getModalEl()
      .element(by.css(this.locators.modal.buttons.submit.css));
  },

  /**
   * ### Dialog.getEmailTxtIn()
   *
   * Return the reference to the `email` text input (Selenium WebDriver Element)
   * from the Modal Dialog component from Portal app
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getEmailTxtIn: function () {
    return this
      .getModalEl()
      .element(by.id(this.locators.modal.textInputs.email.id));
  },

  /**
   * ### Dialog.clickOk()
   *
   * Triggers a click action on the `OK` button fro the Modal Dialog component
   *
   * @returns {Object} Promise
   */
  clickOk: function () {
    return this
      .getOkBtn()
      .click();
  },

  /**
   * ### Dialog.clickClose()
   *
   * Triggers a click action on the `Close` button from the Modal Dialog
   * component
   *
   * @returns {*|Object}
   */
  clickClose: function () {
    return this.clickOk();
  },

  /**
   * ### Dialog.clickVerifyTxtRecord()
   *
   * Triggers a click action on the `OK` button fro the Modal Dialog component
   *
   * @returns {Object} Promise
   */
  clickVerify: function () {
    return this
        .getVerifyTxtRecord()
        .click();
  },

  /**
   * ### Dialog.clickProceed()
   *
   * Triggers a click action on the `Proceed` button fro the Modal Dialog
   * component
   *
   * @returns {Object} Promise
   */
  clickProceed: function () {
    return this
      .getProceedBtn()
      .click();
  },

  /**
   * ### Dialog.clickCancel()
   *
   * Triggers a click action on the `Cancel` button from the Modal Dialog
   * component
   *
   * @returns {Object} Promise
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  /**
   * ### Dialog.clickSubmit()
   *
   * Triggers a click action on the `Submit` button from the Modal Dialog
   * component
   *
   * @returns {Object} Promise
   */
  clickSubmit: function () {
    return this
      .getSubmitBtn()
      .click();
  },

  /**
   * ### Dialog.setEmail()
   *
   * Sets value in the `email` button from the Modal Dialog component
   *
   * @param value
   * @returns {Object} Promise
   */
  setEmail: function (value) {
    return this
      .getEmailTxtIn()
      .sendKeys(value);
  }
};

module.exports = Dialog;
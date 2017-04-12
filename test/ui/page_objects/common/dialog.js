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
        delete: {
          css: 'button[ng-click="deleteDialog(model)"]'
        },
        cancel: {
          css: 'button[ng-click="cancel()"]'
        },
        close: {
          css: '.close[ng-click="closeDialog()"]'
        },
        submit: {
          css: '.btn-primary'
        }
      },
      body: {
        css: '.modal-body'
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
   * Waits for Modal Element to be visible
   *
   * @returns {Object} Promise
   */
  waitForModalEl: function () {
    var me = this;
    return browser.wait(function () {
      // console.log('Waiting for modal ...');
      return browser
        .isElementPresent(by.className(me.locators.modal.className));
    }, BROWSER_WAIT_TIMEOUT);
  },

  /**
   * ### Dialog.getModalEl()
   *
   * Return the reference to the Modal Dialog (Selenium WebDriver Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getModalEl: function () {
    return element(by.className(this.locators.modal.className));
  },

  /**
   * ### Dialog.isDisplayed()
   *
   * Checks whether the Dialog is displayed in the UI or not
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return browser
      .isElementPresent(by.className(this.locators.modal.className));
  },

  /**
   * ### Dialog.getModal()
   *
   * Gets the modal. In case modal is not visible waits for it until timeouts.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getModal: function () {
    this.waitForModalEl();
    return this.getModalEl();
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
      .getModal()
      .element(by.css(this.locators.modal.buttons.ok.css));
  },

  /**
   * ### Dialog.getDeleteBtn()
   *
   * Return the reference to the `Delete` button (Selenium WebDriver Element) from
   * the Modal Dialog component from Portal app
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getDeleteBtn: function () {
    return element(by.css(this.locators.modal.buttons.delete.css));
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
      .getModal()
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
      .getModal()
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
      .getModal()
      .element(by.css(this.locators.modal.buttons.cancel.css));
  },


  /**
   * ### Dialog.getCloseBtn()
   *
   * Return the reference to the `Cancel` button (Selenium WebDriver Element)
   * from the Modal Dialog component from Portal app
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCloseBtn: function () {
    return this
      .getModal()
      .element(by.css(this.locators.modal.buttons.close.css));
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
      .getModal()
      .element(by.css(this.locators.modal.buttons.submit.css));
  },
  /**
   * ### Dialog.getBodyText()
   *
   * Return a promise that will be resolved with the element's visible text
   * (Selenium WebDriver Element) from the Modal Dialog component from Portal app.
   *
   * @returns {Promise}
   */
  getBodyText: function() {
    var text = element(by.css(this.locators.modal.body.css)).getText();
    return text;
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
      .getModal()
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
   * ### Dialog.clickDelete()
   *
   * Triggers a click action on the `Delete` button fro the Modal Dialog component
   *
   * @returns {Object} Promise
   */
  clickDeleteBtn: function () {
    return this
      .getDeleteBtn()
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
   * ### Dialog.clickRadioButton()
   *
   * Clicks on a radio button by its value/label
   *
   * @param value, radio button's label
   * @returns {Object} Promise
   */
  clickRadioButton: function (value) {
    return this
      .getModal()
      .element(by.css('input[value="' + value + '"]'))
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
   * ### Dialog.clickClose()
   *
   * Triggers a click action on the `Cancel` button from the Modal Dialog
   * component
   *
   * @returns {Object} Promise
   */
  clickCloseBtn: function () {
    return this
      .getCloseBtn()
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

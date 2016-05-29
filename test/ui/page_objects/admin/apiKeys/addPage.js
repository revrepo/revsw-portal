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

// # Dialog Dashboard Page Object.

// Portal app has the ability to display confirm dialogs while doing several
// operations in the whole app. This Dialog PAge Objects abstracts those
// operations or actions that an common user could do in this kind of object.

var AddApiKey = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    modal: {
      className: 'modal-dialog',
      title: {
        css: '.modal-content .modal-header'
      },
      inputTexts: {
        account: {
          css: '.ui-select-search'
        }
      },
      dropDowns: {
        account: {
          css: '[ng-click=\"$select.toggle($event)\"]'
        }
      },
      buttons: {
        cancel: {
          css: '.btn.btn-warning'
        },
        create: {
          css: '.btn.btn-success'
        }
      }
    }
  },

  // ## Methods

  /**
   * ### AddApiKey.getModalEl()
   *
   * Return the reference to the Modal Dialog (Selenium WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getModalEl: function () {
    return element(by.className(this.locators.modal.className));
  },

  /**
   * ### AddApiKey.getTitleLbl()
   *
   * Return the reference to the `Title` label (Selenium WebDriver Element)
   * from the Modal Dialog component from Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return this
      .getModalEl()
      .element(by.css(this.locators.modal.title.css));
  },

  /**
   * ### AddApiKey.getAccountDDown()
   *
   * Return the reference to the `Select Account` drop down (Selenium
   * WebDriver Element) from the Modal Dialog component from Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAccountDDown: function () {
    return this
      .getModalEl()
      .element(by.css(this.locators.modal.dropDowns.account.css));
  },

  /**
   * ### AddApiKey.getAccountInputTxt()
   *
   * Return the reference to the `Select Account` input text (Selenium
   * WebDriver Element) from the Modal Dialog component from Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAccountInputTxt: function () {
    return this
      .getModalEl()
      .element(by.css(this.locators.modal.inputTexts.account.css));
  },

  /**
   * ### AddApiKey.getCancelBtn()
   *
   * Return the reference to the `Cancel` button (Selenium WebDriver
   * Element) from the Modal Dialog component from Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCancelBtn: function () {
    return this
      .getModalEl()
      .element(by.css(this.locators.modal.buttons.cancel.css));
  },

  /**
   * ### AddApiKey.getCreateBtn()
   *
   * Return the reference to the `Create` button (Selenium WebDriver Element)
   * from the Modal Dialog component from Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCreateBtn: function () {
    return this
      .getModalEl()
      .element(by.css(this.locators.modal.buttons.create.css));
  },

  // ## Methods to interact with the Dashboard List Page components.

  /**
   * ### AddApiKey.getTitle()
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### AddApiKey.clickSelectAccount()
   *
   * @returns {Promise}
   */
  clickSelectAccount: function () {
    return this
      .getAccountDDown()
      .click();
  },

  /**
   * ### AddApiKey.setAccount(account)
   *
   * Sets an account in `Account` drop down from the Modal Dialog.
   *
   * @returns {Promise}
   */
  setAccount: function (account) {
    this.getAccountInputTxt().sendKeys(account);
    return this.getAccountInputTxt().sendKeys(protractor.Key.ENTER);
  },

  /**
   * ### AddApiKey.clickCancel()
   *
   * Triggers a click action on the `Cancel` button from the Modal Dialog.
   * component
   *
   * @returns {Promise}
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  /**
   * ### AddApiKey.clickCreate()
   *
   * Triggers a click action on the `Create` button from the Modal Dialog.
   *
   * @returns {Promise}
   */
  clickCreate: function () {
    return this
      .getCreateBtn()
      .click();
  },

  /**
   * ### AddApiKey.isDisplayed()
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
        .getDeleteBtn()
        .isPresent();
  },

  /**
   * ### AddApiKey.createAccount(account)
   *
   * Fills the accounts Dialog and click in Create button.
   *
   * @returns {Promise}
   */
  createAccount: function (account) {
    this.clickSelectAccount();
    this.setAccount(account);
    this.clickCreate();
  }
};

module.exports = AddApiKey;
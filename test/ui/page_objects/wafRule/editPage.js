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

// # Edit WAF Rule Page Object

// Requiring `WAF Rule form` component page object
var WAFRuleForm = require('./form');

// This `Edit WAF Rule` Page Object abstracts all operations or actions that a
// common WAFRule could do in the Edit WAFRule page from the Portal app/site.
var EditWAFRule = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        className: 'page-title'
      }
    },
    buttons: {
      backToList: {
        linkText: 'Back To List'
      },
      verify: {
        id: 'btnVerify'
      },
      update: {
        linkText: 'Update'
      },
      cancel: {
        linkText: 'Cancel'
      }
    }
  },

  // `Edit WAFRule` Page is compound mainly by a form. This property makes
  // reference to the WAFRuleForm Page Object to interact with it.
  form: WAFRuleForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### EditWAFRule.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Edit WAFRule page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### EditWAFRule.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Edit WAFRule page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### EditWAFRule.getVerifyBtn()
   *
   * Returns the reference to the `Verify` button (Selenium WebDriver
   * Element) from the Edit WAFRule page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getVerifyBtn: function () {
    return element(by.id(this.locators.buttons.verify.id));
  },

  /**
   * ### EditWAFRule.getUpdateBtn()
   *
   * Returns the reference to the `Update` button (Selenium WebDriver
   * Element) from the Edit WAFRule page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getUpdateBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.update.linkText));
  },

  /**
   * ### EditWAFRule.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver Element)
   * from the Edit WAFRule page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  // ## Methods to interact with the Edit WAFRule Page components

  /**
   * ### EditWAFRule.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Edit WAFRule page from
   * the Portal app
   *
   * @returns {Promise}
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },
  /**
   * ### EditWAFRule.clickVerify()
   *
   * Triggers a click on the `Verify` button from the Edit WAFRule page from
   * the Portal app
   *
   * @returns {Promise}
   */
  clickVerify: function () {
    return this
      .getVerifyBtn()
      .click();
  },
  /**
   * ### EditWAFRule.clickUpdate()
   *
   * Triggers a click on the `Update` button from the Edit WAFRule page from
   * the Portal app
   *
   * @returns {Promise}
   */
  clickUpdate: function () {
    return this
      .getUpdateBtn()
      .click();
  },

  /**
   * ### EditWAFRule.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Edit WAFRule page from
   * the Portal app
   *
   * @returns {Promise}
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### EditWAFRule.isDisplayed()
   *
   * Checks whether the Edit WAFRule page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### EditWAFRule.getTitle()
   *
   * Gets the `Title` label from the Edit WAFRule page
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### EditWAFRule.createWAFRule()
   *
   * Updates the WAFRule using the given data by filling it in the form and
   * clicking on the `Update WAFRule` button from the Edit WAFRule page
   *
   * @param {Object} WAFRule, WAFRule data with the schema specified in
   * DataProvider.generateWAFRule()
   *
   * @returns {Promise}
   */
  updateWAFRule: function (WAFRule) {
    this.form.fill(WAFRule);
    return this.clickUpdateWAFRule();
  }
};

module.exports = EditWAFRule;

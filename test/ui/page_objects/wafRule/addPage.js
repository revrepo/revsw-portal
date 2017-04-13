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

// # Add WAF Rules Page Object

// Requiring `ssl-cert form` component page object
var WAFRuleForm = require('./form');

// This `Add WAF Rules` Page Object abstracts all operations or actions that a
// common user could do in the Add WAF Rules page from the Portal app/site.
var AddWAFRulePage = {

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
      cancel: {
        linkText: 'Cancel'
      },
      createWAFRule: {
        id: 'create_waf_rule'
      },
      createAndAddMore: {
        id: 'create_waf_rule_and_add_more'
      }
    }
  },

  // `Add WAF Rules` Page is compound mainly by a form. This property makes
  // reference to the WAFRuleForm Page Object to interact with it.
  form: WAFRuleForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### AddWAFRulePage.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Add WAF Rules page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### AddWAFRulePage.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Add WAF Rules page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### AddWAFRulePage.getCreateWAFRuleBtn()
   *
   * Returns the reference to the `Create WAF Rules` button (Selenium WebDriver
   * Element) from the Add WAF Rules page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCreateWAFRuleBtn: function () {
    return element(by.id(this.locators.buttons.createWAFRule.id));
  },

  /**
   * ### AddWAFRulePage.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver
   * Element) from the Add WAF Rules page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  /**
   * ### AddWAFRulePage.getCreateAndAddMoreBtn()
   *
   * Returns the reference to the `Create  And Add More` button
   * (Selenium WebDriver Element) from the Add WAF Rules page from the Portal
   * app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCreateAndAddMoreBtn: function () {
    return element(by.id(this.locators.buttons.createAndAddMore.id));
  },

  // ## Methods to interact with the Add WAF Rules page components

  /**
   * ### AddWAFRulePage.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Add WAF Rules page
   * from the Portal app
   *

   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### AddWAFRulePage.clickCreateCustomWAFRule()
   *
   * Triggers a click on the `Create WAF Rules` button from the Add WAF Rules page
   * from the Portal app
   *
   * @returns {Object} Promise
   */
  clickCreateCustomWAFRule: function () {
    return this
      .getCreateWAFRuleBtn()
      .click();
  },

  /**
   * ### AddWAFRulePage.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Add WAF Rules page from
   * the Portal app
   *
   * @returns {Object} Promise
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  /**
   * ### AddWAFRulePage.clickCreateAndAddMore()
   *
   * Triggers a click on the `Create WAF Rules And Add More` button from the
   * Add WAF Rules page from the Portal app
   *
   * @returns {Object} Promise
   */
  clickCreateAndAddMore: function () {
    return this
      .getCreateAndAddMoreBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### AddWAFRulePage.isDisplayed()
   *
   * Checks whether the Add WAF Rules page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### AddWAFRulePage.getTitle()
   *
   * Gets the `Title` label from the Add WAF Rules page
   *
   * @returns {Object} Promise
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### AddWAFRulePage.createCustomWAFRule()
   *
   * Creates a new WAF Rule using given data by filling it in the form and
   * clicking on the `Create WAF Rules` button from the Add WAF Rules page
   *
   * @param {Object} wafRule, WAF Rules data with the schema specified in
   * DataProvider.generatewafRule()
   *
   * @returns {Object} Promise
   */
  createCustomWAFRule: function (wafRule) {
    this.form.fill(wafRule);
    return this.clickCreateCustomWAFRule();
  }
};

module.exports = AddWAFRulePage;

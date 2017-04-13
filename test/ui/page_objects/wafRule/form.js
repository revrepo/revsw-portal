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

// # WAF Rule Form Page Object

// Requiring constant values
var Constants = require('./../constants');

var DropDownWidget = require('./../common/dropDownWidget');

// This `WAF Rule Form` Page Object abstracts all operations or actions that a
// common user could do in the Add WAF Rule page from the Portal
// app/site.
var WAFRuleNameForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    textInputs: {
      wafRuleName: {
        model: 'model.rule_name'
      }
    },
    dropDowns: {
      company: {
        id: 'account_id'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)


  /**
   * ### WAFRuleNameForm.getWAFRuleNameTxtIn()
   *
   * Returns the reference to the `WAR Rule Name` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getWAFRuleNameTxtIn: function () {
    return element(by.model(this.locators.textInputs.ruleName.model));
  },

   /**
   * ### WAFRuleNameForm.getCompanyDDown()
   *
   * Returns the reference to the `Account` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCompanyDDown: function () {
    return new DropDownWidget(by.id(this.locators.dropDowns.company.id));
  },

  // ## Methods to interact with the WAF Rule Form components

  /**
   * ### WAFRuleNameForm.clickURLVerificationRadio()
   *
   * Performs a click on 'URL Verification' radio-button
   *
   * @returns {Object} Promise
   */
  clickURLVerificationRadio: function () {
    return this
        .getURLVerificationRadioButton()
        .click();
  },

  /**
   * ### WAFRuleNameForm.clickURLVerificationRadio()
   *
   * Performs a click on 'DNS Verification' radio-button
   *
   * @returns {Object} Promise
   */
  clickDNSVerificationRadio: function () {
    return this
        .getDNSVerificationRadioButton()
        .click();
  },

  /**
   * ### WAFRuleNameForm.clickURLVerificationRadio()
   *
   * Performs a click on 'Email Verification' radio-button
   *
   * @returns {Object} Promise
   */
  clickEmailVerificationRadio: function () {
    return this
        .getEmailVerificationRadioButton()
        .click();
  },

  /**
   * ### WAFRuleNameForm.setWAFRuleName()
   *
   * Sets the value for Domain Name
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setWAFRuleName: function (value) {
    return this
      .getWAFRuleNameTxtIn()
      .sendKeys(value);
  },

  /**
   * ### WAFRuleNameForm.setAccount()
   *
   * Sets a new value for `Account` drop-down
   *
   * @param {String} accounts, array of companies
   *
   * @returns {Object} Promise
   */
  setAccount: function (accounts) {
    // TODO: Is not it better to use forEach?
    for (var i = 0, len = accounts.length; i < len; i++) {
      var account = accounts[i];
      var option = this
        .getCompanyDDown()
        .setValue(account);
      if (i === len - 1) {
        return option;
      }
    }
  },

  // ## Helper Methods

  /**
   * ### WAFRuleNameForm.isDisplayed()
   *
   * Checks whether the WAF Rule Form is displayed or not in the UI
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
        .getWAFRuleNameTxtIn()
        .isPresent();
  },

  /**
   * ### WAFRuleNameForm.fill()
   *
   * Helper method that fills the WAF Rule Form given specified WAF Rule
   * data object
   *
   * @param {object} WAFRule, user data with the following schema
   *
   *    {
   *      rule_name: String,
   *      rule_type: String,
   *
   *      comment: String,
   *      visibility: String
   *    }
   */
  fill: function (wafRule) {
    // TODO: make correct fill
    // if (wafRule.rule_name !== undefined) {
    //   this.setWAFRuleName(wafRule.rule_name);
    // }
  }

};

module.exports = WAFRuleNameForm;

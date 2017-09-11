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
var WebElement = require('./../../common/helpers/webElement');
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
        id: 'rule_name'
      },
      wafRuleDescription: {
        id: 'comment'
      },
      wafRuleStatements: {
        id: 'ruleStatements'
      }
    },
    dropDowns: {
      account: {
        id: 'account_id'
      },
      wafRuleType: {
        id: 'ruleType'
      },
      wafRuleVisibility: {
        id: 'typeVisibility'
      }
    }
  },

  //## Methods to retrieve references to UI elements (Selenium WebDriver Element)


  /**
   * ### WAFRuleNameForm.getWAFRuleNameTxtIn()
   *
   * Returns the reference to the `WAR Rule Name` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getWAFRuleNameTxtIn: function () {
    return element(by.id(this.locators.textInputs.wafRuleName.id));
  },

  /**
 * ### WAFRuleNameForm.getWAFRuleName()
 *
 * Returns the value of the rule name input field
 *
 * @returns {Object} Selenium WebDriver Element
 */
  getWAFRuleName: function () {
    return this
      .getWAFRuleNameTxtIn()
      .getAttribute('value');
  },
  /**
   * ### WAFRuleNameForm.getWAFRuleDescriptionTxtIn()
   *
   * Returns the reference to the `Description` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getWAFRuleDescriptionTxtIn: function () {
    return element(by.id(this.locators.textInputs.wafRuleDescription.id));
  },
  /**
   * ### WAFRuleNameForm.getWAFRuleStatementsTxtIn()
   *
   * Returns the reference to the `Rule Statements` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getWAFRuleStatementsTxtIn: function () {
    return element(by.id(this.locators.textInputs.wafRuleStatements.id));
  },

  /**
   * ### WAFRuleNameForm.getAccountDDown()
   *
   * Returns the reference to the `Account` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getAccountDDown: function () {
    return new DropDownWidget(by.id(this.locators.dropDowns.account.id));
  },
  /**
   * ### WAFRuleNameForm.getWAFRuleTypeDDown()
   *
   * Returns the reference to the `WAF Rule Type` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getWAFRuleTypeDDown: function () {
    return element(by.id(this.locators.dropDowns.wafRuleType.id));
  },
  /**
   * ### WAFRuleNameForm.getAccountDDown()
   *
   * Returns the reference to the `WAF Rule Type` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getWAFRuleVisibilityDDown: function () {
    return element(by.id(this.locators.dropDowns.wafRuleVisibility.id));
  },
  // ## Methods to interact with the WAF Rule Form components

  /**
   * ### WAFRuleNameForm.setWAFRuleName()
   *
   * Sets the value for WAF Rule Name``
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
   * @name clearWAFRuleName
   */
  clearWAFRuleName: function () {
    return WebElement.clearTextInput(this.getWAFRuleNameTxtIn());
  },
  /**
   * ### WAFRuleNameForm.setgetWAFRuleDescription()
   *
   * Sets the value for `Description`
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setWAFRuleDescription: function (value) {
    return this
      .getWAFRuleDescriptionTxtIn()
      .sendKeys(value);
  },
  /**
   * ### WAFRuleNameForm.setWAFRuleType()
   *
   * Sets a new value for `WAF Rule Type` drop-down
   *
   * @param {String} value
   *
   * @returns {Object} Promise
   */
  setWAFRuleType: function (value) {
    return this
      .getWAFRuleTypeDDown()
      .element(by.cssContainingText('option', value))
      .click();
  },

  /**
   * ### WAFRuleNameForm.setgWAFRuleVisibility()
   *
   * Sets a new value for `WAF Rule Visibility` drop-down
   *
   * @param {String} value
   *
   * @returns {Object} Promise
   */
  setWAFRuleVisibility: function (value) {
    return this
      .getWAFRuleVisibilityDDown()
      .element(by.cssContainingText('option', value))
      .click();
  },

  /**
   * ### WAFRuleNameForm.setgetWAFRuleDescription()
   *
   * Sets the value for `WAF Rule Statements`
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setWAFRuleStatements: function (value) {
    return this
      .getWAFRuleStatementsTxtIn()
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
  /**
   * ### DomainForm.setAccountName()
   *
   * Sets a new value for `Account Name` drop-down
   *
   * @param {String} accountName
   *
   * @returns {Promise}
   */
  setAccountName: function (accountName) {
    return this
      .getAccountDDown()
      .setValue(accountName);
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
   *      ruleName: String,
   *      ruleType: String,
   *
   *      comment: String,
   *      visibility: String
   *    }
   */
  fill: function (wafRuleData) {
    var self = this;
    if (wafRuleData.ruleName !== undefined) {
      self.clearWAFRuleName();
      self.setWAFRuleName(wafRuleData.ruleName);
    }

    if (wafRuleData.comment !== undefined) {
      self.setWAFRuleDescription(wafRuleData.comment);
    }

    // Fill Company name if data provided and if element is visible/available
    element.all(by.id(this.locators.dropDowns.account.id))
      .then(function (elements) {
        if (wafRuleData.accountName !== undefined && elements.length > 0) {
          self.setAccountName(wafRuleData.accountName);
        }
      });

    element.all(by.id(this.locators.dropDowns.wafRuleType.id))
      .then(function (elements) {
        if (wafRuleData.ruleType !== undefined && elements.length > 0) {
          self.setWAFRuleType(wafRuleData.ruleType);
        }
      });

    element.all(by.id(this.locators.dropDowns.wafRuleVisibility.id))
      .then(function (elements) {
        if (wafRuleData.visibility !== undefined && elements.length > 0) {
          self.setWAFRuleVisibility(wafRuleData.visibility);
        }
      });

    if (wafRuleData.ruleBody !== undefined) {
      this.setWAFRuleStatements(wafRuleData.ruleBody);
    }
    browser.sleep(9000);
  }

};

module.exports = WAFRuleNameForm;

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

// # SSL Name Form Page Object

// Requiring constant values
var Constants = require('./../constants');

var DropDownWidget = require('./../common/dropDownWidget');

// This `SSL Name Form` Page Object abstracts all operations or actions that a
// common user could do in the Add SSL Name page from the Portal
// app/site.
var SSLNameForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    textInputs: {
      domainName: {
        model: 'model.ssl_name'
      }
    },
    dropDowns: {
      company: {
        id: 'account_id'
      }
    },
    radioButtons: {
      urlVerification: {
        css: 'input[value="url"]'
      },
      dnsVerification: {
        css: 'input[value="dns"]'
      },
      emailVerification: {
        css: 'input[value="email"]'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)


  /**
   * ### SSLNameForm.getURLVerificationRadioButton()
   *
   * Returns the reference to the `URL Verification` radio-button (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getURLVerificationRadioButton: function () {
    return element(by.css(this.locators.radioButtons.urlVerification.css));
  },

  /**
   * ### SSLNameForm.getDNSVerificationRadioButton()
   *
   * Returns the reference to the `DNS Verification` radio-button (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getDNSVerificationRadioButton: function () {
    return element(by.css(this.locators.radioButtons.dnsVerification.css));
  },

  /**
   * ### SSLNameForm.getEmailVerificationRadioButton()
   *
   * Returns the reference to the `Email Verification` radio-button (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getEmailVerificationRadioButton: function () {
    return element(by.css(this.locators.radioButtons.emailVerification.css));
  },

  /**
   * ### SSLNameForm.getDomainNameNameTxtIn()
   *
   * Returns the reference to the `Domain Name` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getDomainNameNameTxtIn: function () {
    return element(by.model(this.locators.textInputs.domainName.model));
  },

   /**
   * ### SSLNameForm.getCompanyDDown()
   *
   * Returns the reference to the `Account` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCompanyDDown: function () {
    return new DropDownWidget(by.id(this.locators.dropDowns.company.id));
  },

  // ## Methods to interact with the SSL Name Form components

  /**
   * ### SSLNameForm.clickURLVerificationRadio()
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
   * ### SSLNameForm.clickURLVerificationRadio()
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
   * ### SSLNameForm.clickURLVerificationRadio()
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
   * ### SSLNameForm.setDomainName()
   *
   * Sets the value for Domain Name
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setDomainName: function (value) {
    return this
      .getDomainNameNameTxtIn()
      .sendKeys(value);
  },

  /**
   * ### SSLNameForm.setAccount()
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
   * ### SSLNameForm.isDisplayed()
   *
   * Checks whether the SSL Name Form is displayed or not in the UI
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
        .getDomainNameNameTxtIn()
        .isPresent();
  },

  /**
   * ### SSLNameForm.fill()
   *
   * Helper method that fills the SSL Name Form given specified SSL Name
   * data object
   *
   * @param {object} sslName, user data with the following schema
   *
   *    {
   *      domainName: String,
   *      account: String,
   *      verificationMethod: String
   *    }
   */
  fill: function (sslName) {
    if (sslName.domainName !== undefined) {
      this.setDomainName(sslName.domainName);
    }

    if (sslName.verificationMethod === 'DNS') {
      this.clickDNSVerificationRadio();
    }else if (sslName.verificationMethod === 'Email') {
      this.clickEmailVerificationRadio();
    }else if (sslName.verificationMethod === 'URL') {
      this.clickURLVerificationRadio();
    }

    var me = this;
    element.all(by.id(this.locators.dropDowns.company.id))
        .then(function (elements) {
          if (sslName.account !== undefined && elements.length > 0) {
            me.setAccount(sslName.account);
          }
        });
  }

};

module.exports = SSLNameForm;

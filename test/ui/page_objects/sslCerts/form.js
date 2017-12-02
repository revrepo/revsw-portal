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

// # SSL Cert Form Page Object

// Requiring constant values
var Constants = require('./../constants');

var DropDownWidget = require('./../common/dropDownWidget');

// This `SSL Cert Form` Page Object abstracts all operations or actions that a
// common user could do in the Add and Edit SSL Cert pages from the Portal
// app/site.
var SSLCertFormForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    textInputs: {
      certName: {
        model: 'model.cert_name'
      },
      publicSSLCert: {
        model: 'model.public_ssl_cert'
      },
      privateSSLKey: {
        model: 'model.private_ssl_key'
      },
      comment: {
        model: 'model.comment'
      }
    },
    dropDowns: {
      company: {
        id: 'account_id'
      },
      certType: {
        model: 'model.cert_type'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### SSLCertForm.getCertNameTxtIn()
   *
   * Returns the reference to the `Cert Name` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCertNameTxtIn: function () {
    return element(by.model(this.locators.textInputs.certName.model));
  },

  /**
   * ### SSLCertForm.getPublicSSLCertTxtIn()
   *
   * Returns the reference to the `Public SSL Cert` text field (Selenium
   * WebDriver Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPublicSSLCertTxtIn: function () {
    return element(by.model(this.locators.textInputs.publicSSLCert.model));
  },

  /**
   * ### SSLCertForm.getPrivateSSLKeyTxtIn()
   *
   * Returns the reference to the `Private SSL Key` text field (Selenium
   * WebDriver Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPrivateSSLKeyTxtIn: function () {
    return element(by.model(this.locators.textInputs.privateSSLKey.model));
  },

  /**
   * ### SSLCertForm.getCommentTxtIn()
   *
   * Returns the reference to the `Comment` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCommentTxtIn: function () {
    return element(by.model(this.locators.textInputs.comment.model));
  },

  /**
   * ### SSLCertForm.getCompanyDDown()
   *
   * Returns the reference to the `Account` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCompanyDDown: function () {
    return new DropDownWidget(by.id(this.locators.dropDowns.company.id));
  },

  /**
   * ### SSLCertForm.getCertTypeDDown()
   *
   * Returns the reference to the `Cert Type` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCertTypeDDown: function () {
    return element(by.model(this.locators.dropDowns.certType.model));
  },

  // ## Methods to interact with the SSL Cert Form components

  /**
   * ### SSLCertForm.setCertName()
   *
   * Sets the value for Cert Name
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setCertName: function (value) {
    this.getCertNameTxtIn().clear();
    return this
      .getCertNameTxtIn()
      .sendKeys(value);
  },

  /**
   * ### SSLCertForm.setPublicSSLCert()
   *
   * Sets the value for Public SSL Cert
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setPublicSSLCert: function (value) {
    this.getPublicSSLCertTxtIn().clear();
    var textArea = this.getPublicSSLCertTxtIn();
    if (value instanceof String){
      return textArea.sendKeys(value);
    }
    if (value instanceof Array){
      for(var i = 0; i < value.length; i++) {
        textArea
          .sendKeys(value[i])
          .sendKeys(protractor.Key.ENTER);
      }
    }
  },

  /**
   * ### SSLCertForm.setPrivateSSLKey()
   *
   * Sets the value for Provate SSL Cert
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setPrivateSSLKey: function (value) {
    this.getPrivateSSLKeyTxtIn().clear();
    var textArea = this.getPrivateSSLKeyTxtIn();
    if (value instanceof String){
      return textArea.sendKeys(value);
    }
    if (value instanceof Array){
      for(var i = 0; i < value.length; i++) {
        textArea
          .sendKeys(value[i])
          .sendKeys(protractor.Key.ENTER);
      }
    }
  },

  /**
   * ### SSLCertForm.setComment()
   *
   * Sets the value for Comment
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setComment: function (value) {
    this.getCommentTxtIn().clear();
    return this
      .getCommentTxtIn()
      .sendKeys(value);
  },

  /**
   * ### SSLCertForm.setAccount()
   *
   * Sets a new value for `Account` drop-down
   *
   * @param {String} accounts, array of companies
   *
   * @returns {Object} Promise
   */
  setAccount: function (accounts) { 
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
   * ### SSLCertForm.setCertType()
   *
   * Sets the value for Cert Type
   *
   * @returns {Object} Promise
   */
  setCertType: function (certType) {
    return this
      .getCertTypeDDown()
      .element(by.cssContainingText('option', certType))
      .click();
  },

  /**
   * ### SSLCertForm.getCertName()
   *
   * Returns the current value for Cert Name
   *
   * @returns {Object} Promise
   */
  getCertName: function () {
    return this
      .getCertNameTxtIn()
      .getAttribute('value');
  },

  /**
   * ### SSLCertForm.getAccount()
   *
   * Returns the current value for Account
   *
   * @returns {Object} Promise
   */
  getAccount: function () {
    return this
      .getCompanyDDown()
      .getValue();
  },

    /**
   * ### SSLCertForm.getPublicSSLCert()
   *
   * Returns the current value for Public SSL Cert
   *
   * @returns {Object} Promise
   */
  getPublicSSLCert: function () {
    return this
      .getPublicSSLCertTxtIn()
      .getAttribute('value');
  },

      /**
   * ### SSLCertForm.getPrivateSSLKey()
   *
   * Returns the current value for Private SSL Key
   *
   * @returns {Object} Promise
   */
  getPrivateSSLKey: function () {
    return this
      .getPrivateSSLKeyTxtIn()
      .getAttribute('value');
  },

        /**
   * ### SSLCertForm.getComment()
   *
   * Returns the current value for Comment
   *
   * @returns {Object} Promise
   */
  getComment: function () {
    return this
      .getCommentTxtIn()
      .getAttribute('value');
  },

  // ## Helper Methods

  /**
   * ### SSLCertForm.isDisplayed()
   *
   * Checks whether the SSL Cert Form is displayed or not in the UI
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
        .getCertNameTxtIn()
        .isPresent();
  },

  /**
   * ### SSLCertForm.fill()
   *
   * Helper method that fills the SSL Cert Form given specified SSL Cert
   * data object
   *
   * @param {object} sslCert, user data with the following schema
   *
   *    {
   *    }
   */
  fill: function (sslCert) {
    if (sslCert.name !== undefined) {
      this.setCertName(sslCert.name);
    }

    // Fill Company name if data provided and if element is visible/available
    var me = this;
    element.all(by.id(this.locators.dropDowns.company.id))
        .then(function (elements) {
          if (sslCert.account !== undefined && elements.length > 0) {
            me.setAccount(sslCert.account);
          }
        });

    element.all(by.model(this.locators.dropDowns.certType.model))
        .then(function (elements) {
          if (sslCert.type !== undefined && elements.length > 0) {
            me.setCertType(sslCert.type);
          }
        });

    if (sslCert.publicSSLCert !== undefined) {
      this.setPublicSSLCert(sslCert.publicSSLCert);
    }
    if (sslCert.privateSSLKey !== undefined) {
      this.setPrivateSSLKey(sslCert.privateSSLKey);
    }
    if (sslCert.comment !== undefined) {
      this.setComment(sslCert.comment);
    }
  }
};

module.exports = SSLCertFormForm;

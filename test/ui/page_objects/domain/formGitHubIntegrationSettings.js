// formGitHubIntegrationSettings
/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Rev Software, Inc.and its suppliers,
 * if any.The intellectual and technical concepts contained
 * herein are proprietary to Rev Software, Inc.
 * and its suppliers and may be covered by U.S.and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Rev Software, Inc.
 */

// # GitHub Integration Settings Form Page Object

// Requiring constant values
var Constants = require('./../constants');

var DropDownWidget = require('./../common/dropDownWidget');
var Dialog = require('./../common/dialog');

// This `GitHub Integration Settings` Page Object abstracts all operations or actions that a
// common domain could do in the GitHub Integration Settings from the Portal app/site.
var FormGitHubIntegrationSettings = {

  // ## Properties
  // Locators specific to HTML elements from this page object
  locators: {
    textInputs: {

      gitHubUrl: {
        id: 'gitHubUrlDomainConfigurationFile'
      },

      gitHubPersonalAPIToken: {
        id: 'gitHubPersonalAPIToken'
      }
    },

    buttons: {
      cancel: {
        css: 'button[ng-click="cancelChanges()"]'
      },
      verify: {
        css: 'button[ng-click="onVerifyGitHubJSONConfig()"]'
      },
    }
  },

  // ## Methods to retrieve references to UI elements
  // (Selenium WebDriver Element)

  /**
   * ### FormGitHubIntegrationSettings.getGitHubPersonalAPITokenTxtIn()
   *
   * Returns the reference to the `GitHub Personal API Token` text field
   * (Selenium WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getGitHubPersonalAPITokenTxtIn: function() {
    return element(by.id(this.locators.textInputs.gitHubPersonalAPIToken.id));
  },
  /**
   * ### FormGitHubIntegrationSettings.setGitHubPersonalAPIToken()
   *
   * Sets a new value for `GitHub Personal API Token` text field
   *
   * @param {String} value  - token
   *
   * @returns {Object} Promise
   */
  setGitHubPersonalAPIToken: function(value) {
    this.getGitHubPersonalAPITokenTxtIn().clear();
    return this.getGitHubPersonalAPITokenTxtIn().sendKeys(value);
  },
  /**
   * ### FormGitHubIntegrationSettings.getGitHubURLTxtIn()
   *
   * Returns the reference to the `GitHub URL` text field
   * (Selenium WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getGitHubURLTxtIn: function() {
    return element(by.id(this.locators.textInputs.gitHubUrl.id));
  },
  /**
   * ### FormGitHubIntegrationSettings.setGitHubURL()
   *
   * Sets a new value for `GitHub URL` text field
   *
   * @param {String} value  - uri
   *
   * @returns {Object} Promise
   */
  setGitHubURL: function(value) {
    this.getGitHubURLTxtIn().clear();
    return this.getGitHubURLTxtIn().sendKeys(value);
  },

  /**
   * ### FormGitHubIntegrationSettings.getCancelBtn()
   *
   * Return the reference to the `Cancel` button (Selenium WebDriver Element)
   * from the Modal Dialog component from Portal app
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function() {
    return Dialog
      .getModal()
      .element(by.css(this.locators.buttons.cancel.css));
  },
  /**
   * ### FormGitHubIntegrationSettings.getVerifyBtn()
   *
   * Return the reference to the `Verify` button (Selenium WebDriver Element)
   * from the Modal Dialog component from Portal app
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getVerifyBtn: function() {
    return Dialog
      .getModal()
      .element(by.css(this.locators.buttons.verify.css));
  },
  /**
   * ### FormGitHubIntegrationSettings.clickCancel()
   *
   * Triggers a click action on the `Cancel` button form the Modal Dialog component
   *
   * @returns {Object} Promise
   */
  clickCancel: function() {
    return this
      .getCancelBtn()
      .click();
  },
  /**
   * ### FormGitHubIntegrationSettings.clickVerify()
   *
   * Triggers a click action on the `Verify` button form the Modal Dialog component
   *
   * @returns {Object} Promise
   */
  clickVerify: function() {
    return this
      .getVerifyBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### FormGitHubIntegrationSettings.isDisplayed()
   *
   * Checks whether the Form is displayed or not in the UI
   *
   * @returns {Promise}
   */
  isDisplayed: function() {
    return this
      .getGitHubURLTxtIn()
      .isPresent() &&
      this
      .getGitHubPersonalAPITokenTxtIn()
      .isPresent();
  },

  /**
   * ### FormGitHubIntegrationSettings.clearForm()
   *
   * Clean the Form in the UI.
   *
   * @returns {Promise}
   */
  clearForm: function() {
    this
      .getGitHubURLTxtIn()
      .clear();

    return this
      .getGitHubPersonalAPITokenTxtIn()
      .clear();
  },

  /**
   * ### FormGitHubIntegrationSettings.fill()
   *
   * Helper method that fills the Domain Form given specified Domain data object
   *
   * @param {object} options, data with the following schema.
   *
   *    {
   *        token: String,
   *        url: String,
   *    }
   */
  fill: function(options) {
    if (options.url !== undefined) {
      this.setGitHubURL(options.url);
    }

    if (options.token !== undefined) {
      this.setGitHubPersonalAPIToken(options.token);
    }

  },
};

module.exports = FormGitHubIntegrationSettings;

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

// # Edit API Key Page Object

// Requiring `Api Key Form` component page object.
var KeyForm = require('./form');

// This `Edit API Key` Page Object abstracts all operations or actions that a
// common API Key could do in the Edit API Key page from the Portal app/site.
var EditApiKey = {

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
      update: {
        css: '#btnUpdate'
      }
    }
  },

  // `Edit API Key` Page is compound mainly by a form. This property makes
  // reference to the KeyForm Page Object to interact with it.
  form: KeyForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### EditApiKey.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Edit API Key page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### EditApiKey.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Edit API Key page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### EditApiKey.getUpdateBtn()
   *
   * Returns the reference to the `Update` button (Selenium WebDriver
   * Element) from the Edit API Key page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getUpdateBtn: function () {
    return element(
      by.css(this.locators.buttons.update.css));
  },
  // ## Methods to interact with the Edit API Key Page components

  /**
   * ### EditApiKey.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Edit API Key page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },
  /**
   * ### EditApiKey.clickUpdate()
   *
   * Triggers a click on the `Update` button from the Edit API Key page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickUpdate: function () {
    return this
      .getUpdateBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### EditApiKey.isDisplayed()
   *
   * Checks whether the Edit API Key page is being displayed in the UI or not.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },
  /**
   * ### EditApiKey.elementIsDisplayed()
   *
   * Checks whether the Edit API Key page is displayed elememt
   * in the UI or not.
   *
   * @returns {Promise}
   */
  elementIsDisplayed: function(elem, value) {
    var element = this.form[elem](value);
    return element.isPresent();
  },

  /**
   * ### EditApiKey.getTitle()
   *
   * Gets the `Title` label from the Edit API Key page
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### EditApiKey.updateKey(apiKey)
   *
   * Updates the API Key using the given data by filling it in the form and
   * clicking on the `Update` button from the Edit API Key page.
   *
   * @param {Object} apiKey, apiKey data with the schema specified in
   * DataProvider.generateApiKeyData()
   *
   * @returns {Promise}
   */
  updateKey: function (apiKey) {
    this.form.fill(apiKey);
    this.form.clickUpdate();
  }
};

module.exports = EditApiKey;

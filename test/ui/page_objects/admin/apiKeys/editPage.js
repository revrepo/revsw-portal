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
// common domain could do in the Edit API Key page from the Portal app/site.
var EditKey = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        className: 'page-title'
      }
    },
    inputTexts: {
      apiKeyName: {
        id: 'key_name'
      },
      managedDomains: {
        css: '[ng-click=\"$select.activate()\"]'
      }
    },
    buttons: {
      backToList: {
        linkText: 'Back To List'
      },
      showApiKey: {
        css: '.btn.btn-primary'
      },
      cancel: {
        linkText: 'Cancel'
      },
      update: {
        css: '.btn.btn-success'
      }
    },
    checkboxes: {
      active: {
        id: 'active'
      },
      readOnly: {
        id: 'read_only_status'
      },
      read: {
        model: 'key.allowed_ops.read_config'
      },
      modify: {
        model: 'key.allowed_ops.modify_config'
      },
      delete: {
        model: 'key.allowed_ops.delete_config'
      },
      purge: {
        model: 'key.allowed_ops.purge'
      },
      reports: {
        model: 'key.allowed_ops.reports'
      },
      admin: {
        model: 'key.allowed_ops.admin'
      }
    }
  },

  // `Edit API Key` Page is compound mainly by a form. This property makes
  // reference to the KeyForm Page Object to interact with it.
  form: KeyForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### EditKey.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Edit Domain page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### EditKey.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Edit Domain page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### EditKey.getShowApiKeyBtn()
   *
   * Returns the reference to the `Show API Key` button (Selenium WebDriver
   * Element) from the Edit Show API Key Page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getShowApiKeyBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.showApiKey.linkText));
  },

  /**
   * ### EditKey.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver
   * Element) from the Edit API Key Page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  /**
   * ### EditKey.getUpdateBtn()
   *
   * Returns the reference to the `Update` button (Selenium WebDriver
   * Element) from the Edit API Key Page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getUpdateBtn: function () {
    return element(by.css(this.locators.buttons.update.css));
  },

  // ## Methods to interact with the Edit Domain Page components

  /**
   * ### EditKey.clickBackToList()
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
   * ### EditKey.clickShowApiKey()
   *
   * Triggers a click on the `Show API Key` button from the Edit API Key page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickShowApiKey: function () {
    return this
      .getShowApiKeyBtn()
      .click();
  },

  /**
   * ### EditKey.clickBasicMode()
   *
   * Triggers a click on the `Basic mode` button from the Edit Domain page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  /**
   * ### EditKey.clickUpdate()
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
   * ### EditKey.isDisplayed()
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
   * ### EditKey.getTitle()
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
   * ### EditKey.updateDomain(apiKey)
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
    
    return this.clickUpdateDomain();
  }
};

module.exports = EditKey;

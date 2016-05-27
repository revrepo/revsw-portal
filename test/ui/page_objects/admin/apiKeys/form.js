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

// This `API Key Form` Page Object abstracts all operations or actions that a
// common domain could do in the Edit API Key page from the Portal app/site.
var KeyForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    inputTexts: {
      apiKeyName: {
        id: 'key_name'
      },
      managedDomains: {
        css: '[ng-click=\"$select.activate()\"]'
      }
    },
    buttons: {
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

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### KeyForm.getNameInputTxt()
   *
   * Returns the reference to the `API Key Name` input text (Selenium WebDriver
   * Element) from the Edit API Key Form Page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getNameInputTxt: function () {
    return element(by.id(this.locators.inputTexts.apiKeyName.id));
  },

  /**
   * ### KeyForm.getManagedDomainInputTxt()
   *
   * Returns the reference to the `Managed Domain` input text (Selenium
   * WebDriver Element) from the Edit API Key Form Page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getManagedDomainInputTxt: function () {
    return element(by.css(this.locators.inputTexts.managedDomains.css));
  },

  /**
   * ### KeyForm.getActiveChekBox()
   *
   * Returns the reference to the `Active` checkbox (Selenium WebDriver
   * Element) from the Edit API Key Form Page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getActiveChekBox: function () {
    return element(by.id(this.locators.checkboxes.active.id));
  },

  /**
   * ### KeyForm.getReadOnlyChekBox()
   *
   * Returns the reference to the `Read Only` checkbox (Selenium WebDriver
   * Element) from the Edit API Key Form Page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getReadOnlyChekBox: function () {
    return element(by.id(this.locators.checkboxes.readOnly.id));
  },

  /**
   * ### KeyForm.getReadChekBox()
   *
   * Returns the reference to the `Read` checkbox (Selenium WebDriver
   * Element) from the Edit API Key Form Page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getReadChekBox: function () {
    return element(by.model(this.locators.checkboxes.read.model));
  },

  /**
   * ### KeyForm.getModifyChekBox()
   *
   * Returns the reference to the `Modify` checkbox (Selenium WebDriver
   * Element) from the Edit API Key Form Page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getModifyChekBox: function () {
    return element(by.model(this.locators.checkboxes.modify.model));
  },

  /**
   * ### KeyForm.getDeleteChekBox()
   *
   * Returns the reference to the `Modify` checkbox (Selenium WebDriver
   * Element) from the Edit API Key Form Page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getDeleteChekBox: function () {
    return element(by.model(this.locators.checkboxes.delete.model));
  },

  /**
   * ### KeyForm.getPurgeChekBox()
   *
   * Returns the reference to the `Purge` checkbox (Selenium WebDriver
   * Element) from the Edit API Key Form Page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getPurgeChekBox: function () {
    return element(by.model(this.locators.checkboxes.purge.model));
  },

  /**
   * ### KeyForm.getReportsChekBox()
   *
   * Returns the reference to the `Reports` checkbox (Selenium WebDriver
   * Element) from the Edit API Key Form Page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getReportsChekBox: function () {
    return element(by.model(this.locators.checkboxes.reports.model));
  },

  /**
   * ### KeyForm.getAdminChekBox()
   *
   * Returns the reference to the `Admin` checkbox (Selenium WebDriver
   * Element) from the Edit API Key Form Page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAdminChekBox: function () {
    return element(by.model(this.locators.checkboxes.admin.model));
  },

  /**
   * ### KeyForm.getShowApiKeyBtn()
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
   * ### KeyForm.getCancelBtn()
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
   * ### KeyForm.getUpdateBtn()
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
   * ### KeyForm.clickShowApiKey()
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
   * ### KeyForm.clickBasicMode()
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
   * ### KeyForm.clickUpdate()
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
   * ### KeyForm.updateDomain(apiKey)
   *
   * Updates the API Key using the given data by filling it in the form and
   * clicking on the `Update` button from the Edit API Key page.
   *
   * @param {Object} apiKey, apiKey data with the schema specified in
   * DataProvider.generateApiKeyData()
   *
   * @returns {Promise}
   */
  fill: function (apiKey) {
    
    return this.clickUpdateDomain();
  }
};

module.exports = KeyForm;
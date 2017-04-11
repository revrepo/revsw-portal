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
// common API Key could do in the Edit API Key page from the Portal app/site.
var KeyForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    inputTexts: {
      apiKeyName: {
        id: 'key_name'
      },
      managedDomains: {
        css: '.ui-select-search'
      },
      managedAccounts: {
        id: 'managed_account_ids'
      },
      keyGuid: {
        id: 'key'
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
   * ### KeyForm.getKeyGuidInputTxt()
   *
   * Returns the reference to the `Key GUID` input text (Selenium
   * WebDriver Element) from the Edit API Key Form Page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getKeyGuidInputTxt: function () {
    return element(by.id(this.locators.inputTexts.keyGuid.id));
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
   * ### KeyForm.getAdditionalAccountsToManagedInputTxt()
   *
   * Returns the reference to the `Additional Accounts To Manage` input text
   * (Selenium WebDriver Element) from the Edit API Key Form Page
   * from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getAdditionalAccountsToManageInputTxt: function () {
    return element(by.id(this.locators.inputTexts.managedAccounts.id));
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
    return element.all(by.css(this.locators.buttons.update.css));
  },

  // ## Methods to interact with the Edit API Key Form Page components.

  /**
   * ### KeyForm.checkActive()
   *
   * Triggers a click on the `Active` checkbox from the Edit API Key page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  checkActive: function () {
    return this
      .getActiveChekBox()
      .click();
  },

  /**
   * ### KeyForm.checkReadOnly()
   *
   * Triggers a click on the `Read Only` checkbox from the Edit API Key page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  checkReadOnly: function () {
    return this
      .getReadOnlyChekBox()
      .click();
  },

  /**
   * ### KeyForm.checkRead()
   *
   * Triggers a click on the `Read` checkbox from the Edit API Key page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  checkRead: function () {
    return this
      .getReadChekBox()
      .click();
  },

  /**
   * ### KeyForm.checkModify()
   *
   * Triggers a click on the `Modify` checkbox from the Edit API Key page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  checkModify: function () {
    return this
      .getModifyChekBox()
      .click();
  },

  /**
   * ### KeyForm.checkDelete()
   *
   * Triggers a click on the `Delete` checkbox from the Edit API Key page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  checkDelete: function () {
    return this
      .getDeleteChekBox()
      .click();
  },

  /**
   * ### KeyForm.checkPurge()
   *
   * Triggers a click on the `Purge` checkbox from the Edit API Key page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  checkPurge: function () {
    return this
      .getPurgeChekBox()
      .click();
  },

  /**
   * ### KeyForm.checkReports()
   *
   * Triggers a click on the `Reports` checkbox from the Edit API Key page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  checkReports: function () {
    return this
      .getReportsChekBox()
      .click();
  },

  /**
   * ### KeyForm.checkAdmin()
   *
   * Triggers a click on the `Admin` checkbox from the Edit API Key page
   * from the Portal app.
   *
   * @returns {Promise}
   */
  checkAdmin: function () {
    return this
      .getAdminChekBox()
      .click();
  },

  /**
   * ### KeyForm.setName(name)
   *
   * Sets a value in `API Key Name` input text in the Edit API Key Form page.
   *
   * @param {String} name, API Key name.
   *
   * @returns {Promise}
   */
  setName: function (name) {
    this.getNameInputTxt().clear();
    return this
      .getNameInputTxt()
      .sendKeys(name);
  },

  /**
   * ### KeyForm.setManagedDomain(domain)
   *
   * Selects a domain in the `Managed Domain` input text of Edit API Key Form.
   *
   * @param {String} domain, domain API Key.
   *
   * @returns {Promise}
   */
  setManagedDomain: function (domain) {
    return this
      .getManagedDomainInputTxt()
      .sendKeys(domain);
  },
  /**
   * ### KeyForm.setAdditionalAccounts(accountName)
   *
   * Selects a account name in the `Additional Accounts To Manage` input text
   * of Edit API Key Form.
   *
   * @param {String} accountName, account name.
   *
   * @returns {Promise}
   */
  setAdditionalAccounts: function (accountName) {
    return this
      .getAdditionalAccountsToManageInputTxt()
      .element(by.css('.ui-select-search'))
      .sendKeys(accountName)
      .sendKeys(protractor.Key.ENTER);
  },
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
   * ### KeyForm.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Edit API Key Form page
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
   * ### KeyForm.isDisplayed()
   *
   * Checks whether the API Key Form is displayed or not in the UI.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    var input1 = this.getNameInputTxt().isPresent();
    var input2 = this.getManagedDomainInputTxt().isPresent();
    var button1 = this.getShowApiKeyBtn().isPresent();
    var button2 = this.getUpdateBtn().isPresent();
    return input1 && input2 && button1 && button2;
  },

  elementIsDisplayed: function(elem, value) {
    var element = this.form[elem](value);
    return element.isPresent();
  },
  /**
   * ### KeyForm.fill(apiKey)
   *
   * Updates the API Key using the given data by filling the form and
   * clicking on the `Update` button from the Edit API Key page.
   *
   * @param {Object} apiKey, apiKey data with the schema specified in
   * DataProvider.generateApiKeyData()
   *
   * @returns {Promise}
   */
  fill: function (apiKey) {
    return this.setName(apiKey.name);
    // this.setManagedDomain(apiKey.domain);

    // if (!apiKey.active) {
    //   this.checkActive();
    // }

    // if (apiKey.readOnly) {
    //   this.checkReadOnly();
    // }

    // if (apiKey.read) {
    //   this.checkRead();
    // }

    // if (apiKey.modify) {
    //   this.checkModify();
    // }

    // if (apiKey.delete) {
    //   this.checkDelete();
    // }

    // if (apiKey.purge) {
    //   this.checkPurge();
    // }

    // if (apiKey.reports) {
    //   this.checkReports();
    // }

    // if (apiKey.admin) {
    //   this.checkAdmin();
    // }
  }
};

module.exports = KeyForm;

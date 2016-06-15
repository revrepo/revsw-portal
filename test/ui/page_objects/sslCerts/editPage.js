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

// # Edit SSL Cert Page Object

// Requiring `ssl cert form` component page object
var SSLCertForm = require('./form');

// This `Edit SSL Cert` Page Object abstracts all operations or actions that a
// common user could do in the Edit SSL Cert Page from the Portal app/site.
var EditSSLCert = {

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
      verify: {
        linkText: 'Verify'
      },
      update: {
        linkText: 'Update'
      },
      publish: {
        linkText: 'Publish'
      }
    }
  },

  // `Edit SSL Cert` Page is compound mainly by a form. This property makes
  // reference to the SSLCertForm Page Object to interact with it.
  form: SSLCertForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### EditSSLCert.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Edit SSL Cert Page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### EditSSLCert.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Edit SSL Cert Page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### EditSSLCert.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver Element)
   * from the Edit SSL Cert Page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  /**
   * ### EditSSLCert.getVerifyBtn()
   *
   * Returns the reference to the `Verify SSL Cert` button (Selenium WebDriver
   * Element) from the Edit SSL Cert Page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getVerifyBtn: function () {
    return element(by.partialButtonText(this.locators.buttons.verify.linkText));
  },

  /**
   * ### EditSSLCert.getUpdateBtn()
   *
   * Returns the reference to the `Update SSL Cert` button (Selenium WebDriver
   * Element) from the Edit SSL Cert Page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getUpdateBtn: function () {
    return element(by.partialButtonText(this.locators.buttons.update.linkText));
  },

  /**
   * ### EditSSLCert.getPublishBtn()
   *
   * Returns the reference to the `Publish SSL Cert` button (Selenium WebDriver
   * Element) from the Edit SSL Cert Page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPublishBtn: function () {
    return element(
      by.partialButtonText(this.locators.buttons.publish.linkText));
  },

  // ## Methods to interact with the Edit SSL Cert Page components

  /**
   * ### EditSSLCert.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Edit SSL Cert Page
   * from the Portal app
   *
   * @returns {Object} Promise
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### EditSSLCert.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Edit SSL Cert Page from
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
   * ### EditSSLCert.clickVerify()
   *
   * Triggers a click on the `Verify SSL Cert` button from the Edit SSL Cert
   * Page from the Portal app
   *
   * @returns {Object} Promise
   */
  clickVerify: function () {
    return this
      .getVerifyBtn()
      .click();
  },

  /**
   * ### EditSSLCert.clickUpdate()
   *
   * Triggers a click on the `Update SSL Cert` button from the Edit SSL Cert
   * Page from the Portal app
   *
   * @returns {Object} Promise
   */
  clickUpdate: function () {
    return this
      .getUpdateBtn()
      .click();
  },

  /**
   * ### EditSSLCert.clickPublish()
   *
   * Triggers a click on the `Publish SSL Cert` button from the Edit SSL Cert
   * Page from the Portal app
   *
   * @returns {Object} Promise
   */
  clickPublish: function () {
    return this
      .getPublishBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### EditSSLCert.isDisplayed()
   *
   * Checks whether the Edit SSL Cert Page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### EditSSLCert.getTitle()
   *
   * Gets the `Title` label from the Edit SSL Cert Page
   *
   * @returns {Object} Promise
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### EditSSLCert.updateSSLCert()
   *
   * Updates the SSL Cert using the given data by filling it in the form and
   * clicking on the `Update` button from the Edit SSL Cert Page
   *
   * @param {Object} sslCert, ssl cert data with the schema specified in
   * DataProvider.generateSSLCert()
   *
   * @returns {Object} Promise
   */
  updateSSLCert: function (sslCert) {
    this.form.fill(sslCert);
    return this.clickUpdate();
  }
};

module.exports = EditSSLCert;

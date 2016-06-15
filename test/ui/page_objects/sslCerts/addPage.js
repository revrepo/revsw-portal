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

// # Add SSL Cert Page Object

// Requiring `ssl-cert form` component page object
var SSLCertForm = require('./form');

// This `Add SSL Cert` Page Object abstracts all operations or actions that a
// common user could do in the Add SSL Cert page from the Portal app/site.
var AddSSLCert = {

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
      createSSLCert: {
        id: 'create_ssr_cert'
      },
      createSSLCertAndAddMore: {
        id: 'create_ssr_cert_and_add_more'
      }
    }
  },

  // `Add SSL Cert` Page is compound mainly by a form. This property makes 
  // reference to the SSLCertForm Page Object to interact with it.
  form: SSLCertForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### AddSSLCert.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Add SSL Cert page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### AddSSLCert.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Add SSL Cert page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### AddSSLCert.getCreateSSLCertBtn()
   *
   * Returns the reference to the `Create SSL Cert` button (Selenium WebDriver
   * Element) from the Add SSL Cert page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCreateSSLCertBtn: function () {
    return element(by.id(this.locators.buttons.createSSLCert.id));
  },

  /**
   * ### AddSSLCert.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver
   * Element) from the Add SSL Cert page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  /**
   * ### AddSSLCert.getCreateSSLCertAndAddMoreBtn()
   *
   * Returns the reference to the `Create SSL Cert And Add More` button
   * (Selenium WebDriver Element) from the Add SSL Cert page from the Portal
   * app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCreateSSLCertAndAddMoreBtn: function () {
    return element(by.id(this.locators.buttons.createSSLCertAndAddMore.id));
  },

  // ## Methods to interact with the Add SSL Cert page components

  /**
   * ### AddSSLCert.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Add SSL Cert page 
   * from the Portal app
   *
   
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### AddSSLCert.clickCreateSSLCert()
   *
   * Triggers a click on the `Create SSL Cert` button from the Add SSL Cert page
   * from the Portal app
   *
   * @returns {Object} Promise
   */
  clickCreateSSLCert: function () {
    return this
      .getCreateSSLCertBtn()
      .click();
  },

  /**
   * ### AddSSLCert.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Add SSL Cert page from 
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
   * ### AddSSLCert.clickCreateSSLCertAndAddMore()
   *
   * Triggers a click on the `Create SSL Cert And Add More` button from the
   * Add SSL Cert page from the Portal app
   *
   * @returns {Object} Promise
   */
  clickCreateSSLCertAndAddMore: function () {
    return this
      .getCreateSSLCertAndAddMoreBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### AddSSLCert.isDisplayed()
   *
   * Checks whether the Add SSL Cert page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### AddSSLCert.getTitle()
   *
   * Gets the `Title` label from the Add SSL Cert page
   *
   * @returns {Object} Promise
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### AddSSLCert.createSSLCert()
   *
   * Creates a new SSL Cert using given data by filling it in the form and
   * clicking on the `Create SSL Cert` button from the Add SSL Cert page
   *
   * @param {Object} sslCert, SSL Cert data with the schema specified in
   * DataProvider.generateSSLCert()
   *
   * @returns {Object} Promise
   */
  createSSLCert: function (sslCert) {
    this.form.fill(sslCert);
    return this.clickCreateSSLCert();
  }
};

module.exports = AddSSLCert;

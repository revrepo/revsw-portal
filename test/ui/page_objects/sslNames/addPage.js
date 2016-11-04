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

// # Add SSL Name Page Object

var Dialog = require('./../common/dialog');
var Alerts = require('./../common/alerts');

// Requiring `ssl-name form` component page object
var SSLNameForm = require('./form');

// This `Add SSL Name` Page Object abstracts all operations or actions that a
// common user could do in the Add SSL Name page from the Portal app/site.
var AddSSLName = {

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
      addSSLName: {
        id: 'create_ssr_cert'
      }
    }
  },

  dialog: Dialog,

  // `Add SSL Name` Page is compound mainly by a form. This property makes
  // reference to the SSLNameForm Page Object to interact with it.
  form: SSLNameForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### AddSSLName.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Add SSL Name page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### AddSSLName.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Add SSL Name page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### AddSSLName.getAddSSLNameBtn()
   *
   * Returns the reference to the `Create SSL Name` button (Selenium WebDriver
   * Element) from the Add SSL Name page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getAddSSLNameBtn: function () {
    return element(by.id(this.locators.buttons.addSSLName.id));
  },

  /**
   * ### AddSSLName.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver
   * Element) from the Add SSL Name page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  // ## Methods to interact with the Add SSL Name page components

  /**
   * ### AddSSLName.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Add SSL Name page
   * from the Portal app
   *
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### AddSSLName.clickAddSSLName()
   *
   * Triggers a click on the `Create SSL Name` button from the Add SSL Name page
   * from the Portal app
   *
   * @returns {Object} Promise
   */
  clickAddSSLName: function () {
    return this
      .getAddSSLNameBtn()
      .click();
  },

  /**
   * ### AddSSLName.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Add SSL Name page from
   * the Portal app
   *
   * @returns {Object} Promise
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### AddSSLName.isDisplayed()
   *
   * Checks whether the Add SSL Name page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### AddSSLName.getTitle()
   *
   * Gets the `Title` label from the Add SSL Name page
   *
   * @returns {Object} Promise
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### AddSSLName.closeSuccessDialog()
   *
   * Triggers a click on the `Close` button from the Success dialog on Add SSL Name page.
   *
   * @returns {Object} Promise
   */
  closeSuccessDialog: function () {
    return element(by.css(this.dialog.locators.modal.buttons.ok.css))
      .click();
  },

  /**
   * ### AddSSLName.createSSLName()
   *
   * Creates a new SSL Name using given data by filling it in the form and
   * clicking on the `Create SSL Name` button from the Add SSL Name page
   *
   * @param {Object} sslName, SSL Name data with the schema specified in
   * DataProvider.generateSSLName()
   *
   * @returns {Object} Promise
   */
  createSSLName: function (sslName) {
    this.form.fill(sslName);
    var me = this;
    if (sslName.verificationMethod !== 'Email') {

      return this
        .clickAddSSLName()
        .then(function () {
          return me.dialog.clickOk();
        })
        .then(function () {
          browser.wait(function () {
            return Alerts
              .getAll()
              .count() === 0;
          }, 30000);
          return me.dialog
            .getModalEl()
            .element(by.css('input[value="' + sslName.verificationString + '"]'))
            .click();
        })
        .then(function () {
          return me.dialog.clickVerify();
        })
        .then(function () {
          return me.dialog.clickOk();
        });
    }
    // else
    return me
      .clickAddSSLName()
      .then(function () {
        return me.dialog
          .getModalEl()
          .element(by.css('input[value="' + sslName.verificationString + '"]'))
          .click();
      })
      .then(function () {
        return me.dialog.clickOk();
      })
      .then(function () {
        return me.dialog.clickClose();
      });
  }
};

module.exports = AddSSLName;

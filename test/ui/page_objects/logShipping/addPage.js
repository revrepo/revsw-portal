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

// # Add Log Shipping Name Page Object

var Dialog = require('.././common/dialog');

// Requiring `log-shipping form` component page object
var LogShippingForm = require('./form');

// This `Add Log Shipping` Page Object abstracts all operations or actions that a
// common user could do in the Add Log Shipping page from the Portal app/site.
var AddLogShipping = {

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
      createJob: {
        css: 'i.glyphicon-ok'
      },
      saveJob: {
        css: '.btn.btn-success'
      }
    }
  },

  dialog: Dialog,

  // `Add Log Shipping` Page is compound mainly by a form. This property makes
  // reference to the LogShippingForm Page Object to interact with it.
  form: LogShippingForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### AddLogShipping.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Add Log Shipping page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### AddLogShipping.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Add LogS hipping page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### AddLogShipping.getCreateJobBtn()
   *
   * Returns the reference to the `Create Job` button (Selenium WebDriver
   * Element) from the Add Log Shipping page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCreateJobBtn: function () {
    return element(by.css(this.locators.buttons.createJob.css));
  },

  /**
   * ### AddLogShipping.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver
   * Element) from the Add Log Shipping page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  // ## Methods to interact with the Add Log Shipping page components

  /**
   * ### AddLogShipping.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Add Log Shipping page
   * from the Portal app
   *
   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### AddLogShipping.clickCreateJobBtn()
   *
   * Triggers a click on the `Create Job` button from the Add Log Shipping page
   * from the Portal app
   *
   * @returns {Object} Promise
   */
  clickCreateJobBtn: function () {
    return this
      .getCreateJobBtn()
      .click();
  },

  isSaveBtnEnabled: function () {
    return element(by.cssContainingText(this.locators.buttons.saveJob.css, 'Create Job'))
      .isEnabled();
  },

  /**
   * ### AddLogShipping.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Add Log Shipping page from
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
   * ### AddLogShipping.isDisplayed()
   *
   * Checks whether the Add Log Shipping page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### AddLogShipping.getTitle()
   *
   * Gets the `Title` label from the Add Log Shipping page
   *
   * @returns {Object} Promise
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### AddLogShipping.createLogShippingJob()
   *
   * Creates a new Log Shipping Job using given data by filling it in the form and
   * clicking on the `Create Job` button from the Add Log Shipping page
   *
   * @param {Object} logShippingJob, Log Shipping Job data with the schema specified in
   * DataProvider.generateLogShippingJob()
   *
   * @returns {Object} Promise
   */
  createLogShippingJob: function (logShippingJob) {
    this.form.fill(logShippingJob);
    return this.clickCreateJobBtn();
  }
};

module.exports = AddLogShipping;

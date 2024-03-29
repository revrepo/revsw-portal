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

// # Edit DNS Zone Record Page Object

// Requiring `dns-zone record form` component page object
var DNSZoneRecordForm = require('./form');

// This `Edit DNS Zone Record ` Page Object abstracts all operations or actions that a
// common user could do in the Edit DNS Zone Record Page from the Portal app/site.
var EditDNSZoneRecord = {

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
      update: {
        css: 'button.btn.btn-success'
      }
    }
  },

  // `Edit DNS Zone Record` Page is compound mainly by a form. This property makes
  // reference to the DNSZoneRecordForm Page Object to interact with it.
  form: DNSZoneRecordForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### EditDNSZoneRecord.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Edit DNS Zone Record Page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### EditDNSZoneRecord.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Edit DNS Zone Record Page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### EditDNSZoneRecord.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver Element)
   * from the Edit DNS Zone Record Page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  /**
   * ### EditDNSZoneRecord.getCancelBtn()
   *
   * Returns the reference to the `Update` button (Selenium WebDriver Element)
   * from the Edit DNS Zone Record Page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getUpdateBtn: function () {
    return element(by.css(this.locators.buttons.update.css));
  },

  // ## Methods to interact with the Edit DNS Zone Record Page components

  /**
   * ### EditDNSZoneRecord.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Edit DNS Zone Record Page
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
   * ### EditDNSZoneRecord.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Edit DNS Zone Record Page from
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
   * ### EditDNSZoneRecord.clickUpdate()
   *
   * Triggers a click on the `Update` button from the Edit DNS Zone
   * Record Page from the Portal app
   *
   * @returns {Object} Promise
   */
  clickUpdate: function () {
    return this
      .getUpdateBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### EditDNSZoneRecord.isDisplayed()
   *
   * Checks whether the Edit DNS Zone Record Page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### EditDNSZoneRecord.getTitle()
   *
   * Gets the `Title` label from the Edit DNS Zone Record Page
   *
   * @returns {Object} Promise
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  }
};

module.exports = EditDNSZoneRecord;

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

// # Edit DNS Zone Page Object

// Requiring `dns-zone form` component page object
var DNSZoneForm = require('./form');

// This `Edit DNS Zone` Page Object abstracts all operations or actions that a
// common user could do in the Edit DNS Zone Page from the Portal app/site.
var EditDNSZone = {

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

  // `Edit DNS Zone` Page is compound mainly by a form. This property makes
  // reference to the DNSZoneForm Page Object to interact with it.
  form: DNSZoneForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### EditDNSZone.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Edit DNS Zone Page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### EditDNSZone.getBackToListBtn()
   *
   * Returns the reference to the `Back To List` button (Selenium WebDriver
   * Element) from the Edit DNS Zone Page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  /**
   * ### EditDNSZone.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver Element)
   * from the Edit DNS Zone Page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  /**
   * ### EditDNSZone.getCancelBtn()
   *
   * Returns the reference to the `Update` button (Selenium WebDriver Element)
   * from the Edit DNS Zone Page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getUpdateBtn: function () {
    return element(by.css(this.locators.buttons.update.css));
  },

  // ## Methods to interact with the Edit DNS Zone Page components

  /**
   * ### EditDNSZone.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Edit DNS Zone Page
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
   * ### EditDNSZone.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Edit DNS Zone Page from
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
   * ### EditDNSZone.clickUpdate()
   *
   * Triggers a click on the `Update` button from the Edit DNS Zone
   * Page from the Portal app
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
   * ### EditDNSZone.isDisplayed()
   *
   * Checks whether the Edit DNS Zone Page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### EditDNSZone.getTitle()
   *
   * Gets the `Title` label from the Edit DNS Zone Page
   *
   * @returns {Object} Promise
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### EditDNSZone.updateDNSZone()
   *
   * Updates the DNS Zone using the given data by filling it in the form and
   * clicking on the `Update` button from the Edit DNS Zone Page
   *
   * @param {Object} dnsZone, dns zone cert data with the schema specified in
   * DataProvider.generateDNSZoneData()
   *
   * @returns {Object} Promise
   */
  updateDNSZone: function (dnsZone) {
    this.form.fill(dnsZone);
    return this.clickUpdate();
  }
};

module.exports = EditDNSZone;

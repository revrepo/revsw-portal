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

// # Add DNS Zone Page Object

var Dialog = require('.././common/dialog');

// Requiring `DNS zone form` component page object
var DNSZoneForm = require('./form');

// This `Add DNS Zone` Page Object abstracts all operations or actions that a
// common user could do in the Add DNS Zone page from the Portal app/site.
var AddDNSZone = {

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
      createDNSZone: {
        css: '#create_dns_zone i.glyphicon-ok'
      }
    }
  },

  dialog: Dialog,

  // `Add DNS Zone` Page is compound mainly by a form. This property makes
  // reference to the DNSZoneForm Page Object to interact with it.
  form: DNSZoneForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### AddDNSZone.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Add DNS Zone page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### AddDNSZone.getBackToListBtn()
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
   * ### AddDNSZone.getCreateDNSZoneBtn()
   *
   * Returns the reference to the `Create DNS Zone` button (Selenium WebDriver
   * Element) from the Add DNS Zone page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCreateDNSZoneBtn: function () {
    return element(by.css(this.locators.buttons.createDNSZone.css));
  },

  /**
   * ### AddDNSZone.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver
   * Element) from the Add DNS Zone page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  // ## Methods to interact with the Add DNS Zone page components

  /**
   * ### AddDNSZone.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Add DNS Zone page
   * from the Portal app
   *

   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### AddDNSZone.clickCreateDNSZone()
   *
   * Triggers a click on the `Create DNS Zone` button from the Add DNS Zone page
   * from the Portal app
   *
   * @returns {Object} Promise
   */
  clickCreateDNSZone: function () {
    return this
      .getCreateDNSZoneBtn()
      .click();
  },

  /**
   * ### AddDNSZone.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Add DNS Zone page from
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
   * ### AddDNSZone.isDisplayed()
   *
   * Checks whether the Add DNS Zone page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### AddDNSZone.getTitle()
   *
   * Gets the `Title` label from the Add DNS Zone page
   *
   * @returns {Object} Promise
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### AddDNSZone.createDNSZone()
   *
   * Creates a new DNS Zone using given data by filling it in the form and
   * clicking on the `Create DNS Zone` button from the Add DNS Zone page
   *
   * @param {Object} zone, DNS Zone data with the schema specified in
   * DataProvider.generateDNSZone()
   *
   * @returns {Object} Promise
   */
  createDNSZone: function (zone) {
    this.form.fill(zone);
    return this.clickCreateDNSZone();
  }
};

module.exports = AddDNSZone;

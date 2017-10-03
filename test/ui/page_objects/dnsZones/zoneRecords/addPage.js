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

// # Add Zone Records Page Object

//var Dialog = require('.././common/dialog');

// Requiring `zone-record form` component page object
var ZoneRecordForm = require('./form');

// This `Add Zone Record` Page Object abstracts all operations or actions that a
// common user could do in the Add Zone Record page from the Portal app/site.
var AddZoneRecord = {

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
      addNewRecord: {
        css: '#create_dns_zone_record'
      }
    }
  },

  //dialog: Dialog,

  // `Add Zone Records` Page is compound mainly by a form. This property makes
  // reference to the Zone Record Form Page Object to interact with it.
  form: ZoneRecordForm,

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### AddZoneRecord.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the Add Zone Records page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTitleLbl: function () {
    return element(by.className(this.locators.labels.title.className));
  },

  /**
   * ### AddZoneRecord.getBackToListBtn()
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
   * ### AddZoneRecord.getCreateZoneRecordBtn()
   *
   * Returns the reference to the `Create Zone Record` button (Selenium WebDriver
   * Element) from the Add Zone Records page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getAddNewRecordBtn: function () {
    return element(by.css(this.locators.buttons.addNewRecord.css));
  },

  /**
   * ### AddZoneRecord.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver
   * Element) from the Add Zone Records page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  // ## Methods to interact with the Add Zone Records page components

  /**
   * ### AddZoneRecord.clickBackToList()
   *
   * Triggers a click on the `Back To List` button from the Add Zone Records page
   * from the Portal app
   *

   */
  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  /**
   * ### AddZoneRecord.clickCreateZoneRecord()
   *
   * Triggers a click on the `Create Zone Record` button from the Add Zone Records page
   * from the Portal app
   *
   * @returns {Object} Promise
   */
  clickAddNewRecord: function () {
    return this
      .getAddNewRecordBtn()
      .click();
  },

  /**
   * ### AddZoneRecord.clickCancel()
   *
   * Triggers a click on the `Cancel` button from the Add Zone Records page from
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
   * ### AddZoneRecord.isDisplayed()
   *
   * Checks whether the Add Zone Records page is being displayed in the UI or not.
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  /**
   * ### AddZoneRecord.getTitle()
   *
   * Gets the `Title` label from the Add Zone Records page
   *
   * @returns {Object} Promise
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### AddZoneRecord.createZoneRecord()
   *
   * Creates a new Zone Record using given data by filling it in the form and
   * clicking on the `Create Zone Record` button from the Add Zone Records page
   *
   * @param {Object} zone, Zone Record data with the schema specified in
   * DataProvider.generateZoneRecord()
   *
   * @returns {Object} Promise
   */
  createZoneRecord: function (zone) {
    this.form.fill(zone);
    return this.clickCreateZoneRecord();
  }
};

module.exports = AddZoneRecord;

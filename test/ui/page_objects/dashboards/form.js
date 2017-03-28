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

// # Dashboard Form Page Object

// Requiring constant values
var Constants = require('./../constants');

var DropDownWidget = require('./../common/dropDownWidget');

// This `Dashboard Form` Page Object abstracts all operations or actions
// that a common dashboard could do in the Add Dashboard and Edit Dashboard
// page from the Portal app/site.

var DashboardForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    labels: {
      title: {
        css: '.modal-title'
      }
    },
    textInputs: {
      title: {
        id: 'dashboardTitle'
      }
    },
    radios: {
      structure: {
        repeater: '(key, structure) in structures'
      }
    },
    dropDowns: {
      autoRefresh: {
        model: 'model.options.autorefresh'
      }
    },
    buttons: {
      create: {
        css: '.btn.btn-primary'
      },
      cancel: {
        css: '.btn.btn-default'
      },
      delete: {
        css: '.modal-dialog .btn-danger'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### DashboardForm.getTitleLbl()
   *
   * Returns the reference to the `Dashboard Form Title` text field (Selenium
   * WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function () {
    return element(by.css(this.locators.labels.title.css));
  },

  /**
   * ### DashboardForm.getTitleTxtIn()
   *
   * Returns the reference to the `Dashboard Title` text field (Selenium
   * WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleTxtIn: function () {
    return element(by.id(this.locators.textInputs.title.id));
  },

  /**
   * ### DashboardForm.getStructuresRadios(radioIndex)
   *
   * Returns the reference to the `Structures Radios` drop down field (Selenium
   * WebDriver Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getStructuresRadios: function (radioIndex) {
    return element
      .all(by.repeater(this.locators.radios.structure.repeater))
      .get(radioIndex);
  },

  /**
   * ### DashboardForm.getCreateBtn()
   *
   * Returns the reference to the `Create` button (Selenium WebDriver Element).
   *
   * @returns {Selenium WebDriver Element}
   */
  getCreateBtn: function () {
    return element(by.css(this.locators.buttons.create.css));
  },

  /**
   * ### DashboardForm.getCancelBtn()
   *
   * Returns the reference to the `Cancel` button (Selenium WebDriver Element).
   *
   * @returns {Selenium WebDriver Element}
   */
  getCancelBtn: function () {
    return element(by.css(this.locators.buttons.cancel.css));
  },

  /**
   * ### DashboardForm.getDeleteBtn()
   *
   * Returns the reference to the `Delete Dashboard` button (Selenium
   * WebDriver Element).
   *
   * @returns {Selenium WebDriver Element}
   */
  getDeleteBtn: function () {
    return element(by.css(this.locators.buttons.delete.css));
  },

  /**
   * ### DashboardForm.getAutoRefreshDDown()
   *
   * Returns the reference to the `Auto-Refresh` drop down (Selenium WebDriver
   * Element)
   *
   * @returns {Selenium WebDriver Element}
   */
  getAutoRefreshDDown: function () {
    return element
      .all(by.model(this.locators.dropDowns.autoRefresh.model))
      .get(1);
  },

  // ## Methods to interact with the Dashboard form components

  /**
   * ### DashboardForm.getFormTitle()
   *
   * Gets the current title from Dashboard form.
   *
   * @returns {Promise}
   */
  getFormTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },

  /**
   * ### DashboardForm.setTitle(title)
   *
   * Sets a value for `Title` text field.
   *
   * @param {String} title.
   *
   * @returns {Promise}
   */
  setTitle: function (title) {
    this.getTitleTxtIn().clear();
    return this
      .getTitleTxtIn()
      .sendKeys(title);
  },

  /**
   * ### DashboardForm.setAutoRefresh(frequency)
   *
   * Sets a value for `Auto-Refresh` drop down field.
   *
   * @param {String} frequency.
   *
   * @returns {Promise}
   */
  setAutoRefresh: function (frequency) {
    return this
      .getAutoRefreshDDown()
      .sendKeys(frequency);
  },

  /**
   * ### DashboardForm.setStructure(radioIndex)
   *
   * Sets one `Structure` radio element.
   *
   * @param {String} radioIndex.
   *
   * @returns {Promise}
   */
  setStructure: function (radioIndex) {
    return this
      .getStructuresRadios(radioIndex)
      .click();
  },

  /**
   * ### DashboardForm.clickCreate()
   *
   * Clicks on `Create` button.
   *
   * @returns {Promise}
   */
  clickCreate: function () {
    return this
      .getCreateBtn()
      .click();
  },

  /**
   * ### DashboardForm.clickCancel()
   *
   * Clicks on `Cancel` button.
   *
   * @returns {Promise}
   */
  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  /**
   * ### DashboardForm.clickDelete()
   *
   * Clicks on `Delete` button.
   *
   * @returns {Promise}
   */
  clickDelete: function () {
    return this
      .getDeleteBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### DashboardForm.isDisplayed()
   *
   * Checks whether the Dashboard Form is displayed or not in the UI.
   *
   * @returns {Promise}
   */
  isDisplayed: function () {
    return this
        .getTitleTxtIn()
        .isPresent() &&
      this
        .getAutoRefreshDDown()
        .isPresent() &&
      this
        .getCreateBtn()
        .isPresent();
  },

  /**
   * ### DashboardForm.fill()
   *
   * Helper method that fills the Dashboard Form given specified Dashboard data.
   *
   * @param {object} dashboard, dashboard data with the following schema.
   *
   *    {
   *        title: String,
   *        structure: Number, // (1, 2, 3, 4, 5)
   *        autoRefresh: String
   *    }
   */
  fill: function (dashboard) {
    this.setTitle(dashboard.title);
    this.setStructure(dashboard.structure);
    this.setAutoRefresh(dashboard.frequency);
  }
};

module.exports = DashboardForm;
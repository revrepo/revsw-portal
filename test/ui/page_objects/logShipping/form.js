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

// # Log Shipping Form Page Object

// Requiring constant values
var Constants = require('./../constants');

var DropDownWidget = require('./../common/dropDownWidget');

// This `Log Shipping Form` Page Object abstracts all operations or actions that a
// common user could do in the Add Log Shipping page from the Portal
// app/site.
var LogShippingForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    textInputs: {
      jobName: {
        model: 'model.job_name'
      }
    },
    dropDowns: {
      account: {
        id: 'account_id'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### LogShippingForm.getJobNameTxtIn()
   *
   * Returns the reference to the `Domain Name` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getJobNameTxtIn: function () {
    return element(by.model(this.locators.textInputs.jobName.model));
  },

   /**
   * ### LogShippingForm.getCompanyDDown()
   *
   * Returns the reference to the `Account` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCompanyDDown: function () {
    return new DropDownWidget(by.id(this.locators.dropDowns.account.id));
  },

  // ## Methods to interact with the Log Shipping Form components

  /**
   * ### LogShippingForm.setJobName()
   *
   * Sets the value for Job Name
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setJobName: function (value) {
    return this
      .getJobNameTxtIn()
      .sendKeys(value);
  },

  clearJobName: function () {
    var me = this;
    return this
        .getJobNameTxtIn()
        .sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'))
        .then(function () {
          me.getJobNameTxtIn().sendKeys(protractor.Key.BACK_SPACE);
        });
  },

  /**
   * ### LogShippingForm.setAccount()
   *
   * Sets a new value for `Account` drop-down
   *
   * @param {String} accounts, array of companies
   *
   * @returns {Object} Promise
   */
  setAccount: function (accounts) { 
    for (var i = 0, len = accounts.length; i < len; i++) {
      var account = accounts[i];
      var option = this
        .getCompanyDDown()
        .setValue(account);
      if (i === len - 1) {
        return option;
      }
    }
  },

  // ## Helper Methods

  /**
   * ### LogShippingForm.isDisplayed()
   *
   * Checks whether the Log Shipping Form is displayed or not in the UI
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
        .getJobNameTxtIn()
        .isPresent();
  },

  /**
   * ### LogShippingForm.fill()
   *
   * Helper method that fills the Log Shipping Form given specified Log Shipping
   * data object
   *
   * @param {object} jobName, user data with the following schema
   *
   *    {
   *      name: String,
   *      account: String,
   *    }
   */
  fill: function (jobName) {
    if (jobName.name !== undefined) {
      this.clearJobName();
      this.setJobName(jobName.name);
    }

    var me = this;
    element.all(by.id(this.locators.dropDowns.account.id))
        .then(function (elements) {
          if (jobName.account !== undefined && elements.length > 0) {
            me.setAccount(jobName.account);
          }
        });
  }


};

module.exports = LogShippingForm;

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

// # Zone Record Form Page Object

// Requiring constant values
var Constants = require('./../../constants');

var DropDownWidget = require('./../../common/dropDownWidget');

// This `Zone Record Form` Page Object abstracts all operations or actions that a
// common user could do in the Add Zone Record page from the Portal
// app/site.
var ZoneRecordForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    textInputs: {
      domain: {
        model: 'model.idomain'
      },
      answer: {
        model: 'model.newanswer.value'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### ZoneRecordForm.getDomainTxtIn()
   *
   * Returns the reference to the `Domain` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getDomainTxtIn: function () {
    return element(by.model(this.locators.textInputs.domain.model));
  },

  /**
   * ### ZoneRecordForm.getAnswerTxtIn()
   *
   * Returns the reference to the `Answer` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getAnswerTxtIn: function () {
    return element(by.model(this.locators.textInputs.answer.model));
  },

  // ## Methods to interact with the Zone Record Form components

  /**
   * ### ZoneRecordForm.setDomain()
   *
   * Sets the value for Domain
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setDomain: function (value) {
    var me = this;
    return this
      .getDomainTxtIn().clear().then(function () {
        me.getDomainTxtIn()
          .sendKeys(value);
      });
  },

  /**
   * ### ZoneRecordForm.getDomain()
   *
   * Gets the value from the Domain Txt In
   *
   * @returns {Object} Promise
   */
  getDomain: function () {
    return this
      .getDomainTxtIn()
      .getAttribute('value');
  },

  /**
   * ### ZoneRecordForm.getAnswer()
   *
   * Gets the value from the Answer Txt In
   *
   * @returns {Object} Promise
   */
  getAnswer: function () {
    return this
      .getAnswerTxtIn()
      .getAttribute('value');
  },

  /**
   * ### ZoneRecordForm.setAnswer()
   *
   * Sets the value for SOA TTL Txt In
   *
   * @param {String} value, new value to set
   *
   * @returns {Object} Promise
   */
  setAnswer: function (value) {
    var me = this;
    return this
      .getAnswerTxtIn().clear().then(function () {
        me.getAnswerTxtIn()
          .sendKeys(value);
      });
  },

  // ## Helper Methods

  /**
   * ### ZoneRecordForm.isDisplayed()
   *
   * Checks whether the Zone Record Form is displayed or not in the UI
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
      .getDomainTxtIn()
      .isPresent();
  },

  /**
   * ### ZoneRecordForm.fill()
   *
   * Helper method that fills the Zone Record Form given specified Zone Record
   * data object
   *
   * @param {object} record, user data with the following schema
   *
   *    {
   *      name: String,
   *      answer: String,
   *    }
   */
  fill: function (record) {
    var me = this;

    element.all(by.model(this.locators.textInputs.domain.model))
      .then(function (elements) {
        if (record.name !== undefined && elements.length > 0) {
          me.setDomain(record.name);
        }
      });

    element.all(by.model(this.locators.textInputs.answer.model))
      .then(function (elements) {
        if (record.answer !== undefined && elements.length > 0) {
          me.setAnswer(record.answer);
        }
      });
  }
};

module.exports = ZoneRecordForm;

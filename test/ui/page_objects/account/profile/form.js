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

var DropDownWidget = require('./../../common/dropDownWidget');

// # Account Profile Form Object

// This `Account Profile` Form Object abstracts all operations or actions that a
// common user could do in the Account Profile form from the Portal app/site.
var AccountProfileForm = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    buttons: {
      cancel: {
        linkText: 'Cancel'
      },
      update: {
        buttonText: 'Update Company Profile'
      }
    },
    textInputs: {
      firstAddress: {
        id: 'address1'
      },
      secondAddress: {
        id: 'address2'
      },
      city: {
        id: 'city'
      },
      comment: {
        id: 'comment'
      },
      companyName: {
        id: 'companyName'
      },
      contactEmail: {
        id: 'contactEmail'
      },
      country: {
        id: 'Country'
      },
      firstName: {
        id: 'firstName'
      },
      lastName: {
        id: 'lastName'
      },
      phoneNumber: {
        id: 'phoneNumber'
      },
      state: {
        id: 'state'
      },
      zipCode: {
        id: 'Zipcode'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### AccountProfileForm.getCompanyNameTxtIn()
   *
   * Returns the Company Name text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCompanyNameTxtIn: function () {
    return element(by.id(this.locators.textInputs.companyName.id));
  },

  /**
   * ### AccountProfileForm.getFirstNameTxtIn()
   *
   * Returns the First Name text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getFirstNameTxtIn: function () {
    return element(by.id(this.locators.textInputs.firstName.id));
  },

  /**
   * ### AccountProfileForm.getLastNameTxtIn()
   *
   * Returns the Last Name text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getLastNameTxtIn: function () {
    return element(by.id(this.locators.textInputs.lastName.id));
  },

  /**
   * ### AccountProfileForm.getPhoneNumberTxtIn()
   *
   * Returns the Phone Number text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPhoneNumberTxtIn: function () {
    return element(by.id(this.locators.textInputs.phoneNumber.id));
  },

  /**
   * ### AccountProfileForm.getEmailTxtIn()
   *
   * Returns the Email text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getEmailTxtIn: function () {
    return element(by.id(this.locators.textInputs.contactEmail.id));
  },

  /**
   * ### AccountProfileForm.getFirstAddressTxtIn()
   *
   * Returns the First Address text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getFirstAddressTxtIn: function () {
    return element(by.id(this.locators.textInputs.firstAddress.id));
  },

  /**
   * ### AccountProfileForm.getSecondAddressTxtIn()
   *
   * Returns the Second Address text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getSecondAddressTxtIn: function () {
    return element(by.id(this.locators.textInputs.secondAddress.id));
  },

  /**
   * ### AccountProfileForm.getCountryDDown()
   *
   * Returns the Country drop-down element.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCountryDDown: function () {
    return new DropDownWidget(by.id(this.locators.textInputs.country.id));
  },

  /**
   * ### AccountProfileForm.getStateTxtIn()
   *
   * Returns the State text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getStateTxtIn: function () {
    return element(by.id(this.locators.textInputs.state.id));
  },

  /**
   * ### AccountProfileForm.getCityTxtIn()
   *
   * Returns the City text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCityTxtIn: function () {
    return element(by.id(this.locators.textInputs.city.id));
  },

  /**
   * ### AccountProfileForm.getZipCodeTxtIn()
   *
   * Returns the Zip Code text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getZipCodeTxtIn: function () {
    return element(by.id(this.locators.textInputs.zipCode.id));
  },

  /**
   * ### AccountProfileForm.getCommentTxtIn()
   *
   * Returns the Comment text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCommentTxtIn: function () {
    return element(by.id(this.locators.textInputs.comment.id));
  },

  /**
   * ### AccountProfileForm.getCancelBtn()
   *
   * Gets the Cancel button from Account Profile form.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  /**
   * ### AccountProfileForm.getUpdateBtn()
   *
   * Gets the Update button from Account Profile form.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getUpdateBtn: function () {
    return element(
      by.partialButtonText(this.locators.buttons.update.buttonText));
  },

  // ## Methods to interact with the User List Page components

  /**
   * ### AccountProfileForm.clearCompanyName()
   *
   * Clears the value from Company Name field.
   *
   * @returns {Object} Promise
   */
  clearCompanyName: function () {
    return this
      .getCompanyNameTxtIn()
      .clear();
  },

  /**
   * ### AccountProfileForm.clearFirstName()
   *
   * Clears the value from First Name field.
   *
   * @returns {Object} Promise
   */
  clearFirstName: function () {
    return this
      .getFirstNameTxtIn()
      .clear();
  },

  /**
   * ### AccountProfileForm.clearLastName()
   *
   * Clears the value from Last Name field.
   *
   * @returns {Object} Promise
   */
  clearLastName: function () {
    return this
      .getLastNameTxtIn()
      .clear();
  },

  /**
   * ### AccountProfileForm.clearPhoneNumber()
   *
   * Clears the value from PhoneNumber field.
   *
   * @returns {Object} Promise
   */
  clearPhoneNumber: function () {
    return this
      .getPhoneNumberTxtIn()
      .clear();
  },

  /**
   * ### AccountProfileForm.clearEmail()
   *
   * Clears the value from Email field.
   *
   * @returns {Object} Promise
   */
  clearEmail: function () {
    return this
      .getEmailTxtIn()
      .clear();
  },

  /**
   * ### AccountProfileForm.clearFirstAddress()
   *
   * Clears the value from First Address field.
   *
   * @returns {Object} Promise
   */
  clearFirstAddress: function () {
    return this
      .getFirstAddressTxtIn()
      .clear();
  },

  /**
   * ### AccountProfileForm.clearSecondAddress()
   *
   * Clears the value from Second Address field.
   *
   * @returns {Object} Promise
   */
  clearSecondAddress: function () {
    return this
      .getSecondAddressTxtIn()
      .clear();
  },

  /**
   * ### AccountProfileForm.clearState()
   *
   * Clears the value from State field.
   *
   * @returns {Object} Promise
   */
  clearState: function () {
    return this
      .getStateTxtIn()
      .clear();
  },

  /**
   * ### AccountProfileForm.clearCity()
   *
   * Clears the value from City field.
   *
   * @returns {Object} Promise
   */
  clearCity: function () {
    return this
      .getCityTxtIn()
      .clear();
  },

  /**
   * ### AccountProfileForm.clearZipCode()
   *
   * Clears the value from Zip Code field.
   *
   * @returns {Object} Promise
   */
  clearZipCode: function () {
    return this
      .getZipCodeTxtIn()
      .clear();
  },

  /**
   * ### AccountProfileForm.clearComment()
   *
   * Clears the value from Comment field.
   *
   * @returns {Object} Promise
   */
  clearComment: function () {
    return this
      .getCommentTxtIn()
      .clear();
  },
//////////////////////////
  /**
   * ### AccountProfileForm.setCompanyName()
   *
   * Introduces a value in the Company Name field.
   *
   * @returns {Object} Promise
   */
  setCompanyName: function (value) {
    return this
      .clearCompanyName()
      .sendKeys(value);
  },

  /**
   * ### AccountProfileForm.setFirstName()
   *
   * Introduces a value in the First Name field.
   *
   * @returns {Object} Promise
   */
  setFirstName: function (value) {
    return this
      .clearFirstName()
      .sendKeys(value);
  },

  /**
   * ### AccountProfileForm.setLastName()
   *
   * Introduces a value in the Last Name field.
   *
   * @returns {Object} Promise
   */
  setLastName: function (value) {
    return this
      .clearLastName()
      .sendKeys(value);
  },

  /**
   * ### AccountProfileForm.setPhoneNumber()
   *
   * Introduces a value in the PhoneNumber field.
   *
   * @returns {Object} Promise
   */
  setPhoneNumber: function (value) {
    return this
      .clearPhoneNumber()
      .sendKeys(value);
  },

  /**
   * ### AccountProfileForm.setEmail()
   *
   * Introduces a value in the Email field.
   *
   * @returns {Object} Promise
   */
  setEmail: function (value) {
    return this
      .clearEmail()
      .sendKeys(value);
  },

  /**
   * ### AccountProfileForm.setFirstAddress()
   *
   * Introduces a value in the First Address field.
   *
   * @returns {Object} Promise
   */
  setFirstAddress: function (value) {
    return this
      .clearFirstAddress()
      .sendKeys(value);
  },

  /**
   * ### AccountProfileForm.setSecondAddress()
   *
   * Introduces a value in the Second Address field.
   *
   * @returns {Object} Promise
   */
  setSecondAddress: function (value) {
    return this
      .clearSecondAddress()
      .sendKeys(value);
  },

  /**
   * ### AccountProfileForm.setCountry()
   *
   * Introduces/Selects a value in the Country field.
   *
   * @returns {Object} Promise
   */
  setCountry: function (value) {
    return this
      .getCountryDDown()
      .setValue(value);
  },

  /**
   * ### AccountProfileForm.setState()
   *
   * Introduces a value in the State field.
   *
   * @returns {Object} Promise
   */
  setState: function (value) {
    return this
      .clearState()
      .sendKeys(value);
  },

  /**
   * ### AccountProfileForm.setCity()
   *
   * Introduces a value in the City field.
   *
   * @returns {Object} Promise
   */
  setCity: function (value) {
    return this
      .clearCity()
      .sendKeys(value);
  },

  /**
   * ### AccountProfileForm.setZipCode()
   *
   * Introduces a value in the Zip Code field.
   *
   * @returns {Object} Promise
   */
  setZipCode: function (value) {
    return this
      .clearZipCode()
      .sendKeys(value);
  },

  /**
   * ### AccountProfileForm.setComment()
   *
   * Introduces a value in the Comment field.
   *
   * @returns {Object} Promise
   */
  setComment: function (value) {
    return this
      .clearComment()
      .sendKeys(value);
  },

  /**
   * ### AccountProfileForm.clickUpdate()
   *
   * Clicks `Update` button from form
   *
   * @returns {Object} Promise
   */
  clickUpdate: function () {
    return this
      .getUpdateBtn()
      .click();
  },

  /**
   * ### AccountProfileForm.clickCancel()
   *
   * Clicks `Cancel` button from form
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
   * ### AccountProfileForm.fill()
   *
   * Fills the form by handling all form elements from the view.
   */
  fill: function (data) {
    if (data.companyName) {
      this.setCompanyName(data.companyName);
    }
    if (data.firstName) {
      this.setFirstName(data.firstName);
    }
    if (data.lastName) {
      this.setLastName(data.lastName);
    }
    if (data.phoneNumber) {
      this.setPhoneNumber(data.phoneNumber);
    }
    if (data.contactEmail) {
      this.setEmail(data.contactEmail);
    }
    if (data.firstAddress) {
      this.setFirstAddress(data.firstAddress);
    }
    if (data.secondAddress) {
      this.setSecondAddress(data.secondAddress);
    }
    if (data.country) {
      this.setCountry(data.country);
    }
    if (data.state) {
      this.setState(data.state);
    }
    if (data.city) {
      this.setCity(data.city);
    }
    if (data.zipCode) {
      this.setZipCode(data.zipCode);
    }
    if (data.comment) {
      this.setComment(data.comment);
    }
  }
};

module.exports = AccountProfileForm;

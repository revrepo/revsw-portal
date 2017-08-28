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

// # Sign Up Page Object

// This `Sign Up` Page Object abstracts all operations or actions that a
// common user could do in the Sign Up page from the Portal app/site.
var SignUp = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    buttons: {
      cancel: {
        linkText: 'Back'
      },
      signUp: {
        buttonText: 'Sign Up'
      },
      didntReceive: {
        css: 'button.btn.btn-warning.pull-right'
      }
    },
    textInputs: {
      email: {
        id: 'email'
      },
      firstName: {
        id: 'firstName'
      },
      lastName: {
        id: 'lastName'
      },
      password: {
        id: 'password'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### SignUpForm.getEmailTxtIn()
   *
   * Returns the Email text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getEmailTxtIn: function () {
    return element(by.id(this.locators.textInputs.email.id));
  },

  /**
   * ### SignUpForm.getFirstNameTxtIn()
   *
   * Returns the First Name text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getFirstNameTxtIn: function () {
    return element(by.id(this.locators.textInputs.firstName.id));
  },

  /**
   * ### SignUpForm.getLastNameTxtIn()
   *
   * Returns the Last Name text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getLastNameTxtIn: function () {
    return element(by.id(this.locators.textInputs.lastName.id));
  },

  /**
   * ### SignUpForm.getPasswordTxtIn()
   *
   * Returns the Password text input.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPasswordTxtIn: function () {
    return element(by.id(this.locators.textInputs.password.id));
  },

  /**
   * ### SignUpForm.getCancelBtn()
   *
   * Gets the Cancel button from sign up form.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  /**
   * ### SignUpForm.getSignUpBtn()
   *
   * Gets the Sign Up button from sign up form.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getSignUpBtn: function () {
    return element(
      by.partialButtonText(this.locators.buttons.signUp.buttonText));
  },

  /**
   * ### SignUpForm.getDidntReceiveBtn()
   *
   * Gets the Didn't Receive button from sign up form.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getDidntReceiveBtn: function () {
    return element(
      by.css(this.locators.buttons.didntReceive.css));
  },

  // ## Methods to interact with the User List Page components

  /**
   * ### SignUpForm.setEmail()
   *
   * Introduces a value in the Email field.
   *
   * @returns {Object} Promise
   */
  setEmail: function (value) {
    return this
      .getEmailTxtIn()
      .sendKeys(value);
  },

  /**
   * ### SignUpForm.setFirstName()
   *
   * Introduces a value in the First Name field.
   *
   * @returns {Object} Promise
   */
  setFirstName: function (value) {
    return this
      .getFirstNameTxtIn()
      .sendKeys(value);
  },

  /**
   * ### SignUpForm.setLastName()
   *
   * Introduces a value in the Last Name field.
   *
   * @returns {Object} Promise
   */
  setLastName: function (value) {
    return this
      .getLastNameTxtIn()
      .sendKeys(value);
  },

  /**
   * ### SignUpForm.setPassword()
   *
   * Introduces a value in the Password field.
   *
   * @returns {Object} Promise
   */
  setPassword: function (value) {
    return this
      .getPasswordTxtIn()
      .sendKeys(value);
  },

  /**
   * ### SignUpForm.clickSignUp()
   *
   * Clicks `Sign Up` button from form
   *
   * @returns {Object} Promise
   */
  clickSignUp: function () {
    return this
      .getSignUpBtn()
      .click();
  },

  /**
   * ### SignUpForm.clickCancel()
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
   * ### SignUpForm.fill()
   *
   * Fills the form by handling all form elements from the view.
   *
   * @returns {Object} Promise
   */
  fill: function (data) {
    if (data.email) {
      this.setEmail(data.email);
    }
    if (data.firstName) {
      this.setFirstName(data.firstName);
    }
    if (data.lastName) {
      this.setLastName(data.lastName);
    }
    if (data.password) {
      this.setPassword(data.password);
    }
  }
};

module.exports = SignUp;

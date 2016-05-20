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
        linkText: 'Cancel'
      },
      signUp: {
        linkText: 'Sign Up'
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
   * ### PlansList.getSignInLnk()
   *
   * Returns the link Element that returns to the Sign In page.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getEmailTxtIn: function () {
    return element(by.id(this.locators.textInputs.email.id));
  },

  getFirstNameTxtIn: function () {
    return element(by.id(this.locators.textInputs.firstName.id));
  },

  getLastNameTxtIn: function () {
    return element(by.id(this.locators.textInputs.lastName.id));
  },

  getPasswordTxtIn: function () {
    return element(by.id(this.locators.textInputs.password.id));
  },

  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  getSignUpBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.signUp.linkText));
  },

  // ## Methods to interact with the User List Page components

  setEmail: function (value) {
    return this
      .getEmailTxtIn()
      .sendKeys(value);
  },

  setFirstName: function (value) {
    return this
      .getFirstNameTxtIn()
      .sendKeys(value);
  },

  setLastName: function (value) {
    return this
      .getLastNameTxtIn()
      .sendKeys(value);
  },

  setPassword: function (value) {
    return this
      .getPasswordTxtIn()
      .sendKeys(value);
  },

  // ## Helper Methods

  fill: function (data) {
    if (data.email) {
      this.set(data.email);
    }
    if (data.firstName) {
      this.set(data.firstName);
    }
    if (data.lastName) {
      this.set(data.lastName);
    }
    if (data.password) {
      this.set(data.password);
    }
  }
};

module.exports = SignUp;

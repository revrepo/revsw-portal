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

// # Login Page Object

// This `Login` Page Object abstracts all operations or actions that a
// common user could do in the User List page from the Portal app/site.
var Login = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    buttons: {
      signIn: {
        className: 'signin'
      },
      forgotPassword: {
        id: 'forgot_password'
      }
    },
    links: {
      signUp: {
        linkText: 'Sign Up'
      }
    },
    textInputs: {
      email: {
        model: 'email'
      },
      password: {
        model: 'pass'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### Login.getEmailTxtIn()
   *
   * Returns the reference to the `Email` text input field (Selenium WebDriver
   * Element) from the Login page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getEmailTxtIn: function () {
    return element(by.model(this.locators.textInputs.email.model));
  },

  /**
   * ### Login.getPasswordTxtIn()
   *
   * Returns the reference to the `Password` text input field (Selenium
   * WebDriver Element) from the Login page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPasswordTxtIn: function () {
    return element(by.model(this.locators.textInputs.password.model));
  },

  /**
   * ### Login.getSignInBtn()
   *
   * Returns the reference to the `Sign In` button (Selenium WebDriver
   * Element) from the Login page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getSignInBtn: function () {
    return element(by.className(this.locators.buttons.signIn.className));
  },

  /**
   * ### Login.getSignUpLnk()
   *
   * Returns the reference to the `Sign Un` link (Selenium WebDriver
   * Element) from the Login page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getSignUpLnk: function () {
    return element(by.partialLinkText(this.locators.links.signUp.linkText));
  },

  /**
   * ### Login.getForgotPasswordBtn()
   *
   * Returns the reference to the `Forgot Password?` button (Selenium WebDriver
   * Element) from the Login page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getForgotPasswordBtn: function () {
    return element(by.id(this.locators.buttons.forgotPassword.id));
  },

  // ## Methods to interact with the components from the Page Object

  /**
   * ### Login.setEmail()
   *
   * Sets a new value for the `Email` text input field
   *
   * @param {String} email
   *
   * @returns {Object} Promise
   */
  setEmail: function (email) {
    return this
      .getEmailTxtIn()
      .sendKeys(email);
  },

  /**
   * ### Login.setPassword()
   *
   * Sets a new value for the `Password` text input field
   *
   * @param {String} password
   *
   * @returns {Object} Promise
   */
  setPassword: function (password) {
    return this
      .getPasswordTxtIn()
      .sendKeys(password);
  },

  /**
   * ### Login.clickSignIn()
   *
   * Triggers a click on the `Sign In` button
   *
   * @returns {Object} Promise
   */
  clickSignIn: function () {
    return this
      .getSignInBtn()
      .click();
  },

  /**
   * ### Login.clickSignUp()
   *
   * Triggers a click on the `Sign Up` link
   *
   * @returns {Object} Promise
   */
  clickSignUp: function () {
    return this
      .getSignUpLnk()
      .click();
  },

  /**
   * ### Login.clickForgotPassword()
   *
   * Triggers a click on the `Forgot Password?` button
   *
   * @returns {Object} Promise
   */
  clickForgotPassword: function () {
    return this
      .getForgotPasswordBtn()
      .click();
  },

  // ## Helper Methods

  /**
   * ### Login.signIn()
   *
   * Helper method that executes all steps to Sign In a user in the Portal app.
   *
   * @param {Object} user with the following schema
   *
   *     {
   *        email: String,
   *        password: String
   *     }
   *
   * @returns {Promise}
   */
  signIn: function (user) {
    this.setEmail(user.email);
    this.setPassword(user.password);
    return this.clickSignIn();
  }
};

module.exports = Login;
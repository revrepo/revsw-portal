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

var BROWSER_WAIT_TIMEOUT = 16000;

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
    },
    dialogs: {
      forgotPassword: {
        css: 'div.modal-dialog.modal-md',
        textInputs: {
          email: {
            model: 'data.email'
          }
        },
        labels: {
          title: {
            css: 'h3.modal-title'
          }
        }
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### Login.getForgotPasswordDialog()
   *
   * Returns the reference to the `Forgot Password` dialog (Selenium WebDriver
   * Element) from the Login page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getForgotPasswordDialog: function () {
    return element(by.css(this.locators.dialogs.forgotPassword.css));
  },

  /**
   * ### Login.getYouStillNeedToConfirmDialog()
   *
   * Returns the reference to the `You Still Need To Confirm` dialog (Selenium WebDriver
   * Element) from the Login page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getYouStillNeedToConfirmDialog: function () {
    return element.all(by.css(this.locators.dialogs.forgotPassword.css))
      .get(1);
  },

  /**
   * ### Login.getRecoveryEmailTxtIn()
   *
   * Returns the reference to the `Recovery Email` TXT Input (Selenium WebDriver
   * Element) from the Login page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getRecoveryEmailTxtIn: function () {
    return this.getForgotPasswordDialog()
      .element(by.model(this.locators.dialogs.forgotPassword.textInputs.email.model));
  },

  /**
   * ### Login.getRecoveryDialogTitleLabel()
   *
   * Returns the reference to the `Recovery Dialog Title` label (Selenium WebDriver
   * Element) from the Login page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getRecoveryDialogTitleLabel: function () {
    return this.getYouStillNeedToConfirmDialog()
      .element(by.css(this.locators.dialogs.forgotPassword.labels.title.css));
  },

  /**
   * ### Login.getRecoveryDialogTitle()
   *
   * Returns the text from the `Recovery Dialog Title` label (Selenium WebDriver
   * Element) from the Login page from the Portal app.
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getRecoveryDialogTitle: function () {
    return this.getRecoveryDialogTitleLabel()
      .getText();
  },

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
      .clear()
      .sendKeys(email);
  },

  /**
   * ### Login.setRecoveryEmail()
   *
   * Sets a new value for the `Recovery Email` text input field
   *
   * @param {String} email
   *
   * @returns {Object} Promise
   */
  setRecoveryEmail: function (email) {
    return this
      .getRecoveryEmailTxtIn()
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
      .clear()
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
   * ### Login.waitToDisplay()
   *
   * Helper method that waits till Login Page is displayed
   *
   * @returns {Promise}
   */
  waitToDisplay: function () {
    var me = this;
    return browser.wait(function () {
      return browser.isElementPresent(
        by.model(me.locators.textInputs.email.model));
    }, BROWSER_WAIT_TIMEOUT);
  },

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

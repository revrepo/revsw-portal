/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2018] Rev Software, Inc.
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

// # User Form Page Object

// Requiring constant values
var Constants = require('./../constants');
var WebElement = require('./../../common/helpers/webElement');
var DropDownWidget = require('./../common/dropDownWidget');
var Permissions = require('./../common/permissions');

// This `User Form` Page Object abstracts all operations or actions that a
// common user could do in the Add User and Edit User page from the Portal
// app/site.
var UserForm = {

  permissions: Permissions,

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    textInputs: {
      email: {
        model: 'model.email'
      },
      firstName: {
        model: 'model.firstname'
      },
      lastName: {
        model: 'model.lastname'
      },
      password: {
        model: 'model.password'
      },
      passwordConfirm: {
        model: 'model.passwordConfirm'
      },
      company: {
        css: '#company .ui-select-search',
        option: {
          css: '.ui-select-highlight'
        }
      },
      comment: {
        model: 'model.comment'
      }
    },
    checkBoxes: {
      dashboard: {
        model: 'model.access_control_list.dashBoard'
      },
      reports: {
        model: 'model.access_control_list.reports'
      },
      configure: {
        model: 'model.access_control_list.configure'
      },
      test: {
        model: 'model.access_control_list.test'
      },
      readOnly: {
        model: 'model.access_control_list.readOnly'
      }
    },
    dropDowns: {
      role: {
        model: 'model.role'
      },
      company: {
        model: 'model.account_id',
        id: 'company'
      },
      domain: {
        model: 'model.domain'
      },
      group: {
        model: 'model.group'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### UserForm.getEmailTxtIn()
   *
   * Returns the reference to the `Email` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getEmailTxtIn: function () {
    return element(by.model(this.locators.textInputs.email.model));
  },

  /**
   * ### UserForm.getFirstNameTxtIn()
   *
   * Returns the reference to the `First Name` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getFirstNameTxtIn: function () {
    return element(by.model(this.locators.textInputs.firstName.model));
  },

  /**
   * ### UserForm.getLastNameTxtIn()
   *
   * Returns the reference to the `Last Name` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getLastNameTxtIn: function () {
    return element(by.model(this.locators.textInputs.lastName.model));
  },

  /**
   * ### UserForm.getRoleDDown()
   *
   * Returns the reference to the `Role` drop-down (Selenium WebDriver Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getRoleDDown: function () {
    return element(by.model(this.locators.dropDowns.role.model));
  },

  getGroupDDown: function () {
    return element(by.model(this.locators.dropDowns.group.model));
  },

  /**
   * ### UserForm.getCompanyDDown()
   *
   * Returns the reference to the `Company` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCompanyDDown: function () {
    return new DropDownWidget(by.id(this.locators.dropDowns.company.id));
  },

  /**
   * ### UserForm.getDomainDDown()
   *
   * Returns the reference to the `Domain` drop-down (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getDomainDDown: function () {
    return element(by.model(this.locators.dropDowns.domain.model));
  },

  /**
   * ### UserForm.getPasswordTxtIn()
   *
   * Returns the reference to the `Password` text field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPasswordTxtIn: function () {
    return element(by.model(this.locators.textInputs.password.model));
  },

  /**
   * ### UserForm.getPasswordConfirmTxtIn()
   *
   * Returns the reference to the `Password confirm` text field (Selenium
   * WebDriver Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getPasswordConfirmTxtIn: function () {
    return element(by.model(this.locators.textInputs.passwordConfirm.model));
  },

  /**
   * ### UserForm.getDashboardChBox()
   *
   * Returns the reference to the `Dashboard` checkbox (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getDashboardChBox: function () {
    return element(by.model(this.locators.checkBoxes.dashboard.model));
  },

  /**
   * ### UserForm.getReportsChBox()
   *
   * Returns the reference to the `Reports` checkbox (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getReportsChBox: function () {
    return element(by.model(this.locators.checkBoxes.reports.model));
  },

  /**
   * ### UserForm.()
   *
   * Returns the reference to the `getConfigureChBox` checkbox (Selenium
   * WebDriver Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getConfigureChBox: function () {
    return element(by.model(this.locators.checkBoxes.configure.model));
  },

  /**
   * ### UserForm.getTestChBox()
   *
   * Returns the reference to the `Test` checkbox (Selenium WebDriver Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getTestChBox: function () {
    return element(by.model(this.locators.checkBoxes.test.model));
  },

  /**
   * ### UserForm.getReadOnlyChBox()
   *
   * Returns the reference to the `REad only` checkbox (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getReadOnlyChBox: function () {
    return element(by.model(this.locators.checkBoxes.readOnly.model));
  },

    /**
   * ### UserForm.getCommentTxtIn()
   *
   * Returns the reference to the `Comment` input field (Selenium WebDriver
   * Element)
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCommentTxtIn: function () {
    return element(by.model(this.locators.textInputs.comment.model));
  },

  // ## Methods to interact with the User form components

  /**
   * ### UserForm.getEmail()
   *
   * Gets the current value set for Email
   *
   * @returns {Object} Promise
   */
  getEmail: function () {
    return this
      .getEmailTxtIn()
      .getAttribute('value');
  },

  /**
   * ### UserForm.getFirstName()
   *
   * Gets the current value set for First Name
   *
   * @returns {Object} Promise
   */
  getFirstName: function () {
    return this
      .getFirstNameTxtIn()
      .getAttribute('value');
  },

  /**
   * ### UserForm.getLastName()
   *
   * Gets the current value set for Last Name
   *
   * @returns {Object} Promise
   */
  getLastName: function () {
    return this
      .getLastNameTxtIn()
      .getAttribute('value');
  },

  /**
   * ### UserForm.getRole()
   *
   * Gets the current value set for Role
   *
   * @returns {Object} Promise
   */
  getRole: function () {
    return this
      .getRoleDDown()
      .$('option:checked')
      .getText();
  },

  /**
   * ### UserForm.getComment()
   *
   * Returns the text in the Comment input field
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getComment: function () {
    return this
    .getCommentTxtIn()
    .getAttribute('value');
  },

  /**
   * ### UserForm.setEmail()
   *
   * Sets a new value for `Email` text field
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
   * ### UserForm.setFirstName()
   *
   * Sets a new value for `First Name` text field
   *
   * @param {String} firstName
   *
   * @returns {Object} Promise
   */
  setFirstName: function (firstName) {
    this.clearFirstName();
    return this
      .getFirstNameTxtIn()
      .sendKeys(firstName);
  },

  /**
   * ### UserForm.setLastName()
   *
   * Sets a new value for `Last Name` text field
   *
   * @param {String} lastName
   *
   * @returns {Object} Promise
   */
  setLastName: function (lastName) {
    this.clearLastName();
    return this
      .getLastNameTxtIn()
      .sendKeys(lastName);
  },

  /**
   * ### UserForm.()
   *
   * Sets a new value for `Domain` drop-down
   *
   * @param {String} role
   *
   * @returns {Object} Promise
   */
  setRole: function (role) {
    return this
      .getRoleDDown()
      .element(by.cssContainingText('option', role))
      .click();
  },

  setGroup: function (group) {
    return this
      .getGroupDDown()
      .element(by.cssContainingText('option', group))
      .click();
  },

  getCompnayTxtIn: function () {
    return element(by.css(this.locators.textInputs.company.css));
  },

  getCompanyOption: function () {
    return element(by.css(this.locators.textInputs.company.option.css));
  },

  setCompanyTxt: function (value) {
    this.getCompanyDDown().click();
    this.getCompnayTxtIn().sendKeys(value);
    return this.getCompanyOption().click();
  },

  /**
   * ### UserForm.setCompany()
   *
   * Sets a new value for `Company` drop-down
   *
   * @param {String} companies, array of companies
   *
   * @returns {Object} Promise
   */
  setCompany: function (companies, reseller) {
    if (reseller === undefined) {
      for (var i = 0, len = companies.length; i < len; i++) {
        var company = companies[i];
        var option = this
          .getCompanyDDown()
          .setValue(company);
        if (i === len - 1) {
          return option;
        }
      }
    } else {
      return this.getCompanyDDown()
          .setValue(companies[0]);
    }
  },

  /**
   * ### UserForm.setDomain()
   *
   * Sets a new value for `Domain` drop-down
   *
   * @param {String} domains, array of domains
   *
   * @returns {Object} Promise
   */
  setDomain: function (domains) {
    for (var i = 0, len = domains.length; i < len; i++) {
      var domain = domains[i];
      var option = this
        .getDomainDDown()
        .element(by.cssContainingText('option', domain))
        .click();
      if (i === len - 1) {
        return option;
      }
    }
  },


  /**
   * ### UserForm.setDashboard()
   *
   * Checks/un-checks the `Dashboard` checkbox element
   *
   * @param {Boolean} checked, whether check or not the element
   * @returns {Object} Promise
   */
  setDashboard: function (checked) {
    return WebElement.changeCheckBox(this.getDashboardChBox(), checked);
  },

  /**
   * ### UserForm.setReports()
   *
   * Checks/un-checks the `Reports` checkbox element
   *
   * @param {Boolean} checked, whether check or not the element
   * @returns {Object} Promise
   */
  setReports: function (checked) {
    return WebElement.changeCheckBox(this.getReportsChBox(), checked);
  },

  /**
   * ### UserForm.setConfigure()
   *
   * Checks/un-checks the `Configure` checkbox element
   *
   * @param {Boolean} checked, whether check or not the element
   * @returns {Object} Promise
   */
  setConfigure: function (checked) {
    return WebElement.changeCheckBox(this.getConfigureChBox(), checked);
  },

  /**
   * ### UserForm.setTest()
   *
   * Checks/un-checks the `Test` checkbox element
   *
   * @param {Boolean} checked, whether check or not the element
   * @returns {Object} Promise
   */
  setTest: function (checked) {
    return WebElement.changeCheckBox(this.getTestChBox(), checked);
  },

  /**
   * ### UserForm.setReadOnly()
   *
   * Checks/un-checks the `Read Only` checkbox element
   *
   * @param {Boolean} checked, whether check or not the element
   * @returns {Object} Promise
   */
  setReadOnly: function (checked) {
    return WebElement.changeCheckBox(this.getReadOnlyChBox(), checked);
  },

  /**
   * ### UserForm.setPassword()
   *
   * Sets a new value for `Password` text field
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
   * ### UserForm.setPasswordConfirm()
   *
   * Sets a new value for `Password confirm` text field
   *
   * @param {String} password
   *
   * @returns {Object} Promise
   */
  setPasswordConfirm: function (password) {
    return this
      .getPasswordConfirmTxtIn()
      .clear()
      .sendKeys(password);
  },

  /**
   * ### UserForm.setAccessControls()
   *
   * Checks the `Access Controls` specified in an array
   *
   * @param {String} accessControls, array of `access controls` to check
   *
   * @returns {Object} Promise
   */
  setAccessControls: function (accessControls) {
    for (var i = 0, len = accessControls.length; i < len; i++) {
      var checkBox;
      var checked = true;
      var accessControl = accessControls[i];
      switch (accessControl) {
        case Constants.user.accessControls.DASHBOARD:
          checkBox = this.setDashboard(checked);
          break;
        case Constants.user.accessControls.REPORTS:
          checkBox = this.setReports(checked);
          break;
        case Constants.user.accessControls.CONFIGURE:
          checkBox = this.setConfigure(checked);
          break;
        case Constants.user.accessControls.TEST:
          checkBox = this.setTest(checked);
          break;
        case Constants.user.accessControls.READ_ONLY:
          checkBox = this.setReadOnly(checked);
          break;
        default:
        // none
      }
      if (i === len - 1) {
        return checkBox;
      }
    }
  },

    /**
   * ### UserForm.setComment()
   *
   * sets the text in the Comment input field
   *
   * @returns {Object} Selenium WebDriver Element
   */
  setComment: function (value) {
    this.getCommentTxtIn().clear();
    return this
    .getCommentTxtIn()
    .sendKeys(value);
  },

  /**
   * ### UserForm.clearEmail()
   *
   * Clears the current value set in the `Email` text field
   *
   * @returns {Object} Promise
   */
  clearEmail: function () {
    var me = this;
    return this
      .getEmailTxtIn()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        me
          .getEmailTxtIn()
          .sendKeys(backspaces);
      });
  },
  /**
   * ### UserForm.clearFirstName()
   *
   * Clears the current value set in the `First Name` text field
   *
   * @returns {Object} Promise
   */
  clearFirstName: function () {
    var me = this;
    return this
      .getFirstNameTxtIn()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        me
          .getFirstNameTxtIn()
          .sendKeys(backspaces);
      });
  },

  /**
   * ### UserForm.clearLastName()
   *
   * Clears the current value set in the `Last Name` text field
   *
   * @returns {Object} Promise
   */
  clearLastName: function () {
    var me = this;
    return this
      .getLastNameTxtIn()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        me
          .getLastNameTxtIn()
          .sendKeys(backspaces);
      });
  },

  /**
   * ### UserForm.clearPassword()
   *
   * Clears the current value set in the `Password` text field
   *
   * @returns {Object} Promise
   */
  clearPassword: function () {
    var me = this;
    return this
      .getPasswordTxtIn()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        me
          .getPasswordTxtIn()
          .sendKeys(backspaces);
      });
  },
  /**
   * ### UserForm.clearPasswordConfirm()
   *
   * Clears the current value set in the `Password Confirm` text field
   *
   * @returns {Object} Promise
   */
  clearPasswordConfirm: function () {
    var me = this;
    return this
      .getPasswordConfirmTxtIn()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        me
          .getPasswordConfirmTxtIn()
          .sendKeys(backspaces);
      });
  },
  // ## Helper Methods

  /**
   * ### UserForm.isDisplayed()
   *
   * Checks whether the User Form is displayed or not in the UI
   *
   * @returns {Object} Promise
   */
  isDisplayed: function () {
    return this
        .getEmailTxtIn()
        .isPresent() &&
      this
        .getFirstNameTxtIn()
        .isPresent() &&
      this
        .getLastNameTxtIn()
        .isPresent();
  },

  /**
   * ### UserForm.fill()
   *
   * Helper method that fills the User Form given specified user data object
   *
   * @param {object} user, user data with the following schema
   *
   *    {
   *        email: String,
   *        firstName, String,
   *        lastName, String,
   *        role, String,
   *        companies, [ String ],
   *        domains, [ String ],
   *        accessControls: [ String ],
   *        password: String,
   *        passwordConfirm: String
   *    }
   * 
   * @param {Boolean} skipRole skip role setting
   */
  fill: function (user) {
    if (user.email !== undefined) {
      this.setEmail(user.email);
    }
    if (user.firstName !== undefined) {
      this.setFirstName(user.firstName);
    }
    if (user.lastName !== undefined) {
      this.setLastName(user.lastName);
    }
    if (user.role !== undefined) {
      this.setRole(user.role);
    }
    if (user.company !== undefined) {
      this.setCompany(user.company, user.role === 'reseller' ? true : undefined);
    }

    if (user.permissions) {
      for (var prop in user.permissions) {
        this.permissions.setPermission(prop, user.permissions[prop]);
      }
    }
  },
    /**
   * ### UserForm.clear()
   *
   * Helper method that clear the User Form given not specified user data object
   *
   * @param {object} user, user who calls the methods "clears"
   *
   *    {
   *        email: String,
   *        firstName, String,
   *        lastName, String,
   *        role, String,
   *        companies, [ String ],
   *        domains, [ String ],
   *        accessControls: [ String ],
   *        password: String,
   *        passwordConfirm: String
   *    }
   */
  clear: function(user) {
    this.clearEmail();
    this.clearFirstName();
    this.clearLastName();
    if (user.role !== 'Admin') {
      this.setRole('--- Select Role ---');
      this.setGroup('--- Select Group ---');
    }    
    // clear specific data for differen roles
    if (!!user && (user.role === 'revadmin' || user.role === 'reseller')) {
      // TODO: check work for 'revadmin' and 'reseller'
      // this.setCompany([]);
      // this.setDomain([]);
    }
  }

};

module.exports = UserForm;

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
      name: {
        model: 'model.name'
      },
      comment: {
        model: 'model.comment'
      }
    },
    dropDowns: {
      company: {
        model: 'model.account_id',
        id: 'company'
      }
    }
  },

  getGroupNameTxtIn: function () {
    return element(by.model(this.locators.textInputs.name.model));
  },

  getCommentTxtIn: function () {
    return element(by.model(this.locators.textInputs.comment.model));
  },

  getAccountDDown: function () {
    return new DropDownWidget(by.model(this.locators.dropDowns.company.model));
  },

  getGroupName: function () {
    return this.getGroupNameTxtIn().getAttribute('value');
  },

  getComment: function () {
    return this.getCommentTxtIn().getText();
  },

  getAccount: function () {
    return this.getAccountDDown().getText();
  },

  setGroupName: function (val) {
    return this.getGroupNameTxtIn().sendKeys(val);
  },

  setComment: function (val) {
    return this.getCommentTxtIn().sendKeys(val);
  },

  setAccount: function (val) {
    return this.getAccountDDown().setValue(val);
  },

  clearGroupName: function () {
    return this.getGroupNameTxtIn().clear();
  },

  clearComment: function () {
    return this.getCommentTxtIn().clear();
  },

  clearAccount: function () {
    return this.getAccountDDown().setValue('');
  },

  isDisplayed: function () {
    return this.getGroupNameTxtIn().isDisplayed();
  },

  fill: function (group) {
    if (group.name) {
      this.setGroupName(group.name);
    }
    if (group.comment) {
      this.setComment(group.comment);
    }
    if (group.account) {
      this.setAccount(group.account);
    }
  },

  clear: function (user) {
    this.clearGroupName();
    this.clearComment();
  }

};

module.exports = UserForm;

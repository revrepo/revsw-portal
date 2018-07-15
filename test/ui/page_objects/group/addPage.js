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

// # Add User Page Object

// Requiring `user form` component page object
var GroupForm = require('./form');

// This `Add User` Page Object abstracts all operations or actions that a common
// user could do in the Add User page from the Portal app/site.
var AddGroup = {

  locators: {
    labels: {
      title: {
        className: 'page-title'
      }
    },
    buttons: {
      backToList: {
        linkText: 'Back To List'
      },
      createGroup: {
        css: '.btn-success',
        id: 'create_Group'
      },
      cancel: {
        linkText: 'Cancel'
      },
      leavePage: {
        linkText: 'Leave This Page'
      }
    }
  },

  form: GroupForm,

  getBackToListBtn: function () {
    return element(
      by.partialLinkText(this.locators.buttons.backToList.linkText));
  },

  getCreateGroupBtn: function () {
    return element(by.id(this.locators.buttons.createGroup.id));
  },

  getCancelBtn: function () {
    return element(by.partialLinkText(this.locators.buttons.cancel.linkText));
  },

  clickBackToList: function () {
    return this
      .getBackToListBtn()
      .click();
  },

  clickCreateGroup: function () {
    return this
      .getCreateGroupBtn()
      .click();
  },

  clickCancel: function () {
    return this
      .getCancelBtn()
      .click();
  },

  isDisplayed: function () {
    return this
      .getTitleLbl()
      .isPresent();
  },

  createGroup: function (group) {
    this.form.fill(group);
    return this.clickCreateGroup();
  }
};

module.exports = AddGroup;

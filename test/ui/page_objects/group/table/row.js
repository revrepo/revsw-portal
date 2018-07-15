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

var GroupTableRow = function (rowEl, locators) {

  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods
  this.getNameCell = function () {
    return this.rowEl.element(by.css(this.locators.groupName.css));
  };
  this.getName = function () {
    return this.getNameCell().getText();
  };

  this.getUsersCell = function () {
    return this.rowEl.element(by.css(this.locators.usersInGroup.css));
  };
  this.getUsers = function () {
    return this.getUsersCell().getText();
  };

  this.getLastUpdateCell = function () {
    return this.rowEl.element(by.css(this.locators.lastUpdate.css));
  };
  this.getLastUpdate = function () {
    return this.getLastUpdateCell().getText();
  };

  this.getUpdatedByCell = function () {
    return this.rowEl.element(by.css(this.locators.updatedBy.css));
  };
  this.getUpdatedBy = function () {
    return this.getUpdatedByCell().getText();
  };

  this.getAccountCell = function () {
    return this.rowEl.element(by.css(this.locators.account.css));
  };
  this.getAccount = function () {
    return this.getAccountCell().getText();
  };

  this.getEditBtn = function () {
    return this.rowEl.element(by.className(this.locators.actions.buttons.pencil.className));
  };
  this.getDeleteBtn = function () {
    return this.rowEl.element(by.className(this.locators.actions.buttons.trash.className));
  };

  this.clickEdit = function () {
    return this.getEditBtn().click();
  };

  this.clickDelete = function () {
    return this.getDeleteBtn().click();
  };
};

module.exports = GroupTableRow;

/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
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

var UserTableRow = function (rowEl, locators) {

  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods
  this.getRuleNameCell = function () {
    return this.rowEl.element(by.css(this.locators.ruleName.css));
  };

  this.getRuleDescriptionCell = function () {
    return this.rowEl.element(by.css(this.locators.ruleDescription.css));
  };
  //TODO: update and uncomment methods

  // this.getUpdateAtCell = function () {
  //   return this.rowEl.element(by.css(this.locators.updatedAt.css));
  // };

  this.getUpdatedByCell = function () {
    return this.rowEl.element(by.css(this.locators.updatedBy.css));
  };

  this.getAccountCell = function () {
    return this.rowEl.element(by.css(this.locators.accountLink.css));
  };

  this.getRuleName = function () {
    return this
      .getRuleNameCell()
      .getText();
  };

  this.getRuleDescription = function () {
    return this
      .getRuleDescriptionCell()
      .getText();
  };

  this.clickRuleName = function () {
    return this
      .getRuleNameCell()
      .click();
  };

  // this.clickLastUpdate = function () {
  //   return this
  //     .getLastUpdateCell()
  //     .click();
  // };

  // this.clickUpdatedBy = function () {
  //   return this
  //     .getUpdatedByCell()
  //     .click();
  // };
  if (this.locators.actions && this.locators.actions.buttons.pencil) {

    this.clickAccount = function () {
      return this
        .getAccountCell()
        .getText()
        .click();
    };

    this.getEditBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.pencil.className));
    };

    this.clickEdit = function () {
      return this
        .getEditBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.trash) {

    this.getDeleteBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.trash.className));
    };

    this.clickDelete = function () {
      return this
        .getDeleteBtn()
        .click();
    };
  }
};

module.exports = UserTableRow;

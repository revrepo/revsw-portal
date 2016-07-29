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

var ZoneRecordsTableRow = function (rowEl, locators) {

  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods to get reference to elements

  this.getRecordCell = function () {
    return this.rowEl.element(by.css(this.locators.record.css));
  };

  this.getTypeCell = function () {
    return this.rowEl.element(by.css(this.locators.type.css));
  };

  this.getAnswersCell = function () {
    return this.rowEl.element(by.css(this.locators.answers.css));
  };

  // Get values from cells

  this.getRecord = function () {
    return this
      .getRecordCell()
      .getText();
  };

  this.getType = function () {
    return this
        .getTypeCell()
        .getText();
  };

  this.getAnswers = function () {
    return this
        .getAnswersCell()
        .getText();
  };

  // Click on elements (either table head or table row)

  this.clickRecordCell = function () {
    return this
      .getRecordCell()
      .click();
  };

  this.clickTypeCell = function () {
    return this
        .getTypeCell()
        .click();
  };

  this.clickAnswersCell = function () {
    return this
        .getAnswersCell()
        .click();
  };

  if (this.locators.actions && this.locators.actions.buttons.pencil) {

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

module.exports = ZoneRecordsTableRow;

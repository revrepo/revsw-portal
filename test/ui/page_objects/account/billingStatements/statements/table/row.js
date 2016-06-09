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

var StatementTableRow = function (rowEl, locators) {

  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods
  this.getStatementCell = function () {
    return this.rowEl.element(by.css(this.locators.statement.css));
  };

  this.getDateCell = function () {
    return this.rowEl.element(by.css(this.locators.date.css));
  };

  this.getAmountCell = function () {
    return this.rowEl.element(by.css(this.locators.amount.css));
  };

  this.getSettledAtCell = function () {
    return this.rowEl.element(by.css(this.locators.settledAt.css));
  };

  this.getStatement = function () {
    return this
      .getStatementCell()
      .getText();
  };

  this.getDate = function () {
    return this
      .getDateCell()
      .getText();
  };

  this.getAmount = function () {
    return this
      .getAmountCell()
      .getText();
  };

  this.getSettledAt= function () {
    return this
      .getSettledAtCell()
      .getText();
  };
};

module.exports = StatementTableRow;

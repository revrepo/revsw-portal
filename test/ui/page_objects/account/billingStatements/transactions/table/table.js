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

var TransactionTableRow = require('./row');
var TransactionTableLocators = require('./locators');

var TransactionTable = {

  locators: TransactionTableLocators.table,

  getContainer: function () {
    return element.all(by.css(this.locators.container.css)).get(1);
  },

  getHeaderEl: function () {
    return this
      .getContainer()
      .element(by.css(this.locators.header.css));
  },

  getHeader: function () {
    var header = this.getHeaderEl();
    return new TransactionTableRow(header, TransactionTableLocators.header);
  },

  getRows: function () {
    return this
      .getContainer()
      .all(by.repeater(this.locators.rows.repeater));
  },

  getFirstRow: function () {
    return this.getRow(0);
  },

  getRow: function (rowIndex) {
    var el = this
      .getRows()
      .get(rowIndex);
    return new TransactionTableRow(el, TransactionTableLocators.row);
  }
};

module.exports = TransactionTable;

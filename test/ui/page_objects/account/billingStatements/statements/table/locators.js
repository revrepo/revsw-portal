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

var tableLocators = {
  header: {
    css: 'table.dataTable:nth-of-type(2) thead tr'
  },
  rows: {
    repeater: 'statement in statements'
  }
};

var headerLocators = {
  statement: {
    css: 'table.dataTable:nth-of-type(2) th:nth-of-type(1) a'
  },
  date: {
    css: 'table.dataTable:nth-of-type(2) th:nth-of-type(2) a'
  },
  amount: {
    css: 'table.dataTable:nth-of-type(2) th:nth-of-type(3) a'
  },
  settledAt: {
    css: 'table.dataTable:nth-of-type(2) th:nth-of-type(4) a'
  }
};

var rowLocators = {
  statement: {
    css: 'table.dataTable:nth-of-type(2) td:nth-of-type(1)'
  },
  date: {
    css: 'table.dataTable:nth-of-type(2) td:nth-of-type(2)'
  },
  amount: {
    css: 'table.dataTable:nth-of-type(2) td:nth-of-type(3)'
  },
  settledAt: {
    css: 'table.dataTable:nth-of-type(2) td:nth-of-type(4)'
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};

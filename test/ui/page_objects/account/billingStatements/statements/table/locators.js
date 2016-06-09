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
  container: {
    css: '.panel-body'
  },
  header: {
    css: 'thead tr'
  },
  rows: {
    repeater: 'statement in statements'
  }
};

var headerLocators = {
  statement: {
    css: 'th:nth-of-type(1) a'
  },
  date: {
    css: 'th:nth-of-type(2) a'
  },
  amount: {
    css: 'th:nth-of-type(3) a'
  },
  settledAt: {
    css: 'th:nth-of-type(4) a'
  }
};

var rowLocators = {
  statement: {
    css: 'td:nth-of-type(1)'
  },
  date: {
    css: 'td:nth-of-type(2)'
  },
  amount: {
    css: 'td:nth-of-type(3)'
  },
  settledAt: {
    css: 'td:nth-of-type(4)'
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};

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
    css: 'table thead tr'
  },
  rows: {
    repeater: 'item in $ctrl.orderRecords'
  }
};

var headerLocators = {
  name: {
    css: 'th:nth-of-type(1)'
  },
  type: {
    css: 'th:nth-of-type(2)'
  },
  description: {
    css: 'th:nth-of-type(3)'
  },
  updatedAt: {
    css: 'th:nth-of-type(4)'
  },
  status: {
    css: 'th:nth-of-type(5)'
  },
  actions: {
    css: 'th:nth-of-type(6)'
  },
  order: {
    css: 'th:nth-of-type(7)'
  },
  useThisRule: {
    css: 'th:nth-of-type(8)'
  }
};

var rowLocators = {
  name: {
    css: 'td:nth-of-type(1)'
  },
  type: {
    css: 'td:nth-of-type(2)'
  },
  description: {
    css: 'td:nth-of-type(3)'
  },
  updatedAt: {
    css: 'td:nth-of-type(4)'
  },
  status: {
    css: 'td:nth-of-type(5)'
  },
  actions: {
    css: 'td:nth-of-type(6)'
  },
  order: {
    css: 'td:nth-of-type(7)'
  },
  useThisRule: {
    css: 'td:nth-of-type(8) div.ats-switch'
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};
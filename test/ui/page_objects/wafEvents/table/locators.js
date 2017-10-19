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
    repeater: 'item in records'
  }
};

var headerLocators = {
  date: {
    css: 'th:nth-of-type(1) a'
  },
  url: {
    css: 'th:nth-of-type(2) a'
  },
  ipAddress: {
    css: 'th:nth-of-type(3) a'
  },
  requestZone: {
    css: 'th:nth-of-type(4) a'
  },
  triggredRuleID: {
    css: 'th:nth-of-type(5) a'
  }
};

var rowLocators = {
  date: {
    css: 'td:nth-of-type(1)'
  },
  url: {
    css: 'td:nth-of-type(2)'
  },
  ipAddress: {
    css: 'td:nth-of-type(3)'
  },
  requestZone: {
    css: 'td:nth-of-type(4)'
  },
  triggredRuleID: {
    css: 'td:nth-of-type(5)'
  },
  ipToolTip: {
    css: '.ipinfo'
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};

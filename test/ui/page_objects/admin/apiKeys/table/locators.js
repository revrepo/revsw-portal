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
    repeater: 'item in filteredRecords'
  }
};

var headerLocators = {
  name: {
    css: 'th:nth-of-type(1) a'
  },
  apiKey: {
    css: 'th:nth-of-type(2) a'
  },
  lastUpdate: {
    css: 'th:nth-of-type(3) a'
  },
  actions: {
    css: 'th:nth-of-type(4)'
  }
};

var rowLocators = {
  name: {
    css: 'td:nth-of-type(1)',
    links: {
      css: 'a'
    }
  },
  apiKey: {
    css: 'td:nth-of-type(2)'
  },
  lastUpdate: {
    css: 'td:nth-of-type(3)'
  },
  actions: {
    css: 'td:nth-of-type(4)',
    buttons: {
      pencil: {
        className: 'glyphicon-pencil'
      },
      trash: {
        className: 'glyphicon-trash'
      }
    }
  },
  account: {
    css: 'td:nth-of-type(5) a'
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};
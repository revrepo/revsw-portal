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
    repeater: 'record in filteredRecords'
  }
};

var headerLocators = {
  record: {
    css: 'th:nth-of-type(1) a'
  },
  type: {
    css: 'th:nth-of-type(2) a'
  },
  answers: {
    css: 'th:nth-of-type(3) a'
  }
};

var rowLocators = {
  record: {
    css: 'td:nth-of-type(1)'
  },
  type: {
    css: 'td:nth-of-type(2)'
  },
  answers: {
    css: 'td:nth-of-type(3)'
  },
  actions: {
    css: 'td.actions',
    buttons: {
      pencil: {
        className: 'glyphicon-pencil'
      },
      trash: {
        className: 'glyphicon-trash'
      }
    }
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};

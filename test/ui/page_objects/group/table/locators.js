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
    repeater: 'Group in filteredRecords'
  }
};

var headerLocators = {
  groupName: {
    css: 'th:nth-of-type(1) a'
  },
  usersInGroup: {
    css: 'th:nth-of-type(2) a'
  },
  lastUpdate: {
    css: 'th:nth-of-type(3) a'
  },
  updatedBy: {
    css: 'th:nth-of-type(4) a'
  },
  actions: {
    css: 'th:nth-of-type(5) a'
  },
  account: {
    css: 'th:nth-of-type(6) a'
  }
};

var rowLocators = {
  groupName: {
    css: 'td:nth-of-type(1)'
  },
  usersInGroup: {
    css: 'td:nth-of-type(2)'
  },
  lastUpdate: {
    css: 'td:nth-of-type(3)'
  },
  updatedBy: {
    css: 'td:nth-of-type(4)'
  },
  actions: {
    css: 'td:nth-of-type(5)',
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
    css: 'td:nth-of-type(6)'
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};

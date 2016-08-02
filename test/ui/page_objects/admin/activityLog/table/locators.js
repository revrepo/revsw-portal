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
    repeater: 'log in filteredRecords'
  }
};

var headerLocators = {
  dateTime: {
    css: 'th:nth-of-type(1) a'
  },
  user: {
    css: 'th:nth-of-type(2) a'
  },
  activityType: {
    css: 'th:nth-of-type(3) a'
  },
  activityTarget: {
    css: 'th:nth-of-type(4)'
  }
};

var rowLocators = {
  dateTime: {
    css: 'td:nth-of-type(1)',
    links: {
      css: 'a'
    }
  },
  user: {
    css: 'td:nth-of-type(2)'
  },
  activityType: {
    css: 'td:nth-of-type(3)'
  },
  activityTarget: {
    css: 'td:nth-of-type(4)',
    buttons: {
      plus: {
        className: 'glyphicon-plus-sign'
      }
    }
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};

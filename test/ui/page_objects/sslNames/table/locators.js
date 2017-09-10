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
  domainName: {
    css: 'th:nth-of-type(1) a'
  },
  verificationMethod: {
    css: 'th:nth-of-type(2) a'
  },
  lastUpdate: {
    css: 'th:nth-of-type(3) a'
  },
  updatedBy: {
    css: 'th:nth-of-type(4) a'
  },
  verificationStatus: {
    css: 'th:nth-of-type(5) a'
  },
  publishingStatus: {
    css: 'th:nth-of-type(6) a'
  },
  account: {
    css: 'th:nth-of-type(8) a'
  }
};

var rowLocators = {
  domainName: {
    css: 'td:nth-of-type(1)'
  },
  verificationMethod: {
    css: 'td:nth-of-type(2)'
  },
  lastUpdate: {
    css: 'td:nth-of-type(3)'
  },
  updatedBy: {
    css: 'td:nth-of-type(4)'
  },
  verificationStatus: {
    css: 'td:nth-of-type(5)'
  },
  publishingStatus:{
    css: 'td:nth-of-type(6)'
  },
  actions: {
    css: 'td:nth-of-type(7)',
    buttons: {
      verify: {
        className: 'glyphicon-check'
      },
      trash: {
        className: 'glyphicon-trash'
      }
    }
  },
  account: {
    css: 'td:nth-of-type(8) a'
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};

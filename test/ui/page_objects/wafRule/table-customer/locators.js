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
    css: '.waf-rules-list__customer table thead tr'
  },
  rows: {
    repeater: 'item in filteredRecords'
  }
};

var headerLocators = {
  ruleName: {
    css: 'th:nth-of-type(1) a'
  },
  ruleDescription: {
    css: 'th:nth-of-type(2) a'
  },
  updatedAt: {
    css: 'th:nth-of-type(3) a'
  },
  updatedBy: {
    css: 'th:nth-of-type(4) a'
  },
  usedByDomains: {
    css: 'th:nth-of-type(5)' // TODO: change to id or add class
  },
  status: {
    css: 'th:nth-of-type(6)'
  },
  actions: {
    css: 'th:nth-of-type(7)'
  },
  account: {
    css: 'th:nth-of-type(8) a'
  }
};

var rowLocators = {
  ruleName: {
    css: 'td:nth-of-type(1)'
  },
  ruleDescription: {
    css: 'td:nth-of-type(2)'
  },
  updatedAt: {
    css: 'td:nth-of-type(3)'
  },
  updatedBy: {
    css: 'td:nth-of-type(4)'
  },
  usedByDomains: {
    css: 'td:nth-of-type(5)'
  },
  status: {
    css: 'th:nth-of-type(6)'
  },

  actions: {
    css: '#waf-rules-list__custom td:nth-of-type(7)',
    buttons: {
      eye: {
        className: 'fa-eye'
      },
      pencil: {
        className: 'glyphicon-pencil'
      },
      duplicate: {
        className: 'fa-clone'
      },
      trash: {
        className: 'glyphicon-trash'
      }
    }
  },
  accountLink: {
    css: 'td:nth-of-type(8)'
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};

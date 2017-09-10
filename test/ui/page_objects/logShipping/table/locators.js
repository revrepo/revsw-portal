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
  jobName: {
    css: 'th:nth-of-type(1) a'
  },
  source: {
    css: 'th:nth-of-type(2) a'
  },
  sourceName: {
    css: 'th:nth-of-type(3) a'
  },
  destination: {
    css: 'th:nth-of-type(4) a'
  },
  host: {
    css: 'th:nth-of-type(5) a'
  },
  lastUpdate: {
    css: 'th:nth-of-type(6) a'
  },
  currentState: {
    css: 'th:nth-of-type(7) a'
  },
  account: {
    css: 'th:nth-of-type(8) a'
  }
};

var rowLocators = {
  jobName: {
    css: 'td:nth-of-type(1)'
  },
  source: {
    css: 'td:nth-of-type(2)'
  },
  sourceName: {
    css: 'td:nth-of-type(3)'
  },
  destination: {
    css: 'td:nth-of-type(4)'
  },
  host: {
    css: 'td:nth-of-type(5)'
  },
  lastUpdate:{
    css: 'td:nth-of-type(6)'
  },
  currentState: {
    css: 'td:nth-of-type(7)'
  },
  actions: {
    css: 'td.actions',
    buttons: {
      pencil: {
        className: 'glyphicon-pencil'
      },
      trash: {
        className: 'glyphicon-trash'
      },
      pause: {
        className: 'glyphicon-pause'
      },
      play: {
        className: 'glyphicon-play'
      },
      stop: {
        className: 'glyphicon-stop'
      }
    }
  },
  account: {
    css: 'td:nth-of-type(9) a'
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};

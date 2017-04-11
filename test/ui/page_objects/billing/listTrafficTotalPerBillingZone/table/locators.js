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
    repeater: '( zone, traffic ) in report.traffic_per_billing_zone'
  }
};

var headerLocators = {
  Zone: {
    css: 'th:nth-of-type(1) a'
  },
  Requests: {
    css: 'th:nth-of-type(2) a'
  },
  TrafficSent: {
    css: 'th:nth-of-type(3) a'
  },
  TrafficReceived: {
    css: 'th:nth-of-type(4) a'
  },
  BWSent: {
    css: 'th:nth-of-type(4) a'
  },
  BWReceived: {
    css: 'th:nth-of-type(4) a'
  }
};

var rowLocators = {
  Zone: {
    css: 'td:nth-of-type(1)'
  },
  Requests: {
    css: 'td:nth-of-type(2)'
  },
  TrafficSent: {
    css: 'td:nth-of-type(3)'
  },
  TrafficReceived: {
    css: 'td:nth-of-type(4)'
  },
  BWSent: {
    css: 'th:nth-of-type(4) a'
  },
  BWReceived: {
    css: 'th:nth-of-type(4) a'
  }
};

module.exports = {
  table: tableLocators,
  header: headerLocators,
  row: rowLocators
};

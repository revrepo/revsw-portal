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

var WAFEventsTableRow = function (rowEl, locators) {

  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods to get reference to elements
  this.getIPAddress = function () {
    return this.rowEl.element(by.css(this.locators.ipAddress.css));
  };

  this.getIPToolTip = function () {
    return this.rowEl.element(by.css(this.locators.ipToolTip.css));
  };
};

module.exports = WAFEventsTableRow;

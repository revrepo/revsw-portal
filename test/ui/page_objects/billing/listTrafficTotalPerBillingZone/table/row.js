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

var TableRow = function(rowEl, locators) {

  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods
  this.getZoneCell = function() {
    return this.rowEl.element(by.css(this.locators.Zone.css));
  };

  this.getRequestsCell = function() {
    return this.rowEl.element(by.css(this.locators.Requests.css));
  };

  this.getTrafficSentCell = function() {
    return this.rowEl.element(by.css(this.locators.TrafficSent.css));
  };

  this.getTrafficReceivedCell = function() {
    return this.rowEl.element(by.css(this.locators.TrafficReceived.css));
  };

  this.getBWSentCell = function() {
    return this.rowEl.element(by.css(this.locators.BWSent.css));
  };

  this.getBWReceivedCell = function() {
    return this.rowEl.element(by.css(this.locators.BWReceived.css));
  };


  this.getZone = function() {
    return this
      .getZoneCell()
      .getText();
  };

  this.getRequests = function() {
    return this
      .getRequestsCell()
      .getText();
  };

  this.getTrafficSent = function() {
    return this
      .getTrafficSentCell()
      .getText();
  };

  this.getTrafficReceived = function() {
    return this
      .getTrafficReceivedCell()
      .getText();
  };

  this.getBWSent = function() {
    return this
      .getBWSentCell()
      .getText();
  };

  this.getBWReceived = function() {
    return this
      .getBWReceivedCell()
      .getText();
  };
};

module.exports = TableRow;

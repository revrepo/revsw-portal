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

var dnsZonesTableRow = function (rowEl, locators) {

  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods to get reference to elements

  this.getZoneNameCell = function () {
    return this.rowEl.element(by.css(this.locators.zoneName.css));
  };

  this.getNumOfRecordsCell = function () {
    return this.rowEl.element(by.css(this.locators.numOfRecords.css));
  };

  this.getDNSServersCell = function () {
    return this.rowEl.element(by.css(this.locators.dnsServers.css));
  };

  this.getLastUpdateCell = function () {
    return this.rowEl.element(by.css(this.locators.lastUpdate.css));
  };

  this.getUpdatedByCell = function () {
    return this.rowEl.element(by.css(this.locators.updatedBy.css));
  };

  this.getAccountCell = function () {
    return this.rowEl.element(by.css(this.locators.account.css));
  };

  // Get values from cells

  this.getZoneName = function () {
    return this
      .getZoneNameCell()
      .getText();
  };

  this.getNumOfRecords = function () {
    return this
      .getNumOfRecordsCell()
      .getText();
  };

  this.getDNSServers = function () {
    return this
      .getDNSServersCell()
      .getText();
  };

  this.getLastUpdate = function () {
    return this
      .getLastUpdateCell()
      .getText();
  };

  this.getUpdatedBy = function () {
    return this
      .getUpdatedByCell()
      .getText();
  };

  this.getAccount = function () {
    return this
      .getAccountCell()
      .getText();
  };


  // Click on elements (either table head or table row)

  this.clickZoneName = function () {
    return this
      .getZoneNameCell()
      .click();
  };

  this.clickNumOfRecords = function () {
    return this
      .getNumOfRecordsCell()
      .click();
  };

  this.clickDNSServers = function () {
    return this
      .getDNSServersCell()
      .click();
  };

  this.clickLastUpdate = function () {
    return this
      .getLastUpdateCell()
      .click();
  };

  this.clickUpdatedBy = function () {
    return this
      .getUpdatedByCell()
      .click();
  };

  if (this.locators.actions && this.locators.actions.buttons.pencil) {

    this.clickAccount = function () {
      return this
        .getAccountCell()
        .getText()
        .click();
    };

    this.getEditBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.pencil.className));
    };

    this.clickEdit = function () {
      return this
        .getEditBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.trash) {

    this.getDeleteBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.trash.className));
    };

    this.clickDelete = function () {
      return this
        .getDeleteBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.stats) {

    this.getStatsBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.stats.className));
    };

    this.clickStats = function () {
      return this
        .getStatsBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.manageRecords) {

    this.getManageRecordsBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.manageRecords.className));
    };

    this.clickManageRecords = function () {
      return this
        .getManageRecordsBtn()
        .click();
    };
  }
};

module.exports = dnsZonesTableRow;

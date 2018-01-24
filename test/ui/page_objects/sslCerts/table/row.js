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

var SSLCertTableRow = function (rowEl, locators) {

  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods to get reference to elements

  this.getCertNameCell = function () {
    return this.rowEl.element(by.css(this.locators.certName.css));
  };

  this.getDomainsCell = function () {
    return this.rowEl.element(by.css(this.locators.domains.css));
  };

  this.getCertTypeCell = function () {
    return this.rowEl.element(by.css(this.locators.certType.css));
  };

  this.getExpiresAtCell = function () {
    return this.rowEl.element(by.css(this.locators.expiresAt.css));
  };

  this.getLastUpdateCell = function () {
    return this.rowEl.element(by.css(this.locators.lastUpdate.css));
  };

  this.getAccountCell = function (role) {
    if (role !== undefined) {
      if (role === 'Rev Admin') {
        return this.rowEl.element(by.css(this.locators.account.css));
      } else if (role === 'Reseller') {
        return this.rowEl.element(by.css(this.locators.accountReseller.css));
      } else {
        return this.rowEl.element(by.css(this.locators.account.css));
      }
    }
  };

  // Get values from cells

  this.getCertName = function () {
    return this
      .getCertNameCell()
      .getText();
  };

  this.getDomains = function () {
    return this
      .getDomainsCell()
      .getText();
  };

  this.getCertType = function () {
    return this
      .getCertTypeCell()
      .getText();
  };

  this.getExpiresAt = function () {
    return this
      .getExpiresAtCell()
      .getText();
  };

  this.getLastUpdate = function () {
    return this
      .getLastUpdateCell()
      .getText();
  };

  this.getAccount = function (role) {
    return this
      .getAccountCell(role)
      .getText();
  };

  // Click on elements (either table head ot table row)

  this.clickCertName = function () {
    return this
      .getCertNameCell()
      .click();
  };

  this.clickDomains = function () {
    return this
      .getDomainsCell()
      .click();
  };

  this.clickCertType = function () {
    return this
      .getCertTypeCell()
      .click();
  };

  this.clickExpiresAt = function () {
    return this
      .getExpiresAtCell()
      .click();
  };

  this.clickLastUpdate = function () {
    return this
      .getLastUpdateCell()
      .click();
  };

  this.clickAccount = function (role) {
    return this
      .getAccountCell(role)
      .click();
  };

  if (this.locators.actions && this.locators.actions.buttons.pencil) {

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
};

module.exports = SSLCertTableRow;

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

var SSLNamesTableRow = function (rowEl, locators) {

  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods to get reference to elements

  this.getDomainNameCell = function () {
    return this.rowEl.element(by.css(this.locators.domainName.css));
  };

  this.getVerificationMethodCell = function () {
    return this.rowEl.element(by.css(this.locators.verificationMethod.css));
  };

  this.getLastUpdateCell = function () {
    return this.rowEl.element(by.css(this.locators.lastUpdate.css));
  };

  this.getUpdatedByCell = function () {
    return this.rowEl.element(by.css(this.locators.updatedBy.css));
  };

  this.getVerificationStatusCell = function () {
    return this.rowEl.element(by.css(this.locators.verificationStatus.css));
  };

  this.getPublishingStatusCell = function () {
    return this.rowEl.element(by.css(this.locators.publishingStatus.css));
  };

  this.getAccountCell = function () {
    return this.rowEl.element(by.css(this.locators.account.css));
  };

  // Get values from cells

  this.getDomainName = function () {
    return this
      .getDomainNameCell()
      .getText();
  };

  this.getVerificationMethod = function () {
    return this
      .getVerificationMethodCell()
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

  this.getVerificationStatus = function () {
    return this
      .getVerificationStatusCell()
      .getText();
  };

  this.getPublishingStatus = function () {
    return this
      .getPublishingStatusCell()
      .getText();
  };

  // Click on elements (either table head ot table row)

  this.clickDomainName = function () {
    return this
      .getDomainNameCell()
      .click();
  };

  this.clickVerificationMethod = function () {
    return this
      .getVerificationMethodCell()
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

  this.clickVerificationStatus = function () {
    return this
      .getVerificationStatusCell()
      .click();
  };

  this.clickPublishingStatus = function () {
    return this
      .getPublishingStatusCell()
      .click();
  };

  if (this.locators.actions && this.locators.actions.buttons.verify) {

    this.getVerifyBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.verify.className));
    };

    this.clickVerify = function () {
      return this
        .getVerifyBtn()
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

module.exports = SSLNamesTableRow;

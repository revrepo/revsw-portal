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

var KeyTableRow = function (rowElem, locators) {

  // Properties
  this.rowElem = rowElem;
  this.locators = locators;

  // Methods
  this.getNameCell = function () {
    return this.rowElem.element(by.css(this.locators.name.css));
  };

  this.getNameLink = function () {
    return this.getNameCell().element(by.css(this.locators.name.links.css));
  };

  this.getApiKeyCell = function () {
    return this.rowElem.element(by.css(this.locators.apiKey.css));
  };

  this.getLastUpdatedCell = function () {
    return this.rowElem.element(by.css(this.locators.lastUpdate.css));
  };

  this.getName = function () {
    return this
      .getNameCell()
      .getText();
  };

  this.getApiKey = function () {
    return this
      .getApiKeyCell()
      .getText();
  };

  this.getLastUpdate = function () {
    return this
      .getLastUpdatedCell()
      .getText();
  };


  if (this.locators.actions && this.locators.actions.buttons.pencil) {

    this.getEditBtn = function () {
      return this.rowElem
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
      return this.rowElem
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

module.exports = KeyTableRow;
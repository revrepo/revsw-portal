/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2018] Rev Software, Inc.
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
var WebElement = require('./../../../common/helpers/webElement');

var DomainTableRow = function (rowEl, locators) {

  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods
  this.getNameCell = function () {
    return this.rowEl.element(by.css(this.locators.name.css));
  };

  this.getNameLink = function () {
    return this.getNameCell().element(by.css(this.locators.name.links.css));
  };

  this.getUseThisRuleCell = function () {
    return this.rowEl.element(by.css(this.locators.useThisRule.css));
  };

  this.clickUseThisRule = function (flaggie) {
    var el;
    if (flaggie) {
      el = this.rowEl.element(by.css('td:nth-of-type(8)'));
    } else {
      el = this.getUseThisRuleCell();
    }
    WebElement.scrollToElement(el);
    return el.click();
  };
};

module.exports = DomainTableRow;

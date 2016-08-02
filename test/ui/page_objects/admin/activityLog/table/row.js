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

var ActivityLogTableRow = function (rowElem, locators) {

  // Properties
  this.rowElem = rowElem;
  this.locators = locators;

  // Methods
  this.getDateTimeCell = function () {
    return this.rowElem.element(by.css(this.locators.dateTime.css));
  };

  this.getUserCell = function () {
    return this.rowElem.element(by.css(this.locators.user.css));
  };

  this.getActivityTargetCell = function () {
    return this.rowElem.element(by.css(this.locators.activityTarget.css));
  };

  this.getUser = function () {
    return this
      .getUserCell()
      .getText();
  };

  this.getUser = function () {
    return this
      .getUserCell()
      .getText();
  };

  this.getActivityTarget = function () {
    return this
      .getActivityTargetCell()
      .getText();
  };



  // if (this.locators.actions && this.locators.actions.buttons.pencil) {
  if (this.locators.activityTarget) {

    this.getShowDetailsBtn = function () {
      return this.rowElem
        .element(by.css(this.locators.activityTarget.css))
        .element(by.className(this.locators.activityTarget.buttons.plus.className));
    };

    this.clickShowDetails = function () {
      return this
        .getShowDetailsBtn()
        .click();
    };
  }

};

module.exports = ActivityLogTableRow;

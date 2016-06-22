/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2015] Rev Software, Inc.
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

// # Date Range Picker Page Object

var DateRangePicker = function (index) {

  // ## Properties
  this.index = index;

  // Locators specific to HTML elements from this page object
  this.locators = {
    container: {
      css: '.daterangepicker',
      textInputs: {
        startRange: {
          css: '[name="daterangepicker_start"]'
        },
        endRange: {
          css: '[name="daterangepicker_end"]'
        }
      },
      buttons: {
        apply: {
          css: '.range_inputs .btn-success'
        },
        customRange: {
          css: '.ranges li'
        }
      }
    }
  };

  // ## Methods

  this.getContainerEl = function () {
    return element
      .all(by.css(this.locators.container.css))
      .get(this.index);
  };

  this.getCustomRangeBtn = function () {
    return this
      .getContainerEl()
      .all(by.css(this.locators.container.buttons.customRange.css))
      .get(3);
  };

  this.getStartDateTxtIn = function () {
    return this
      .getContainerEl()
      .element(by.css(this.locators.container.textInputs.startRange.css));
  };

  this.getEndDateTxtIn = function () {
    return this
      .getContainerEl()
      .element(by.css(this.locators.container.textInputs.endRange.css));
  };

  this.getApplyBtn = function () {
    return this
      .getContainerEl()
      .element(by.css(this.locators.container.buttons.apply.css));
  };

  this.setStartDate = function (strDate) {
    var me = this;
    return me
      .getStartDateTxtIn()
      .clear()
      .then(function () {
        return me
          .getStartDateTxtIn()
          .sendKeys(strDate);
      });
  };

  this.setEndDate = function (strDate) {
    var me = this;
    return me
      .getEndDateTxtIn()
      .clear()
      .then(function () {
        return me
          .getEndDateTxtIn()
          .sendKeys(strDate);
      });
  };

  this.clickApply = function () {
    return this
      .getApplyBtn()
      .click();
  };

  /**
   * ### Dialog.clickCancel()
   *
   * Triggers a click action on the `Cancel` button fro the Modal Dialog
   * component
   *
   * @returns {Promise}
   */
  this.setCustomRange = function (startDate, endDate) {
    var me = this;
    return me
      .getCustomRangeBtn()
      .click()
      .then(function () {
        me.setStartDate(startDate);
        me.setEndDate(endDate);
        return me.clickApply();
      });
  };
};

module.exports = DateRangePicker;

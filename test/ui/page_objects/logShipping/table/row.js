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

var LogShippingTableRow = function (rowEl, locators) {

  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods to get reference to elements

  this.getJobNameCell = function () {
    return this.rowEl.element(by.css(this.locators.jobName.css));
  };

  this.getSourceCell = function () {
    return this.rowEl.element(by.css(this.locators.source.css));
  };

  this.getSourceNameCell = function () {
    return this.rowEl.element(by.css(this.locators.sourceName.css));
  };

  this.getDestinationCell = function () {
    return this.rowEl.element(by.css(this.locators.destination.css));
  };

  this.getHostCell = function () {
    return this.rowEl.element(by.css(this.locators.host.css));
  };

  this.getLastUpdateCell = function () {
    return this.rowEl.element(by.css(this.locators.lastUpdate.css));
  };

  this.getCurrentStateCell = function () {
    return this.rowEl.element(by.css(this.locators.currentState.css));
  };

  this.getAccountCell = function () {
    return this.rowEl.element(by.css(this.locators.account.css));
  };

  // Get values from cells

  this.getJobName = function () {
    return this
      .getJobNameCell()
      .getText();
  };

  this.getSource = function () {
    return this
        .getSourceCell()
        .getText();
  };

  this.getSourceName = function () {
    return this
        .getSourceNameCell()
        .getText();
  };

  this.getDestination = function () {
    return this
        .getDestinationCell()
        .getText();
  };

  this.getHost = function () {
    return this
        .getHostCell()
        .getText();
  };

  this.getLastUpdate = function () {
    return this
        .getLastUpdateCell()
        .getText();
  };

  this.getCurrentState = function () {
    return this
        .getCurrentStateCell()
        .getText();
  };

  this.getAccount = function () {
    return this
        .getAccountCell()
        .getText();
  };

  // Click on elements (either table head or table row)

  this.clickJobName = function () {
    return this
      .getJobNameCell()
      .click();
  };

  this.clickSource = function () {
    return this
        .getSourceCell()
        .click();
  };

  this.clickSourceName = function () {
    return this
        .getSourceNameCell()
        .click();
  };

  this.clickDestination = function () {
    return this
        .getDestinationCell()
        .click();
  };

  this.clickHost = function () {
    return this
        .getHostCell()
        .click();
  };

  this.clickLastUpdate = function () {
    return this
        .getLastUpdateCell()
        .click();
  };

  this.clickCurrentState = function () {
    return this
        .getCurrentStateCell()
        .click();
  };

  this.clickAccount = function () {
    return this
        .getAccountCell()
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

  if (this.locators.actions && this.locators.actions.buttons.pause) {

    this.getPauseBtn = function () {
      return this.rowEl
          .element(by.css(this.locators.actions.css))
          .element(by.className(this.locators.actions.buttons.pause.className));
    };

    this.clickPause = function () {
      return this
          .getPauseBtn()
          .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.play) {

    this.getPlayBtn = function () {
      return this.rowEl
          .element(by.css(this.locators.actions.css))
          .element(by.className(this.locators.actions.buttons.play.className));
    };

    this.clickPlay = function () {
      return this
          .getPlayBtn()
          .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.stop) {

    this.getStopBtn = function () {
      return this.rowEl
          .element(by.css(this.locators.actions.css))
          .element(by.className(this.locators.actions.buttons.stop.className));
    };

    this.clickStop = function () {
      return this
          .getStopBtn()
          .click();
    };
  }
};

module.exports = LogShippingTableRow;

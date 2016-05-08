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

var CompanyTableRow = function (rowElem, locators) {

  // Properties
  this.rowElem = rowElem;
  this.locators = locators;

  // Methods
  this.getCompanyNameCell = function () {
    return this.rowElem.element(by.css(this.locators.companyName.css));
  };

  this.getCompanyNameLink = function () {
    return this
      .getCompanyNameCell()
      .element(by.css(this.locators.companyName.links.css));
  };

  this.getCreatedAtCell = function () {
    return this.rowElem.element(by.css(this.locators.createdAt.css));
  };

  this.getCreatedByCell = function () {
    return this.rowElem.element(by.css(this.locators.createdBy.css));
  };

  this.getSubscriptionStateCell = function () {
    return this.rowElem.element(by.css(this.locators.subscriptionState.css));
  };

  this.getBillingPlanCell = function () {
    return this.rowElem.element(by.css(this.locators.billingPlan.css));
  };

  this.getLastUpdateCell = function () {
    return this.rowElem.element(by.css(this.locators.lastUpdate.css));
  };

  this.getCompanyName = function () {
    return this
      .getCompanyNameCell()
      .getText();
  };

  this.getCreatedAt = function () {
    return this
      .getCreatedAtCell()
      .getText();
  };

  this.getCreatedBy = function () {
    return this
      .getCreatedByCell()
      .getText();
  };

  this.getSubscriptionState = function () {
    return this
      .getSubscriptionStateCell()
      .getText();
  };

  this.getBillingPlan = function () {
    return this
      .getBillingPlanCell()
      .getText();
  };

  this.getLastUpdate = function () {
    return this
      .getLastUpdateCell()
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

  if (this.locators.actions && this.locators.actions.buttons.cog) {

    this.getConfigureBtn = function () {
      return this.rowElem
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.cog.className));
    };

    this.clickConfigure = function () {
      return this
        .getConfigureBtn()
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


  if (this.locators.actions && this.locators.actions.buttons.stats) {

    this.getStatsBtn = function () {
      return this.rowElem
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.stats.className));
    };

    this.clickStats = function () {
      return this
        .getStatsBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons.book) {

    this.getVersionsBtn = function () {
      return this.rowElem
        .element(by.css(this.locators.actions.css))
        .element(by.className(this.locators.actions.buttons.book.className));
    };

    this.clickVersions = function () {
      return this
        .getVersionsBtn()
        .click();
    };
  }

};

module.exports = CompanyTableRow;
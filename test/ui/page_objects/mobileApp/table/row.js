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

var AppTableRow = function (rowEl, locators) {
  /*jshint maxstatements: 120 */
  // Properties
  this.rowEl = rowEl;
  this.locators = locators;

  // Methods
  this.getNameCell = function () {
    return this.rowEl.element(by.css(this.locators.name.css));
  };

  this.getNameLink = function () {
    return this
      .getNameCell()
      .element(by.css(this.locators.name.links.css));
  };

  this.getPlatformCell = function () {
    return this.rowEl.element(by.css(this.locators.platform.css));
  };

  this.getVersionCell = function () {
    return this.rowEl.element(by.css(this.locators.version.css));
  };

  this.getLastUpdateCell = function () {
    return this.rowEl.element(by.css(this.locators.lastUpdate.css));
  };

  this.getSDKKeyCell = function () {
    return this.rowEl.element(by.css(this.locators.sdkKey.css));
  };

  this.getStatusCell = function () {
    return this.rowEl.element(by.css(this.locators.status.css));
  };

  this.getActionsCell = function () {
    return this.rowEl.element(by.css(this.locators.actions.css));
  };

  this.getAccountCell = function () {
    return this.rowEl.element(by.css(this.locators.account.css));
  };

  this.getStagingStatusIcon = function () {
    return this
      .getStatusCell()
      .element(by.css(this.locators.status.icons.staging.css));
  };

  this.getPublishedStagingStatusIcon = function () {
    return this
      .getStatusCell()
      .element(by.css(this.locators.status.icons.staging.type.published.css));
  };

  this.getErrorStagingStatusIcon = function () {
    return this
      .getStatusCell()
      .element(by.css(this.locators.status.icons.staging.type.error.css));
  };

  this.getInProgressStagingStatusIcon = function () {
    return this
      .getStatusCell()
      .element(by.css(this.locators.status.icons.staging.type.inProgress.css));
  };

  this.getGlobalStatusIcon = function () {
    return this
      .getStatusCell()
      .element(by.css(this.locators.status.icons.global.css));
  };

  this.getPublishedGlobalStatusIcon = function () {
    return this
      .getStatusCell()
      .element(by.css(this.locators.status.icons.global.type.published.css));
  };

  this.getModifiedGlobalStatusIcon = function () {
    return this
      .getStatusCell()
      .element(by.css(this.locators.status.icons.global.type.modified.css));
  };

  this.getErrorGlobalStatusIcon = function () {
    return this
      .getStatusCell()
      .element(by.css(this.locators.status.icons.global.type.error.css));
  };

  this.getInProgressGlobalStatusIcon = function () {
    return this
      .getStatusCell()
      .element(by.css(this.locators.status.icons.global.type.inProgress.css));
  };

  this.getName = function () {
    return this
      .getNameCell()
      .getText();
  };

  this.getPlatform = function () {
    return this
      .getPlatformCell()
      .getText();
  };

  this.getVersion = function () {
    return this
      .getVersionCell()
      .getText();
  };

  this.getLastUpdate = function () {
    return this
      .getLastUpdateCell()
      .getText();
  };

  this.getAccount = function () {
    return this
      .getAccountCell()
      .getText();
  };

  this.clickName = function () {
    return this
      .getName()
      .click();
  };

  this.clickVersion = function () {
    return this
      .getVersionCell()
      .click();
  };

  this.clickLastUpdate = function () {
    return this
      .getLastUpdateCell()
      .click();
  };

  this.clickAccount = function () {
    return this.getAccountCell()
      .click();
  };

  this.getSortorderName = function () {
    return this.rowEl.element(by.css(this.locators.sortorder.name.css));
  };

  if (this.locators.sortorder){
    var me = this;
    this.sortByName = function(order){
      var sortorder =  this.getSortorderName();
      if (!order) {
        order = 'asc';
      }
      return sortorder.isDisplayed()
        .then(function(isVisible){
          if(isVisible){
            return sortorder.getAttribute('class')
              .then(function(classes){
                var currOrder = 'asc';
                var classes = classes.split(' ');
                if (classes.indexOf('reverse') > -1){
                  currOrder = 'des'
                };
                if(currOrder !== order){
                  return me.getName()
                    .click();
                }
              });
          }else{
            if(order == 'des'){
              return me.getName()
                .click()
                .getName()
                .click();
            }else{
              return me.getName()
                .click();
            }
          }
        });
    }
  }
  if (this.locators.actions && this.locators.actions.buttons &&
    this.locators.actions.buttons.pencil) {

    this.clickAccount = function () {
      return this.getAccountCell()
        .getText()
        .click();
    };

    this.getEditBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.css(this.locators.actions.buttons.pencil.css));
    };

    this.clickEdit = function () {
      return this
        .getEditBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons &&
    this.locators.actions.buttons.cog) {

    this.getConfigureBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.css(this.locators.actions.buttons.cog.css));
    };

    this.clickConfigure = function () {
      return this
        .getConfigureBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons &&
    this.locators.actions.buttons.trash) {

    this.getDeleteBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.css(this.locators.actions.buttons.trash.css));
    };

    this.clickDelete = function () {
      return this
        .getDeleteBtn()
        .click();
    };
  }


  if (this.locators.actions && this.locators.actions.buttons &&
    this.locators.actions.buttons.stats) {

    this.getStatsBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.css(this.locators.actions.buttons.stats.css));
    };

    this.clickStats = function () {
      return this
        .getStatsBtn()
        .click();
    };
  }

  if (this.locators.actions && this.locators.actions.buttons &&
    this.locators.actions.buttons.book) {

    this.getVersionsBtn = function () {
      return this.rowEl
        .element(by.css(this.locators.actions.css))
        .element(by.css(this.locators.actions.buttons.book.css));
    };

    this.clickVersions = function () {
      return this
        .getVersionsBtn()
        .click();
    };
  }

};

module.exports = AppTableRow;

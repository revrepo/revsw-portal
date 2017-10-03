/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
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

var SubsTable = require('./table/table');
var Searcher = require('./../../common/searcher');
var Pager = require('./../../common/pager');

var Subscriptions = {

  table: SubsTable,
  searcher: Searcher,
  pager: Pager,

  locators: {
    views: {
      container: '.container-fluid .row',
      panelHeading: '.col-md-12 .panel .panel-heading',
      panelBody: '.col-md-12 .panel .panel-body',
      viewModal: {
        container: '.modal-dialog',
        buttons: {
          close: '.btn-primary'
        }
      },
      statusModal: {
        container: '.modal-dialog',
        buttons: {
          cancel: '.btn-info',
          save: '.btn-success'
        },
        select: '.ui-select-container'
      }
    },
    labels: {
      title: {
        className: 'page-title'
      }
    }
  },

  getViewModal: function () {
    return element(by.css(this.locators.views.viewModal.container));
  },

  getViewCloseBtn: function () {
    return this.getViewModal()
      .element(by.css(this.locators.views.viewModal.buttons.close));
  },

  clickViewCloseBtn: function () {
    return this.getViewCloseBtn().click();
  },

  getStatusModal: function () {
    return element(by.css(this.locators.views.statusModal.container));
  },

  getStatusDropDown: function () {
    return element(by.css(this.locators.views.statusModal.select));
  },

  getStatusCancelBtn: function () {
    return this.getStatusModal()
      .element(by.css(this.locators.views.statusModal.buttons.cancel));
  },

  getStatusSaveBtn: function () {
    return this.getStatusModal()
      .element(by.css(this.locators.views.statusModal.buttons.save));
  },

  clickStatusCancelBtn: function () {
    return this.getStatusCancelBtn().click();
  },

  clickStatusSaveBtn: function () {
    return this.getStatusSaveBtn().click();
  },

  getSortOrder: function () {
    return element.all(by.css(this.locators.selects.css.sortOrder));
  },

  getViewButton: function () {
    return element.all(by.css(this.locators.buttons.css.viewButton));
  },

  clickViewButton: function () {
    return this.getViewButton().get(0).click();
  },

  getChangeStatus: function () {
    return element.all(by.css(this.locators.buttons.css.changeStatus));
  },

  clickChangeStatus: function () {
    return this.getChangeStatus().get(0).click();
  },

  getSearchTxtIn: function () {
    return element(by.id(this.locators.textInputs.search.id));
  },

  getSubscriptionItems: function () {
    return element.all(by.css(this.locators.selects.css.subscriptionItems));
  },

  getTextItem: function () {
    return element(by.css(this.locators.selects.css.textItem));
  },

  getViewPopup: function () {
    return element(by.css(this.locators.popups.css.viewPopup));
  },

  getCloseButton: function () {
    return element(by.css(this.locators.buttons.css.closeButton));
  },

  clickCloseButton: function () {
    return this.getCloseButton().click();
  },

  getStatusPopup: function () {
    return element(by.css(this.locators.popups.css.statusPopup));
  },

  getStatusDrop: function () {
    return element(by.css(this.locators.dropDowns.css.statusDrop));
  },

  getCancelButton: function () {
    return element(by.css(this.locators.buttons.css.cancelButton));
  },

  clickCancelButton: function () {
    return this.getCancelButton().click();
  },

  getSaveButton: function () {
    return element(by.css(this.locators.buttons.css.saveButton));
  }



};

module.exports = Subscriptions;







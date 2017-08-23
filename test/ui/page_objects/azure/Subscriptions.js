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

var Subscriptions = {


  locators: {
    selects: {
      css: {
        openMenu: 'table th col-sm-5>a',
        sortOrder: 'span.sortorder',
        subscriptionItems: 'a[ngclick="goToResources(item.id)"]',
        textItem: 'h2.page-title'

      }
    },
     buttons: {
       css: {
        viewButton: 'a[ng-click="onViewSubscription($event,item)"]',
        changeStatus: 'a[ng-click="openChangeStatusDialog(item)"]',
        closeButton: 'button[ng-click="ok()"]',
        cancelButton: 'button[ng-click="cancel()"]',
        saveButton: 'button[ng-click="ok(editCurrentSubscriptionState)"]',
        

       }
    },
     textInputs: {
        search: {
         id: 'search' 
       }
    },
  
     popups: {
      css: {       
       viewPopup: 'div[uib-modal-transclude]',
       statusPopup: 'div[uib-modal-transclude]'
       } 
    },
    dropDowns: {
      css: {
         statusDrop: 'span[ng-hide="$select.isEmpty()"]'
       }
    },
  },


  getOpenMenu: function() {
     return element.all(by.css(this.locators.selects.css.openMenu));    
  },


  getSortOrder: function() {
     return element.all(by.css(this.locators.selects.css.sortOrder));    
  },



  getViewButton: function() {
     return element.all(by.css(this.locators.buttons.css.viewButton));  
  },


  getChangeStatus: function(){
      return  element.all(by.css(this.locators.buttons.css.changeStatus));  
  
  },

  getSearchTxtIn: function(){
      return  element(by.id(this.locators.textInputs.search.id)); 
  },


  getSubscriptionItems: function(){
     return element.all(by.css(this.locators.selects.css.subscriptionItems)); 
  },

  getTextItem: function(){
    return element(by.css(this.locators.selects.css.textItem)); 
  },

  getViewPopup: function(){
    return element(by.css(this.locators.popups.css.viewPopup)); 
  },

  getCloseButton: function(){
    return element(by.css(this.locators.buttons.css.closeButton)); 
  },

  getStatusPopup: function(){
   return element(by.css(this.locators.popups.css.statusPopup)); 
  },

  getStatusDrop: function(){
   return element(by.css(this.locators.dropDowns.css.statusDrop)); 
  },

  getCancelButton: function(){
    return element(by.css(this.locators.buttons.css.cancelButton)); 
  },

  getSaveButton: function(){
    return element(by.css(this.locators.buttons.css.saveButton)); 
  }



};

module.exports = Subscriptions;





  

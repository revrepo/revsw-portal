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

var ResourcesPerSubscription = {


  locators: {
    selects: {
      css: {
       sortOrder:'table tr th',
       sortOrderActive:'th[aria-sort="ascending"]',
       comboBoxSearch: 'input[ng-model="$select.search"]',
       subscriptionItems: 'td.ng-binding' 
      }
    },
     buttons: {
       css: {
       viewButton: 'a[ng-click="onViewResourceSubscription($event,item)"]', 
       backButton: 'a[ng-disabled="_loading"]',
       closeButton: 'button[ng-click="ok()"]'    

       }
     },
     textInputs: {
        css: {
         searchInput: 'input[type="search"]' 
       }
    },
     popups: {
      css: {       
       viewPopup: 'div[uib-modal-transclude]'  
       } 
    }, 
     dropDowns: {
        css: {
          listSubscriptions: 'a[ng-click="$select.toggle($event)"]',
          secondSubscription: '.ui-select-container li'
        }
     },
  },
 

  getSortOrderActive: function(){
    return element(by.css(this.locators.selects.css.sortOrderActive));
  },

  getSortOrder: function(){
    return element.all(by.css(this.locators.selects.css.sortOrder));
  },

  getViewButton: function(){
    return element.all(by.css(this.locators.buttons.css.viewButton));
  },

  getSearchInput: function(){
    return element(by.css(this.locators.textInputs.css.searchInput)); 
  },

  getBackButton: function(){
    return element(by.css(this.locators.buttons.css.backButton));
  },

  getListSubscriptions: function(){
    return element(by.css(this.locators.dropDowns.css.listSubscriptions));
  },

  getSecondSubscription: function(){
    return element.all(by.css(this.locators.dropDowns.css.secondSubscription));
  },

  getComboBoxSearch: function(){
    return element(by.css(this.locators.selects.css.comboBoxSearch));
  },
  
  getSubscriptionItems: function(){
    return element.all(by.css(this.locators.selects.css.subscriptionItems));
  },

  getViewPopup: function(){
    return element(by.css(this.locators.popups.css.viewPopup));
  },

  getCloseButton: function(){
    return element(by.css(this.locators.buttons.css.closeButton));
  }



  };

module.exports = ResourcesPerSubscription;
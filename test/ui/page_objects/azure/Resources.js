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

var Resources = {


  locators: {
    selects: {
      css: {
       resourceName: '.table>thead>tr>th>a',
       sortsOrder: 'span.sortorder',
       resourcesItems: 'tr[ng-click="saveAnchorScrollIndex($index)"]', 
      }
    },
     buttons: {
       css: {
       viewButton: 'a[ng-click="onViewResource($event,item)"]',
       backButton: 'a[ng-disabled="_loading"]',
       closeButton: 'button[ng-click="ok()"]' ,
       firstButton: 'a[ng-click="goToPage(1)"]',
       previousButton: 'a[ng-click="prevPage()"]',
       oneButton: 'li:nth-child(3)',
       twoButton:  'li:nth-child(4)',
       nextButton: 'a[ng-click="nextPage()"]',
       lastButton: 'a[ng-click="goToPage(page.pages.length)"]'   
       }
     },
     textInputs: {
        search: {
         id: 'search' 
       }
    },
     popups: {
      css: {       
       viewPopup: 'div[uib-modal-transclude]'  
       } 
    }, 
  },

  getResourceName: function(){
    return element.all(by.css(this.locators.selects.css.resourceName));
  },

  clickResourceName: function(){
    return this.getResourceName().get(0).click();
  },

  getSortsOrder: function(){
    return element.all(by.css(this.locators.selects.css.sortsOrder));
  },

  getViewButton: function(){
    return element.all(by.css(this.locators.buttons.css.viewButton));
  },
 
  clickViewButton: function(){
    return this.getViewButton().get(0).click();
  },
  getSearchTxtIn: function(){
    return  element(by.id(this.locators.textInputs.search.id)); 
  },
  
  getBackButton: function(){
    return element(by.css(this.locators.buttons.css.backButton));
  },

  getResourcesItems: function(){
    return element.all(by.css(this.locators.selects.css.resourcesItems));
  },

  getviewPopup: function(){
    return element(by.css(this.locators.popups.css.viewPopup));
  },

  getCloseButton: function(){
    return element(by.css(this.locators.buttons.css.closeButton));
  },

  clickCloseButton: function(){
    return this.getCloseButton().click();
  },

  getFirstButton: function(){
    return element.all(by.css(this.locators.buttons.css.firstButton));
  },

  getPreviousButton: function(){
    return element.all(by.css(this.locators.buttons.css.previousButton));
  },

  getOneButton: function(){
    return element.all(by.css(this.locators.buttons.css.oneButton));
  },

  getTwoButton: function(){
    return element.all(by.css(this.locators.buttons.css.twoButton));
  },

  getNextButton: function(){
    return element.all(by.css(this.locators.buttons.css.nextButton));
  },

  getLastButton: function(){
    return element.all(by.css(this.locators.buttons.css.lastButton));
  }
 

};



module.exports = Resources;

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

var ImageEngine = {


  locators: {
    selects: {
      css: {
        filterPerformance: 'div[imageengine-solidgauge-performance-improvement] select.form-control',
        filterBandwidth: 'div[imageengine-linechart-bytes-saved] select.form-control',
        filterFormatResolution: 'div.clearfix_ select.form-control' ,
        comboBoxSearch: 'input[ng-model="$select.search"]' 
      }   
    },
     buttons: {
       css: {
           updateReport: 'button[ng-click="updateFilters() "]',
           chartContextMenu: 'g[style="cursor:default;"]',
           hideMenu:  '#menuToggleBtn' 

       }
     },
     dropDowns: {
        css: {
          listDomains: '#domain a[ng-click="$select.toggle($event)"]'
        }
    },
  },

  getFilterPerformance: function() {
     return element.all(by.css(this.locators.selects.css.filterPerformance));    
  },

  getFilterBandwidth: function() {
     return element.all(by.css(this.locators.selects.css.filterBandwidth));    
  },

  getFilterFormatResolution: function() {
     return element.all(by.css(this.locators.selects.css.filterFormatResolution));    
  },

  getUpdateReport: function(){
     return  element.all(by.css(this.locators.buttons.css.updateReport));  
  },


  getChartContextMenu: function(){
     return  element.all(by.css(this.locators.buttons.css.chartContextMenu));  
  },

  getComboBoxSearch: function(){
     return  element(by.css(this.locators.selects.css.comboBoxSearch)); 
  },

  getListDomains: function(){
     return  element(by.css(this.locators.dropDowns.css.listDomains)); 
  },

  clickListDomains: function() {
     return this.getListDomains().click();    
  },

  getHideMenu: function(){
     return  element(by.css(this.locators.buttons.css.hideMenu)); 
  }

  };

module.exports = ImageEngine;


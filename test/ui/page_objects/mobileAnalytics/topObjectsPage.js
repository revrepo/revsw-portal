/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Rev Software, Inc. and its suppliers,
 * if any.  The intellectual and technical concepts cosntained
 * herein are proprietary to Rev Software, Inc.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Rev Software, Inc.
 */

// # TopObjects Page Object

// This `TopObjects` Page Object abstracts all operations or actions
// that a common TopObjects could do in the Portal app/site.
var TopObjects = {
  locators: {
    views: {
      container: '.container-fluid .row',
	  },
    tabs: {
      css: '.nav-tabs > li'
    },
    headers: {
      css: '.nav-tabs > li:last-child'
    },
  },
  getTopTabs: function () {
    return element
	  .all(by.css(this.locators.tabs.css));
  },
  getTabTopObjectsWith5XXErrorCodes: function () {
    return this.getTopTabs()
	  .get(6);
  },
  clickTabTopObjectsWith5XXErrorCodes: function () {
	this.getTabTopObjectsWith5XXErrorCodes()
	  .click();
  },
  getTopTabsHeader: function () {
	return element(by.css(this.locators.headers.css))
  },
   getTopTabsHeaderText: function () {
	return this.getTopTabsHeader()
      .getText();
  },
  getTitleLbl: function() {
    return element
      .all(by.css(this.locators.views.container))
      .get(0);
  },
  getTitle: function () {
    return this.getTitleLbl()
      .getText();
  }
};

module.exports = TopObjects;

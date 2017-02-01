
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

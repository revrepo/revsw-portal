
var TrafficLevels = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row',
	},
	dropDowns: {
      companyName: {
         css: '.select2-choice.ui-select-match'
      },
	  chartFilters: {
		css: '.form-inline .form-control'
	  }
    },
	selectSearch: {
      textBox: '$select.search'
    },
	buttons: {
      updateReport: {
        css: '.btn.btn-info'
	  },
	  chartContextMenu: {
		css: '.highcharts-button'
	  }
    },
	contextMenu: {
		css: '.highcharts-contextmenu div div'
	}
  },
  
   /**
   * ### TrafficLevels.getChartContextMenu()
   *
   * Returns the ref to 'ChartContextMenu'
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getChartContextMenu: function () {
    return element
	  .all(by.css(this.locators.contextMenu.css));
  },

   /**
   * ### TrafficLevels.getChartContextMenuBtn()
   *
   * Returns the ref to 'ChartContextMenu' Btn
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getChartContextMenuBtn: function () {
    return element(by.css(this.locators.buttons.chartContextMenu.css));
  },
  
   /**
   * ### TrafficLevels.getUpdateReportBtn()
   *
   * Returns the ref to 'updateReport' Btn
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getUpdateReportBtn: function () {
    return element.all(by.css(this.locators.buttons.updateReport.css)).get(0);
  },
  
   /**
   * ### TrafficLevels.getFilters()
   *
   * Returns the ref to 'chartFilters' ddown
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getFilters: function() {
	return element
	  .all(by.css(this.locators.dropDowns.chartFilters.css));
  },
  
   /**
   * ### TrafficLevels.selectFilterDay()
   *
   * Selects the option '7' in Chart Filter Day
   *
   * @returns {Object} Selenium WebDriver Element
   */
  selectFilterDay: function() {
	return element(by.cssContainingText('option', '7'))
	  .click();
  },
  
   /**
   * ### TrafficLevels.selectFilterDay()
   *
   * Selects the option 'Cellurar' in Chart Filter Network
   *
   * @returns {Object} Selenium WebDriver Element
   */
  selectFilterNetwork: function() {
     return element(by.cssContainingText('option', 'Cellular'))
	   .click();
  },
  
   /**
   * ### TrafficLevels.selectCompanyName(companyName)
   *
   * Selects the 'Company Name' in Company Name field
   *
   * @returns {Object} Selenium WebDriver Element
   */
  selectCompanyName: function (companyName) {
    this.clickSelectCompanyName();
    this.clickSelectSearchCompanyName();
    this.setSelectSearchCompanyName(companyName);
  },
  
   /**
   * ### TrafficLevels.clickSelectCompanyName()
   *
   * Performs click on 'CompanyName' Ddown
   *
   * @returns {Object} Selenium WebDriver Element
   */
  clickSelectCompanyName: function () {
    return this.getCompanyNameDDown()
      .click();
  },
  
   /**
   * ### TrafficLevels.clickSelectSearchCompanyName()
   *
   * Performs click on 'SelectSearch' Input textBox
   *
   * @returns {Object} Selenium WebDriver Element
   */
  clickSelectSearchCompanyName: function () {
    return this.getSelectSearchInput()
      .click();
  },
  
   /**
   * ### TrafficLevels.getSelectSearchInput()
   *
   * Returns the ref to 'textBox' selectSearch
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getSelectSearchInput: function () {
    return element(by.model(this.locators.selectSearch.textBox));
  },
  
  /**
   * ### TrafficLevels.setSelectSearchCompanyName()
   *
   * Sets the value for 'textBox' selectSearch
   *
   * @returns {Promise}
   */
  setSelectSearchCompanyName: function (companyName) {
    return this.getSelectSearchInput()
      .sendKeys(companyName)
      .sendKeys(protractor.Key.ENTER);
  },
  
  
  /**
   * ### TrafficLevels.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the TrafficLevels page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function() {
    return element
      .all(by.css(this.locators.views.container))
      .get(0);
  },

 
  /**
   * ### TrafficLevels.getTitle()
   *
   * Gets the title from `TrafficLevels` Page.
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  },
  
   /**
   * ### TrafficLevels.getCompanyNameDDown()
   *
   * Returns the ref to 'companyName' ddown
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getCompanyNameDDown: function () {
    return element(by.css(this.locators.dropDowns.companyName.css));
  }
};

module.exports = TrafficLevels;

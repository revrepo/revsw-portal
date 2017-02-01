
var TrafficDistributions = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row',
	}
  },

  /**
   * ### TrafficDistributions.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the TrafficDistributions page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function() {
    return element
      .all(by.css(this.locators.views.container))
      .get(0);
  },

  /**
   * ### TrafficDistributions.getTitle()
   *
   * Gets the title from `TrafficDistributions` Page.
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  }
};

module.exports = TrafficDistributions;

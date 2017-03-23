

// # TopReports Page Object

// This `TopReports` Page Object abstracts all operations or actions
// that a common TopReports could do in the Portal app/site.
var TopReports = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    views: {
      container: '.container-fluid .row',
	}
  },

  /**
   * ### TopReports.getTitleLbl()
   *
   * Returns the reference to the `Title` label element (Selenium WebDriver
   * Element) from the TopReports page from the Portal app.
   *
   * @returns {Selenium WebDriver Element}
   */
  getTitleLbl: function() {
    return element
      .all(by.css(this.locators.views.container))
      .get(0);
  },

  /**
   * ### TopReports.getTitle()
   *
   * Gets the title from `TopReports` Page.
   *
   * @returns {Promise}
   */
  getTitle: function () {
    return this
      .getTitleLbl()
      .getText();
  }
};

module.exports = TopReports;

/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
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

// # Global Searcher Page Object

// This `Searcher` Page Object abstracts all operations or actions that a common
// user could do with the Global Filter component from Portal app.
var GlobalSearcher = {

  // ## Properties

  // Locators specific to HTML elements from this page object
  locators: {
    container: {
      css: 'search'
    },
    textInputs: {
      searchCriteria: {
        model: 'searchTerm'
      }
    },
    buttons: {
      reset: {
        css: 'i.glyphicon-remove'
      }
    }
  },

  // ## Methods to retrieve references to UI elements (Selenium WebDriver
  // Element)

  /**
   * ### GlobalSearcher.getContainerEl()
   *
   * Returns the container element for the Global Searcher component
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getContainerEl: function () {
    return element(by.css(this.locators.container.css));
  },

  /**
   * ### GlobalSearcher.getSearchCriteriaTxtIn()
   *
   * Returns the reference to the filter `Text Field` from the Global Searcher
   * component
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getSearchCriteriaTxtIn: function () {
    return this
      .getContainerEl()
      .element(by.model(this.locators.textInputs.searchCriteria.model));
  },

  /**
   * ### GlobalSearcher.getResetBtn()
   *
   * Returns the reference to the `Reset` button from the Global Searcher
   * component
   *
   * @returns {Object} Selenium WebDriver Element
   */
  getResetBtn: function () {
    return this
      .getContainerEl()
      .element(by.css(this.locators.buttons.reset.css));
  },

  // ## Methods to interact with the Searcher/Filter component

  /**
   * ### GlobalSearcher.setSearchCriteria()
   *
   * Filters (types a search criteria) in the filter `text field`.
   *
   * @param {String} criteria, the filter criteria
   *
   * @returns {Object} Promise
   */
  setSearchCriteria: function (criteria) {
    return this
      .getSearchCriteriaTxtIn()
      .sendKeys(criteria);
  },

  /**
   * ### GlobalSearcher.getSearchCriteria()
   *
   * Returns the current search criteria set in the filter `text field`
   * from the Global Searcher component
   *
   * @returns {Object} Promise
   */
  getSearchCriteria: function () {
    return this
      .getSearchCriteriaTxtIn()
      .getAttribute('value');
  },

  /**
   * ### GlobalSearcher.clearSearchCriteria()
   *
   * Types required times the BACKSPACE key in order to delete the current
   * search criteria written in the `text field` from the Global Searcher
   * component
   *
   * @returns {Object} Promise
   */
  clearSearchCriteria: function () {
    var me = this;
    return this
      .getSearchCriteriaTxtIn()
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        return me
          .getSearchCriteriaTxtIn()
          .sendKeys(backspaces);
      });
  },

  /**
   * ### GlobalSearcher.clickReset()
   *
   * Triggers a click in the `reset` button from the Global Searcher component
   *
   * @returns {Promise}
   */
  clickReset: function () {
    return this
      .getResetBtn()
      .click();
  }
};

module.exports = GlobalSearcher;

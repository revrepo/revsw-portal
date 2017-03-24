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

// # WebElement object

// `WebElement` object that has definitions of methods for specific operations that
// could be done over any HTML Web element.
var WebElement = {

  /**
   * Clears the text set in the given input web element
   *
   * @param textInput, Selenium WebDriver Element
   * @returns {Object} Promise
   */
  clearTextInput: function (textInput) {
    return textInput
      .getAttribute('value').then(function (text) {
        var len = text.length;
        var delChars = new Array(len + 1).join(protractor.Key.DELETE);
        var backspaces = new Array(len + 1).join(protractor.Key.BACK_SPACE);
        return textInput.sendKeys(delChars + backspaces);
      });
  },
  /**
   * Scroll to the top a web element by id
   *
   * @param string, Selenium WebDriver Element
   * @returns {Object} Promise
   */
  scrollToElementById: function(id){
    return  browser.executeScript('arguments[0].scrollIntoView(true);',
     element(by.id(id)).getWebElement());
  },

   /**
   * Scroll to the top a given web element
   *
   * @param string, Selenium WebDriver Element
   * @returns {Object} Promise
   */
  scrollToElement: function(element_){
    return  browser.executeScript('arguments[0].scrollIntoView(true);',
      element_.getWebElement());
  }
};

module.exports = WebElement;

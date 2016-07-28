/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2015] Rev Software, Inc.
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

// # Staging Env Page Object

// This `Staging Env` Page Object abstracts all operations or actions that
// a common Staging Env could do in the Portal app/site.
var StagingEnv = {

    // ## Properties

    // Locators specific to HTML elements from this page object
    locators: {
        container: '.container-fluid .row',
        panelBody: '.col-md-12 .panel .panel-body',
        labels:{
            stagingServer: {
                css: 'p.ng-binding'
            },
            strings: {
                css: 'pre.console.ng-binding'
            }
        }
    },

    /**
     * ### StagingEnv.getStagingServerLbl()
     *
     * Returns the reference to the `Staging Server` label element (Selenium WebDriver
     * Element) from the Staging Env page the Portal app.
     *
     * @returns {Selenium WebDriver Element}
     */
    getStagingServerLbl: function () {
        return element(by.css(this.locators.labels.stagingServer.css));
    },

    /**
     * ### StagingEnv.getExampleStringLbl()
     *
     * Returns the reference to the `Example String` label element (Selenium WebDriver
     * Element) from the Staging Env page the Portal app.
     *
     * @returns {Selenium WebDriver Element}
     */
    getExampleStringLbl: function () {
        return this.getPanelBodyElem()
            .all(by.css(this.locators.labels.strings.css))
            .get(1);
    },

    /**
     * ### StagingEnv.getConfigStringLbl()
     *
     * Returns the reference to the `Config String` label element (Selenium WebDriver
     * Element) from the Staging Env page the Portal app.
     *
     * @returns {Selenium WebDriver Element}
     */
    getConfigStringLbl: function () {
        return this.getPanelBodyElem()
            .all(by.css(this.locators.labels.strings.css))
            .get(0);
    },

    /**
     * ### StagingEnv.getTitleLbl()
     *
     * Returns the reference to the `Container Fluid` element (Selenium WebDriver
     * Element) from the Staging Env page the Portal app.
     *
     * @returns {Selenium WebDriver Element}
     */
    getTitleLbl: function () {
        return element
            .all(by.css(this.locators.container))
            .get(0);
    },

    /**
     * ### StagingEnv.getPanelBodyElem()
     *
     * Returns the reference to the `Panel Body` element (Selenium WebDriver
     * Element) from the Staging Env page in the Portal app.
     *
     * @returns {Selenium WebDriver Element}
     */
    getPanelBodyElem: function () {
        return element
            .all(by.css(this.locators.container))
            .get(1)
            .element(by.css(this.locators.panelBody));
    },

    /**
     * ### StagingEnv.getTitle()
     *
     * Returns the reference to the `Title` label element (Selenium WebDriver
     * Element) from the Staging Env page the portal app.
     *
     * @returns {Selenium WebDriver Element}
     */
    getTitle: function () {
        return this
            .getTitleLbl()
            .getText();
    },

    /**
     * ### StagingEnv.getStagingServer()
     *
     * Returns the reference to the `Title` label element (Selenium WebDriver
     * Element) from the Staging Env page the portal app.
     *
     * @returns {Selenium WebDriver Element}
     */
    getStagingServer: function () {
        return this
            .getStagingServerLbl()
            .getText();
    },

    /**
     * ### StagingEnv.getConfigString()
     *
     * Returns the text of the `Config String` label element (Selenium WebDriver
     * Element) from the Staging Env page the portal app.
     *
     * @returns {Selenium WebDriver Element}
     */
    getConfigString: function () {
        return this
            .getConfigStringLbl()
            .getText();
    },

    /**
     * ### StagingEnv.getExampleString()
     *
     * Returns the text of the `Example String` label element (Selenium WebDriver
     * Element) from the Staging Env page the portal app.
     *
     * @returns {Selenium WebDriver Element}
     */
    getExampleString: function () {
        return this
            .getExampleStringLbl()
            .getText();
    },

    // ## Helper Methods

    /**
     * ### StagingEnv.isDisplayed()
     *
     * Checks whether the Staging Env page is displayed in the UI or not.
     *
     * @returns {Promise}
     */
    isDisplayed: function () {
        return this
            .getTitle()
            .isPresent();
    }
};

module.exports = StagingEnv;

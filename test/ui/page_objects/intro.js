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

// # Intro Object

// This `Intro` Object abstracts all operations or actions that a
// common user could do in the Intro from the Portal app/site.
var Intro = {

    // ## Properties

    // Locators specific to HTML elements from this page object
    locators: {
        container: {
            css: '.introjs-tooltip'
        },
        buttons: {
            skip: {
                css: '.introjs-skipbutton'
            },
            next: {
                css: '.introjs-nextbutton'
            },
            prev: {
                css: '.introjs-prevbutton'
            }
        }
    },

    getIntroContainer: function () {
        return element(by.css(this.locators.container.css));
    },
    getSkipBtn: function () {
        return element(by.css(this.locators.buttons.skip.css));
    },
    clickSkipBtn: function () {
        return this.getSkipBtn().click();
    }
};

module.exports = Intro;

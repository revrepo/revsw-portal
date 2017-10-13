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
            },
            done: {
                css: '.introjs-skipbutton'
            }
        },
        bullets: {
            css: '.introjs-bullets li a'
        }
    },

    getIntroContainer: function () {
        return element(by.css(this.locators.container.css));
    },
    getSkipBtn: function () {
        return element(by.css(this.locators.buttons.skip.css));
    },
    getNextBtn: function () {
        return element(by.css(this.locators.buttons.next.css));
    },
    getPrevBtn: function () {
        return element(by.css(this.locators.buttons.prev.css));
    },
    getDoneBtn: function () {
        return element(by.cssContainingText(this.locators.buttons.done.css, 'Done'));
    },
    clickSkipBtn: function () {
        return this.getSkipBtn().click();
    },
    clickDoneBtn: function () {
        return this.getDoneBtn().click();
    },
    clickNextBtn: function () {
        return this.getNextBtn().click();
    },
    clickPrevBtn: function () {
        return this.getPrevBtn().click();
    },
    getSteps: function () {
        return element.all(by.css(this.locators.bullets.css));
    },
    getStepsCount: function () {
        return this.getSteps().count();
    },
    waitForStep: function () {
        var until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(this.getIntroContainer()), 30000);
    },
    waitForNextStep: function () {
        var until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(this.getNextBtn()), 30000);
    }
};

module.exports = Intro;

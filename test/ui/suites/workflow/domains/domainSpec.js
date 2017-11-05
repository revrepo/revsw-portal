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

var config = require('config');
var Portal = require('./../../../page_objects/portal');
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Workflow', function () {
    describe('Add Domain', function () {
        /*jshint camelcase: false */
        var user = config.get('portal.users.revAdmin');
        var domainData = DataProvider.generateDomain('test-domain');

        beforeAll(function (done) {
            Portal.signIn(user);

            Portal.createDomain(domainData).then(function () {
                done();
            });
        });

        afterAll(function () {
            Portal.signOut();
        });

        beforeEach(function () {
            Portal.helpers.nav.goToDomains();
        });

        it('should contain all expected attributes in a ' +
            ' newly created domain JSON object', function (done) {
                Portal.domainsHelpers.getDomainJSON(domainData.name).then(function (domain) {
                    for (var field in domain) {
                        if (domain.hasOwnProperty(field)) {
                            expect(Constants.DOMAIN_JSON_ATTRIBUTES.indexOf(field)).not.toEqual(-1);
                        }
                    }
                    done();
                });
            });

        it('should contain all expected attributes in a domain JSON object ' +
            ' after updating domain', function (done) {
                Portal.domains.listPage.searchAndClickEdit(domainData.name);
                Portal.domains.editPage.fillDemo(domainData.name);

                Portal.domains.editPage.clickUpdateDomain().then(function () {
                    Portal.dialog.clickOk();
                    Portal.alerts.waitToDisplay().then(function () {
                        Portal
                            .domainsHelpers
                            .getDomainJSON(domainData.name).then(function (domain) {
                                for (var i = 0;
                                    i < Constants.UPDATED_DOMAIN_JSON_ATTRIBUTES.length;
                                    i++) {
                                    expect(JSON.stringify(domain))
                                        .toContain(Constants.UPDATED_DOMAIN_JSON_ATTRIBUTES[i]);
                                }
                                done();
                            });
                    });
                });
            });
    });
});

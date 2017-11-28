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
        var user = config.get('portal.users.admin');
        var domainData = DataProvider.generateDomain('test-domain');
        var sslCertData = {
            account: [user.account.companyName]
        };
        var testSslCert = DataProvider.generateSSLCertData(sslCertData);
        var customWAFRule = DataProvider.generateCustomWAFRule(user);
        var defaultDomain = Constants.DOMAIN_DEFAULT_JSON;
        var updatedDomain = Constants.DOMAIN_UPDATED_JSON;
        var updatedDisabledDomain = Constants.DOMAIN_UPDATED_DISABLED_JSON;
        var waf_rules = [];
        beforeAll(function (done) {
            Portal.signIn(user);

            // Create a new SSL Cert to use for these tests
            Portal.createSSLCert(testSslCert);

            // Create new WAF Customer Rule to use for these tests 
            Portal.helpers.nav.goToWAFRules();
            Portal.wafRules.listPage.clickAddNewWAFRule();
            Portal.wafRules.addPage.createCustomWAFRule(customWAFRule);

            //Create a new domain to use for these tests
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

        it('should contain all expected default attributes in a ' +
            ' newly created domain JSON object', function (done) {
                Portal.domainsHelpers.getDomainJSON(domainData.name).then(function (domain) {
                    defaultDomain.domain_name = domainData.name;
                    defaultDomain.cname = domainData.name + '.revqa.net';
                    defaultDomain.id = domain.id;
                    updatedDomain.id = domain.id;
                    updatedDomain.cname = domainData.name + '.revqa.net';
                    updatedDomain.domain_name = domainData.name;
                    updatedDomain.domain_wildcard_alias = '*.' + domainData.name;
                    updatedDisabledDomain.id = domain.id;
                    updatedDisabledDomain.cname = domainData.name + '.revqa.net';
                    updatedDisabledDomain.domain_name = domainData.name;
                    expect(JSON.stringify(domain)).toBe(JSON.stringify(defaultDomain));
                    done();
                });
            });

        it('should contain all expected attributes in a domain JSON object ' +
            ' after updating domain', function (done) {
                Portal.domains.listPage.searchAndClickEdit(domainData.name);
                Portal.domains.editPage.fillDemo(domainData, updatedDomain).then(function () {
                    Portal.domains.editPage.clickUpdateDomain().then(function () {
                        Portal.dialog.clickOk();
                        Portal.alerts.waitToDisplay(120000).then(function () {
                            Portal
                                .domainsHelpers
                                .getDomainJSON(domainData.name).then(function (domain) {
                                    waf_rules = domain.rev_component_bp.waf[0].waf_rules;
                                    testSslCert.id = domain.ssl_cert_id;
                                    // Custom VCL Rules are too long, overwriting them..
                                    domain.rev_component_bp.custom_vcl.recv = 'custom_vcl_recv';
                                    domain.rev_component_bp.custom_vcl.miss = 'custom_vcl_miss';
                                    domain
                                        .rev_component_bp
                                        .custom_vcl
                                        .deliver = 'custom_vcl_deliver';
                                    domain.rev_component_bp.custom_vcl.hash = 'custom_vcl_hash';
                                    domain.rev_component_bp.custom_vcl.miss = 'custom_vcl_hit';
                                    domain.rev_component_bp.waf = 'waf_actions';
                                    domain
                                        .rev_component_bp
                                        .custom_vcl
                                        .backend_response = 'custom_vcl_backend_response';
                                    updatedDomain.ssl_cert_id = domain.ssl_cert_id;
                                    updatedDomain.ssl_conf_profile = domain.ssl_conf_profile;
                                    updatedDisabledDomain.ssl_cert_id = domain.ssl_cert_id;
                                    updatedDisabledDomain
                                        .ssl_conf_profile = domain.ssl_conf_profile;
                                    // this is for debugging
                                    var a = JSON.stringify(domain);
                                    var b = JSON.stringify(updatedDomain);
                                    for (var i = 0; i < a.length; i++) {
                                        if (a[i] !== b[i]) {
                                            console.log(a[i] + '!==' + b[i] + ':' + i);
                                        }
                                    }
                                    expect(JSON.stringify(domain))
                                        .toBe(JSON.stringify(updatedDomain));
                                    done();
                                });
                        });
                    });
                });

            });

        it('should contain correct SSL Certificate data after updating domain', function (done) {
            Portal
                .domainsHelpers
                .getSSLCert(testSslCert.id).then(function (ssl_cert) {
                    expect(ssl_cert.cert_name).toBe(testSslCert.name);
                    done();
                });
        });
        it('should contain correct WAF Rule data after updating domain', function (done) {
            if (waf_rules.length > 1) {
                waf_rules = waf_rules[1];
            }
            Portal
                .domainsHelpers
                .getWafRule(waf_rules).then(function (waf_rule) {
                    expect(waf_rule.rule_name).toBe(customWAFRule.ruleName);
                    done();
                });
        });
        it('should update all expected attributes in a domain JSON object ' +
            ' after updating domain', function (done) {
                Portal.domains.listPage.searchAndClickEdit(domainData.name);
                Portal.domains.editPage.clearDemo(domainData.name);

                Portal.domains.editPage.clickUpdateDomain().then(function () {
                    Portal.dialog.clickOk();
                    Portal.alerts.waitToDisplay().then(function () {
                        Portal
                            .domainsHelpers
                            .getDomainJSON(domainData.name).then(function (domain) {
                                domain.rev_component_bp.custom_vcl.recv = 'custom_vcl_recv';
                                domain.rev_component_bp.custom_vcl.miss = 'custom_vcl_miss';
                                domain
                                    .rev_component_bp
                                    .custom_vcl
                                    .deliver = 'custom_vcl_deliver';
                                domain.rev_component_bp.custom_vcl.hash = 'custom_vcl_hash';
                                domain.rev_component_bp.custom_vcl.miss = 'custom_vcl_hit';
                                domain.rev_component_bp.waf = 'waf_actions';
                                domain
                                    .rev_component_bp
                                    .custom_vcl
                                    .backend_response = 'custom_vcl_backend_response';
                                // this is for debugging
                                var a = JSON.stringify(domain);
                                var b = JSON.stringify(updatedDisabledDomain);
                                for (var i = 0; i < a.length; i++) {
                                    if (a[i] !== b[i]) {
                                        console.log(a[i] + '!==' + b[i] + ':' + i);
                                    }
                                }
                                expect(JSON.stringify(domain))
                                    .toBe(JSON.stringify(updatedDisabledDomain));
                                done();
                            });
                    });
                });
            });

        it('should update domain version after domain is published', function (done) {
            Portal.domainsHelpers.getDomainJSON(domainData.name).then(function (domain) {
                var domainJSON = domain;
                var ver = domainJSON.last_published_domain_version;
                Portal.domains.listPage.searchAndClickEdit(domainData.name);
                Portal.domains.editPage.clickTabSSLconfiguration();
                Portal.domains.editPage.form.getAcceptSSLrequestsTxtIn().click();
                Portal.domains.editPage.clickPublishDomain();
                Portal.dialog.clickOk().then(function () {
                    Portal.alerts.waitToDisplay().then(function () {
                        Portal
                            .domainsHelpers
                            .getDomainJSON(domainData.name).then(function (domain2) {
                                expect(domain2
                                    .last_published_domain_version).toBeGreaterThan(ver);
                                done();
                            });
                    });
                });
            });
        });
    });
});

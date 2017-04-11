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

var config = require('config');
var Portal = require('./../../../page_objects/portal');
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Workflow', function () {

    // Defining set of users for which all below tests will be run
    var users = [
        // config.get('portal.users.revAdmin')
        { 'email': 'nikolay.gerzhan@gmail.com',

        'password': '12345678',
        'role': 'GERZHAN Admin'}
    ];

    users.forEach(function (user) {

        describe('With user: ' + user.role, function () {
            describe('Edit SSL Cert', function () {

                var sslCertData = {
                        account: ['API QA Reseller Company']
                };

                beforeAll(function () {
                    Portal.signIn(user);
                });

                afterAll(function () {
                    Portal.signOut();
                });

                beforeEach(function () {
                  console.log('------');
                    Portal.goToSslCert();
                });

                afterEach(function () {
                });

                it('should be possible to edit certificate which is in use',
                    function () {
                        var testDomain = {}
                        // {"3rd_party_rewrite":{"3rd_party_root_rewrite_domains":"","3rd_party_runtime_domains":"","3rd_party_urls":"","enable_3rd_party_rewrite":false,"enable_3rd_party_root_rewrite":false,"enable_3rd_party_runtime_rewrite":false},"proxy_timeout":20,"rev_component_bp":{"enable_quic":false,"acl":{"acl_rules":[{"country_code":"","header_name":"","header_value":"","host_name":"","subnet_mask":""}],"action":"deny_except","enabled":false},"block_crawlers":false,"cache_bypass_locations":[],"caching_rules":[],"cdn_overlay_urls":[],"enable_cache":false,"enable_security":true,"web_app_firewall":"off"},"rev_component_co":{"css_choice":"medium","enable_optimization":false,"enable_rum":false,"img_choice":"medium","js_choice":"medium","mode":"moderate"},"origin_secure_protocol":"use_end_user_protocol","origin_server":"dell2.com","origin_host_header":"dell2.com","account_id":"5714b425fce0aa6415edd853","tolerance":"3000","origin_server_location_id":"55a56fa6476c10c329a90741","domain_aliases":[],"domain_wildcard_alias":"*.webagency.com","enable_origin_health_probe":false,"origin_health_probe":{"PROBE_TIMEOUT":1,"PROBE_INTERVAL":1,"HTTP_STATUS":200,"HTTP_REQUEST":"GET / HTTP 1.1"},"cname":"websoftagency.com.revqa.net","domain_name":"websoftagency.com","published_domain_version":0,"last_published_domain_version":12,"enable_ssl":true,"ssl_conf_profile":"571e9f7591dcb9f97a0c4841","ssl_cert_id":"","ssl_protocols":"TLSv1 TLSv1.1 TLSv1.2","ssl_ciphers":"ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:ECDH+3DES:DH+3DES:RSA+AESGCM:RSA+AES:RSA+3DES:!aNULL:!MD5:!DSS","ssl_prefer_server_ciphers":true,"btt_key":""};
                        testDomain.name= 'websoftagency.com';
                        var testSslCert = {};
                        // {"id":"5735b3fc9298a7004d97c411","account_id":"5714b425fce0aa6415edd853","cert_type":"private","cert_name":"DEMO 31 SSL","created_by":"dev@revsw.com","comment":"delete privet","created_at":"2016-05-13T11:01:16.485Z","updated_at":"2016-07-03T05:41:18.620Z","last_published_ssl_config_version":1,"public_ssl_cert":"-----BEGIN CERTIFICATE-----\nMIICJzCCAZACCQD/joMRp8Xo+TANBgkqhkiG9w0BAQsFADBYMQswCQYDVQQGEwJB\nVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50ZXJuZXQgV2lkZ2l0\ncyBQdHkgTHRkMREwDwYDVQQDDAhkZWxsLmNvbTAeFw0xNjA1MDIyMjIyNDlaFw0x\nNzA1MDIyMjIyNDlaMFgxCzAJBgNVBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRl\nMSEwHwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQxETAPBgNVBAMMCGRl\nbGwuY29tMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDaoO2+ha96yFH5QcId\nWPfHMKAybFaSppLFu5yNHWrIAPLl2Jl+J+KqgWbaOqCAz2l+uzL0Eb0YLx5FFcgP\n+MWqkuvltvXUKBS4zYMT7FybzxdHxaXkWItO78EblY3DHWhhGw4edSnfQ6g6Eukq\nBRXa65uhHd8Pll/6QB+uvq03UwIDAQABMA0GCSqGSIb3DQEBCwUAA4GBAK8W1DAU\n5xMv0cs+hn2/EdlWw73iIY5SopZA5D/THy5h52rTvbndrObJOb7172lENa1NDVYg\nvf4CsXUAOHiqIv9XG/HDX82LixZF9z0sWlMpgkAiFQi1mBCfTYj6caCs7mRRp1Qm\nGNndxxmJSpXbbBxgDV8sqEolIBA2BbfNRCdt\n-----END CERTIFICATE-----","private_ssl_key":"-----BEGIN RSA PRIVATE KEY-----\nMIICXQIBAAKBgQDaoO2+ha96yFH5QcIdWPfHMKAybFaSppLFu5yNHWrIAPLl2Jl+\nJ+KqgWbaOqCAz2l+uzL0Eb0YLx5FFcgP+MWqkuvltvXUKBS4zYMT7FybzxdHxaXk\nWItO78EblY3DHWhhGw4edSnfQ6g6EukqBRXa65uhHd8Pll/6QB+uvq03UwIDAQAB\nAoGBALWtHWNBPD1P0a7L0j8I+33vDnBYTui2uyjNap5pX56sCyys/YA0LMt7lLis\nF0xzDztc3E6tnvFF1mWaYBHFrJs04hN2nFSvkYOJebJmDKvRp0/Z2ypTi+LX++A2\ntKi1HwBPc8sdyjVgwcOcrV3xfPpHYZM/+yVtyyDnNAH4DBEhAkEA9UaL1xLsTWe3\nEF4zY3EhQVF2owqw3yOLsS4cpmqLoYErGA5q4bNzjtE21+A7O4cqGMhG8h3rMo00\nK5krKaxzJwJBAOQwHTHZQ14sFIvf+/gkiVJlyLS/BP/ynCw/XC8QHajOO/Ed7J3C\noeHR+MPIche09JsdFZvOzh5JufEAsGOKxfUCQD+PS3etgKzCXq8QKjLvwxVhHeQ8\nRf9c/7snXudFHu/4QAmY2tuoHB77WkHw6oiPizom1DOzyxore0R9CbFf7esCQQCh\np2RHWD9di6TSos8CMAAIm4rgYSLNn7X7src/sA8S82eLnUNvT98W94VgTbRmDw/q\ng2Q3iP6Efn53uaE8I6exAkAySCixDcaNhcFOo6tmcesWCo/Z1fLbMXUMlxx9EB0T\nBcok3FI1eSLmHkgFyPMLYzocWnXwn2Blz0N9jt5IOzRo\n-----END RSA PRIVATE KEY-----","private_ssl_key_passphrase":"","chain_ssl_cert":"","expires_at":"2017-05-02T22:22:49.000Z","domains":"dell.com"};
                        testSslCert.name = testSslCert.cert_name;
                        // var testSslCert = DataProvider.generateSSLCertData(sslCertData);

                        // var testDomain = DataProvider.generateDomain('sslTestDomain');
                        // Portal.createSSLCert(testSslCert);
                        Portal.goToDomains();
                        console.log('-go to--')
                        // bwrowse.wait(5000);

                        Portal.domains.listPage.clickAddNewDomain();
                        // Portal.domains.addPage.createDomain(testDomain);
                        Portal.domains.addPage.clickBackToList();
                        Portal.domains.listPage.searchAndClickEdit(testDomain.name);
                        console.log('-edit--',testDomain.name);
                        Portal.domains.editPage.form.setSslCert(testSslCert.name);
                        var newAddedSSLItemText = Portal.domains.editPage.form.getSslCertDDownItems()
                    .last().getText();

                console.log('newAddedSSLItemText',newAddedSSLItemText);
                expect(newAddedSSLItemText).toBe(testSslCert.name);
                Portal.domains.editPage.clickBackToList();
                        // Portal.domains.editPage.clickUpdateDomain();
                        // Portal.dialog.clickOk();
                        // Portal.goToSslCert();
                        //  Portal.sslCerts.listPage.searcher.setSearchCriteria(testSslCert.name);
                        //  Portal.sslCerts.listPage.table
                        //      .getFirstRow()
                        //      .clickEdit();
                        // var valueAdded = ' updated';
                        // Portal.sslCerts.editPage.form.setCertName(valueAdded);
                        // Portal.sslCerts.editPage.clickUpdate();
                        // Portal.dialog.clickOk();
                        // var updatedCertName = Portal.sslCerts.editPage.form.getCertName();
                        // Portal.goToSslCert();
                        // Portal.sslCerts.listPage.searcher.clearSearchCriteria();
                        // Portal.sslCerts.listPage.searcher.setSearchCriteria(updatedCertName);
                        // var tableRows = Portal.sslCerts.listPage.table.getRows();
                        // expect(tableRows.count()).toEqual(1);
                        // Portal.goToDomains()---
                        // Portal.deleteDomain(testDomain);
                        // Portal.goToSslCert();
                        // Portal.deleteSSLCert(testSslCert);
                        // expect(1).toEqual(1);
                    });



            });
        });
    });
});

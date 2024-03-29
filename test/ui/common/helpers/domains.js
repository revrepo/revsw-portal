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
var config = require('config');
var request = require('supertest-as-promised');
var API = require('./../api').API;
var Session = require('./../session');
var user = config.get('portal.users.revAdmin');
var apiUrl = config.get('api.host.protocol') +
    '://' +
    config.get('api.host.name') +
    ':' +
    config.get('api.host.port');
var Utils = require('./utils');
var domains = {

    /**
     * ### domains.getDomainJSON()
     *
     * Returns a domain JSON object
     *
     */
    getDomainJSON: function (domainName) {
        return Utils.getAPIItemByField(domainName, 'domain_name', user, '/v1/domain_configs');
    },
    getStatus: function (domainId) {
        /*jshint camelcase: false */
        return API.helpers.authenticateUser(user).then(function () {
            return request(apiUrl)
                .get('/v1/domain_configs/' + domainId + '/config_status')
                .set('Authorization', 'Bearer ' + user.token)
                .expect(200)
                .then(function (res) {
                    return res;
                });
        });
    },
    /**
       * ### domains.getDomainWafRules()
       *
       * Returns a domain JSON object
       *
       */
    getDomainWafRules: function (domainName, callback) {
        var newu = Session.getCurrentUser();
        this.getDomainJSON(domainName, function (domain) {
            request(apiUrl)
                .get('/v1/domain_configs/' + domain.id + '/waf_rules_list')
                .set('Authorization', 'Bearer ' + newu.token)
                .end(function (err, res) {
                    callback(res.body.data);
                });
        });
    },
    /**
       * ### domains.getSSLCert()
       *
       * Returns a JSON object of an SSL cert
       *
       */
    getSSLCert: function (id) {
        return API.helpers.authenticateUser(user).then(function () {
            return request(apiUrl)
                .get('/v1/ssl_certs/' + id)
                .set('Authorization', 'Bearer ' + user.token)
                .expect(200)
                .then(function (res) {
                    return res.body;
                });
        });
    },
    /**
       * ### domains.getWafRule()
       *
       * Returns a JSON object of a WAF rule
       *
       */
    getWafRule: function (id) {
        return API.helpers.authenticateUser(user).then(function () {
            return request(apiUrl)
                .get('/v1/waf_rules/' + id)
                .set('Authorization', 'Bearer ' + user.token)
                .expect(200)
                .then(function (res) {
                    return res.body;
                });
        });
    }
};

module.exports = domains;
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
var user = config.get('portal.users.admin');
var apiUrl = config.get('api.host.protocol') +
    '://' +
    config.get('api.host.name');
var sslCerts = {

    /**
           * ### sslCerts.getSSLCert()
           *
           * Returns a SSL Cert JSON object
           *
           */
    getSSLCert: function (sslCertName) {
        /*jshint camelcase: false */
        return API.helpers.authenticateUser(user).then(function () {
            return request(apiUrl)
                .get('/v1/ssl_certs')
                .set('Authorization', 'Bearer ' + user.token)
                .expect(200)
                .then(function (res) {
                    var sslCerts = res.body;
                    var returnCert;
                    sslCerts.forEach(function (cert) {
                        if (cert.cert_name === sslCertName) {
                            returnCert = cert;
                        }
                    });
                    return request(apiUrl)
                        .get('/v1/ssl_certs/' + returnCert.id)
                        .set('Authorization', 'Bearer ' + user.token)
                        .expect(200)
                        .then(function (res) {
                            var sslc = res.body;
                            sslc.id = returnCert.id;
                            return sslc;
                        });
                });
        });

    }
};

module.exports = sslCerts;
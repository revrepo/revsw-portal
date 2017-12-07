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
var user = config.get('portal.users.admin');
var Utils = require('./utils');

var sslCerts = {

    /**
     * ### sslCerts.getSSLCert()
     *
     * Returns a SSL Cert JSON object
     *
     */
    getSSLCert: function (sslCertName) {
        return Utils.getAPIItemByField(sslCertName, 'cert_name', user, '/v1/ssl_certs');
    }
};

module.exports = sslCerts;
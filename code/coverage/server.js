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

var express = require('express');
var bodyParser = require('body-parser')
var coverage = require('istanbul-middleware');

module.exports = {
  start: function (port) {
    var coveragePath = '/coverage';
    var sourceDir = __dirname + '/../dev';

    // Run ExpressJS Server (for Coverage purposes)
    var app = express();
    app.use(bodyParser.json({limit: '100mb'}));
    app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit:100000}));
    app.use(coveragePath, coverage.createHandler({
      verbose: true,
      resetOnGet: true
    }));
    app.use(coverage.createClientHandler(sourceDir, {
      matcher: function (req) {
        var pathname = require('url').parse(req.url).pathname;
        if (pathname && pathname.match(/\.js$/) && !pathname.match(/bower_components/)) {
          console.log('Sending to browser instrumented file:', pathname);
          return true;
        }
        return false;
      }
    }));
    app.use(express.static(sourceDir));
    app.listen(port);

    console.info('Coverage report at http://localhost:' + port + coveragePath);
  }
};

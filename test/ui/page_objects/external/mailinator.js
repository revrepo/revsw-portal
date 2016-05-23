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

// # Mailinator object

// Requiring page objects
var MailinatorInboxPage = require('./mailinator/inboxPage');
var MailinatorEmailPage = require('./mailinator/emailPage');

// This `Portal` Page Object is the entry point to use all other Page Objects
// that abstract all components from the Portal App.
var Mailinator = {

  // Pages that compound this Portal app/site
  inboxPage: MailinatorInboxPage,
  emailPage: MailinatorEmailPage
};

module.exports = Mailinator;
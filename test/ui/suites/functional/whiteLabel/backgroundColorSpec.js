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

describe('Functional', function () {
  describe('Background Color', function () {
    var adminUserRev = config.get('portal.users.admin');
    var adminUserNuubit = config.get('portal.users.nuubitAdmin');

    var bgColorRev = Constants.backgroundColor.revapm;
    var bgColorNuubit = Constants.backgroundColor.nuubit;
    
    afterEach(function () {
      Portal.signOut();
    });

    it('should have orange background color on Revapm website', function () {
      Portal.signIn(adminUserRev);
     
      var bgColor = Portal.header.getNavBarBGColor();
      expect(bgColor).toBe(bgColorRev);
    });

    it('should have dark blue background color on Nuubit website', function () {
      Portal.signInNuubit(adminUserNuubit);

      var bgColor = Portal.header.getNavBarBGColor();
      expect(bgColor).toBe(bgColorNuubit);
    });
  });
});

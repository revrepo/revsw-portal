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
var Portal = require('./../../../page_objects/portal');

describe ('White-label RevApm', function() {
   beforeAll(function () {
      Portal.load();
     });


  it('should displayed logo RevApm on login page', function(){
    Portal.loginPage.getLogo().getAttribute('src').then(function(value){   
      expect(/logo\.png/.test(value)).toBe(true);
    });
 });


  it('should displayed copyright RevApm on login page', function(){
    Portal.loginPage.getBrand().getText().then(function(value){   
      expect(value).toBe('Copyright RevAPM 2013-2018');
    });
 });


 it('should displayed logo RevApm on sign up page', function(){
    Portal.loginPage.clickSignUp();
    Portal.signUp.plansPage.getLogo().getAttribute('src').then(function(value){   
        expect(/logo_color\.png/.test(value)).toBe(true);
    });
 });
  it('should displayed copyright RevApm on sign up page', function(){
    Portal.signUp.plansPage.getSecondBrand().getText().then(function(value){   
      expect(value).toBe('Copyright RevAPM 2013-2018');
    });
  });
});



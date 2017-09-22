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
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');
var Constants = require('./../../../../page_objects/constants');

describe('Functional ', function () { 
  var admin = config.get('portal.users.revAdmin');
  var vendors = {
    nuubit: 'nuubit',
    revapm: 'revapm'
  };
  var company = DataProvider.generateAccountProfileData();
  var criteria = company.companyName;

    beforeAll(function () {

      Portal.signIn(admin);
      Portal.helpers.nav.goToAccounts();
      Portal.admin.accounts.listPage.addNewCompany(company);
    });

    afterAll(function () {
      Portal.admin.accounts.listPage.searchAndClickDelete(criteria);
      Portal.dialog.clickOk();
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.helpers.nav.goToAccounts();
      Portal.admin.accounts.listPage.searchAndGetFirstRow(criteria);
    });

    describe('should change account Vendors', function () {

      it('should change user*s Vendor from revapm to nuubit', function () {
        Portal.admin.accounts.listPage.clickVendorLink();
        Portal.admin.accounts.listPage.changeVendorModal.selectVendorDdown();
        Portal.admin.accounts.listPage.changeVendorModal.setVendorNuubit();
        Portal.admin.accounts.listPage.changeVendorModal.clickChange();

        var vendorLinkText = Portal.admin.accounts.listPage.getVendorLinkText();
        expect(vendorLinkText).toEqual(vendors.nuubit);
      });

      it('should change user*s Vendor from nuubit to revapm', function () {
        Portal.admin.accounts.listPage.clickVendorLink();
        Portal.admin.accounts.listPage.changeVendorModal.selectVendorDdown();
        Portal.admin.accounts.listPage.changeVendorModal.setVendorRevapm();
        Portal.admin.accounts.listPage.changeVendorModal.clickChange();

        var vendorLinkText = Portal.admin.accounts.listPage.getVendorLinkText();
        expect(vendorLinkText).toEqual(vendors.revapm);
      });
    });
  });


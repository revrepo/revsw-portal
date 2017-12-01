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
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');

describe('Workflow', function () {

    var user = config.get('portal.users.revAdmin');

    describe('With user: ' + user.role, function () {
        /* api json is all camel_case */
        /* jshint camelcase:false */
        describe('Account Add Edit Integrity', function () {
            var newAcc = DataProvider.generateAccountProfileData();
            var newAccUpdated = newAcc;
            var accObj = {};
            beforeAll(function (done) {
                Portal.signIn(user);
                Portal.helpers.nav.goToAccounts();
                Portal.admin.accounts.listPage.clickAddNewCompany();
                Portal.admin.accounts.addCompany.createCompany(newAcc).then(function () {
                    Portal.helpers.accounts.getAccount(newAcc.companyName).then(function (acc) {
                        accObj = acc;
                        done();
                    });
                });
            });

            afterAll(function () {
                Portal.signOut();
            });

            beforeEach(function () {
                Portal.helpers.nav.goToAccounts();
                Portal.admin.accounts.listPage.searchAndClickEdit(newAcc.companyName);
            });

            it('should contain correct data in a newly created User JSON object',
                function () {
                    expect(accObj.companyName).toBe(newAcc.companyName);
                    expect(accObj.comment).toBe(newAcc.comment);
                    expect(accObj.vendor_profile).toBe('revapm');
                });

            it('should display correct data in the User UI elements',
                function () {
                    Portal
                        .admin
                        .accounts
                        .editPage
                        .formProfile
                        .getCompanyName()
                        .then(function (val) {
                            expect(val).toBe(accObj.companyName);
                        });

                    Portal
                        .admin
                        .accounts
                        .editPage
                        .formProfile
                        .getComment()
                        .then(function (val) {
                            expect(val).toBe(accObj.comment);
                        });
                });

            it('should contain correct data in the User JSON object after update',
                function (done) {
                    newAccUpdated.companyName += ' UPDATED';
                    newAccUpdated.comment += ' UPDATED';

                    Portal.admin.accounts.editPage.updateAccountProfile(newAccUpdated, null);
                    Portal.dialog.clickOk();
                    Portal.alerts.waitToDisplay().then(function () {
                        Portal
                            .helpers
                            .accounts
                            .getAccount(newAcc.companyName)
                            .then(function (acc) {
                                accObj = acc;
                                expect(accObj.companyName).toBe(newAcc.companyName);
                                expect(accObj.comment).toBe(newAcc.comment);
                                expect(accObj.vendor_profile).toBe('revapm');
                                expect(accObj.country).toBe('CA');
                                expect(accObj.state).toBe(newAcc.state);
                                expect(accObj.city).toBe(newAcc.city);
                                expect(accObj.address1).toBe(newAcc.address1);
                                expect(accObj.address2).toBe(newAcc.address2);
                                expect(accObj.zipcode).toBe(newAcc.zipcode);
                                expect(accObj.phone_number).toBe(newAcc.phoneNumber);
                                expect(accObj.first_name).toBe(newAcc.firstName);
                                expect(accObj.last_name).toBe(newAcc.lastName);
                                expect(accObj.contact_email).toBe(newAcc.contactEmail);
                                expect(accObj.use_contact_info_as_billing_info).toBeTruthy();
                                done();
                            });

                    });
                });

            it('should display correct data in the User UI elements after update',
                function () {
                    Portal
                        .admin
                        .accounts
                        .editPage
                        .formProfile
                        .getCompanyName()
                        .then(function (val) {
                            expect(val).toBe(accObj.companyName);
                        });

                    Portal
                        .admin
                        .accounts
                        .editPage
                        .formProfile
                        .getComment()
                        .then(function (val) {
                            expect(val).toBe(accObj.comment);
                        });

                    Portal
                        .admin
                        .accounts
                        .editPage
                        .formProfile
                        .getFirstName()
                        .then(function (val) {
                            expect(val).toBe(accObj.first_name);
                        });

                    Portal
                        .admin
                        .accounts
                        .editPage
                        .formProfile
                        .getLastName()
                        .then(function (val) {
                            expect(val).toBe(accObj.last_name);
                        });

                    Portal
                        .admin
                        .accounts
                        .editPage
                        .formProfile
                        .getPhoneNumber()
                        .then(function (val) {
                            expect(val).toBe(accObj.phone_number);
                        });

                    Portal
                        .admin
                        .accounts
                        .editPage
                        .formProfile
                        .getContactEmail()
                        .then(function (val) {
                            expect(val).toBe(accObj.contact_email);
                        });

                    Portal
                        .admin
                        .accounts
                        .editPage
                        .formProfile
                        .getAddress1()
                        .then(function (val) {
                            expect(val).toBe(accObj.address1);
                        });

                    Portal
                        .admin
                        .accounts
                        .editPage
                        .formProfile
                        .getAddress2()
                        .then(function (val) {
                            expect(val).toBe(accObj.address2);
                        });

                    Portal
                        .admin
                        .accounts
                        .editPage
                        .formProfile
                        .getCountry()
                        .then(function (val) {
                            expect(val).toBe(newAccUpdated.country);
                        });

                    Portal
                        .admin
                        .accounts
                        .editPage
                        .formProfile
                        .getState()
                        .then(function (val) {
                            expect(val).toBe(accObj.state);
                        });

                    Portal
                        .admin
                        .accounts
                        .editPage
                        .formProfile
                        .getCity()
                        .then(function (val) {
                            expect(val).toBe(accObj.city);
                        });

                    Portal
                        .admin
                        .accounts
                        .editPage
                        .formProfile
                        .getZipCode()
                        .then(function (val) {
                            expect(val).toBe(accObj.zipcode);
                        });
                });
        });
    });
});

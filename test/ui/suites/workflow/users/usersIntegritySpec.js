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

describe('Workflow', function () {

    var user = config.get('portal.users.admin');

    describe('With user: ' + user.role, function () {
        /* api json is all camel_case */
        /* jshint camelcase:false */
        describe('Users Add Edit Integrity', function () {
            var newUser = DataProvider.generateUser();
            var newUserUpdated = newUser;
            var userObj = {};
            beforeAll(function (done) {
                Portal.signIn(user);
                Portal.helpers.nav.goToUsers();
                Portal.userListPage.clickAddNewUser();
                Portal.addUserPage.createUser(newUser).then(function () {
                    Portal.helpers.users.getUser(newUser.email).then(function (usr) {
                        userObj = usr;
                        done();
                    });
                });
            });

            afterAll(function () {
                Portal.signOut();
            });

            beforeEach(function () {
                Portal.helpers.nav.goToUsers();
                Portal.userListPage.searchAndClickEdit(newUser.email);
            });

            it('should contain correct data in a newly created User JSON object',
                function () {
                    expect(userObj.email)
                        .toBe(newUser.email);
                    expect(userObj.firstname)
                        .toBe(newUser.firstName);
                    expect(userObj.lastname)
                        .toBe(newUser.lastName);
                    expect(userObj.comment)
                        .toBe('');
                    expect(userObj.role)
                        .toBe(newUser.role);
                    expect(userObj.access_control_list.readOnly)
                        .toBeFalsy();
                });

            it('should display correct data in the User UI elements',
                function () {
                    Portal.editUserPage.form.getFirstName().then(function (firstname) {
                        expect(firstname).toBe(userObj.firstname);
                    });
                    Portal.editUserPage.form.getLastName().then(function (lastname) {
                        expect(lastname).toBe(userObj.lastname);
                    });
                    Portal.editUserPage.form.getEmail().then(function (email) {
                        expect(email).toBe(userObj.email);
                    });
                    Portal.editUserPage.form.getRole().then(function (role) {
                        expect(role).toBe(userObj.role);
                    });
                });

            it('should contain correct data in the User JSON object after update',
                function (done) {
                    newUserUpdated.firstName += 'updated';
                    newUserUpdated.lastName += 'updated';
                    newUserUpdated.comment = 'updated';

                    Portal.editUserPage.form.setFirstName(newUserUpdated.firstName);
                    Portal.editUserPage.form.setLastName(newUserUpdated.lastName);
                    Portal.editUserPage.form.setComment(newUserUpdated.comment);
                    Portal.editUserPage.clickUpdateUser().then(function () {
                        Portal
                            .helpers
                            .users
                            .getUser(newUser.email).then(function (usr) {
                                userObj = usr;
                                expect(userObj.email)
                                    .toBe(newUser.email);
                                expect(userObj.firstname)
                                    .toBe(newUserUpdated.firstName);
                                expect(userObj.lastname)
                                    .toBe(newUserUpdated.lastName);
                                expect(userObj.comment)
                                    .toBe(newUserUpdated.comment);
                                expect(userObj.role)
                                    .toBe(newUserUpdated.role);
                                expect(userObj.access_control_list.readOnly)
                                    .toBeFalsy();
                                done();
                            });
                    });
                });

            it('should display correct data in the User UI elements after update',
                function () {
                    Portal.editUserPage.form.getFirstName().then(function (firstname) {
                        expect(firstname).toBe(userObj.firstname);
                    });
                    Portal.editUserPage.form.getLastName().then(function (lastname) {
                        expect(lastname).toBe(userObj.lastname);
                    });
                    Portal.editUserPage.form.getEmail().then(function (email) {
                        expect(email).toBe(userObj.email);
                    });
                    Portal.editUserPage.form.getRole().then(function (role) {
                        expect(role).toBe(userObj.role);
                    });
                    Portal.editUserPage.form.getComment().then(function (comment) {
                        expect(comment).toBe(userObj.comment);
                    });
                });
        });
    });
});

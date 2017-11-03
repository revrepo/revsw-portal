/*************************************************************************
 */

var config = require('config');
var Portal = require('./../../../page_objects/portal');
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.user'),
    config.get('portal.users.admin'),
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Tabs switching (Custom VCL Rules)', function () {

        var EditPage = Portal.domains.editPage;
        var form = EditPage.form;
        var checkDisplay = function(elem, value) {
          return EditPage.elementIsDisplayed(elem, value);
        };

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToDomains();
          EditPage.clickEditDomain();
          EditPage.clickTabVCL();
        });

        afterAll(function () {
          Portal.signOut();
        });

        it('should display "Custom VCL Rules"', function () {
          expect(checkDisplay('getCustomVCLrulesSw')).toBe(true);
          EditPage.switchBtns(form.getCustomVCLrulesSw(), true);
        });

        it('if "Custom VCL Rules" is "ON" then should '+
          'display block "Custom VCL Rules"', function () {
          expect(checkDisplay('getBlockCustomVCLrulesTxtIn')).toBe(true);
        });

        it('if "Custom VCL Rules" is "ON" then should '+
          'display "Open only one rule at a time"', function () {
          expect(checkDisplay('getOneAtATimeTxtIn')).toBe(true);
        });



        it('if "Custom VCL Rules" is "ON" then should display "'+
          '\'Recv, '+
          'Hit, '+
          'Miss, '+
          'Deliver, '+
          'Pass, '+
          'Pipe, '+
          'Hash, '+
          'Synth, '+
          'Backend Error\' Functions"', function () {

            form.getCustomVCLrulesBlocks().getAttribute('heading').then(function(blocks) {
              expect(blocks).toEqual([
                '\'Recv\' Function',
                '\'Hit\' Function',
                '\'Miss\' Function',
                '\'Deliver\' Function',
                '\'Pass\' Function',
                '\'Pipe\' Function',
                '\'Hash\' Function',
                '\'Synth\' Function',
                '\'Backend Fetch\' Function',
                '\'Backend Response\' Function',
                '\'Backend Error\' Function'
              ]);
            });
        });

        it('if "Custom VCL Rules" is "ON" then should display textarea: "'+
          '\'Recv, '+
          'Hit, '+
          'Miss, '+
          'Deliver, '+
          'Pass, '+
          'Pipe, '+
          'Hash, '+
          'Synth, '+
          'Backend Error\' Functions"', function () {
            form.getLinkFromListCustomVCLrulesBlocks().click();
            form.getCustomVCLrulesListFunctions().getAttribute('id').then(function(idTextarea) {
              expect(idTextarea).toEqual([
                'vclRecv',
                'vclHit',
                'vclMiss',
                'vclDeliver',
                'vclPass',
                'vclPipe',
                'vclHash',
                'vclSynth',
                'vclBackendFetch',
                'vclBackendResponse',
                'vclBackendError'
              ]);
            });

        });


        it('if "Custom VCL Rules" is "ON" then should display "Backends" block', function () {
            expect(checkDisplay('getBackendsBlock')).toBe(true);
        });

        it('if "Custom VCL Rules" is "ON" then should '+
         // TODO need to actually click on "Add Backend" button
          'display "Backend Name" in "Backends"', function () {
          EditPage.clickAddNewBackendBlock();
          expect(checkDisplay('getOriginHostHeaderTxtIn')).toBe(true);
        });

        it('if "Custom VCL Rules" is "ON" then should '+
          'display "Backend VCL Code" in "Backends"', function () {
          expect(checkDisplay('getBackendVCLcode')).toBe(true);
        });

        it('if "Custom VCL Rules" is "ON" then should display '+
          '"Dynamic Origin DNS Name Lookups" in "Backends"', function () {
          expect(checkDisplay('getDynamicOriginDNSnameLookupsTxtIn')).toBe(true);
        });

        it('if "Custom VCL Rules" is "ON" then should display'+
          ' "Origin TCP Port" in "Backends"', function () {
          expect(checkDisplay('getOriginTCPportTxtIn')).toBe(true);
        });

        it('if "Custom VCL Rules" is "ON" then should display'+
          ' "Origin Host" in "Backends"', function () {
          expect(checkDisplay('getOriginHostTxtIn')).toBe(true);
        });

      });
    });
  });
});

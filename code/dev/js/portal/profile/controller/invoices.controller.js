(function () {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .controller('InvoicesController', InvoicesController);

  /*@ngInject*/
  function InvoicesController($scope, FileSaver, User, Companies, DTOptionsBuilder, DTColumnDefBuilder, AlertService, $stateParams) {
    $scope.params = $stateParams;
    $scope.user = User.getUser();
    $scope.dtOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(10)
      .withBootstrap()
      .withDOM('<<"pull-left"pl>f<t>i<"pull-left"p>>');
    $scope.initInvoices = function () {
      $scope._loading = true;

      User.getUserAccounts()
        .then(function ( accs ) {
          $scope.accounts = accs;
          if ( accs.length === 1 ) {
            $scope.account = accs[0];
          }
          return Companies.invoices({id: $scope.account.acc_id}).$promise;
        })
        .then(function (invoices) {
          $scope.invoices = invoices;
          return Companies.transactions({id: $scope.account.acc_id}).$promise;
        })
        .then(function (transactions) {
          $scope.transactions = transactions.map(function (t) {
            t.transaction_type = _.capitalize(t.transaction_type);
            t.success = JSON.parse(t.success);
            return t;
          });
        })
        .catch(function ( err ) {
          AlertService.danger('Oops! Something went wrong');
        })
        .finally(function () {
          $scope._loading = false;
        });

    };

    $scope.initInvoice = function () {
      $scope._loading = true;
      User.getUserAccounts()
        .then(function ( accs ) {
          $scope.accounts = accs;
          $scope.account = accs[0];
          return Companies.invoice({id: $scope.account.acc_id, invoice: $stateParams.id}).$promise;
        })
        .then(function (invoice) {
          $scope.invoice = invoice;
        })
        .catch(function ( err ) {
          AlertService.danger('Oops! Something went wrong');
        })
        .finally(function () {
          $scope._loading = false;
        });

    }

    $scope.savePdfStatement = function (id) {
      Companies.getPdfStatement({id: $scope.account.acc_id, invoice: $stateParams.id})
        .$promise
        .then(function (res) {
          FileSaver.saveAs(res.response, id + '.pdf');
        })
        .catch(function ( err ) {
          AlertService.danger('Oops! Something went wrong');
        });
    }

  }
})();


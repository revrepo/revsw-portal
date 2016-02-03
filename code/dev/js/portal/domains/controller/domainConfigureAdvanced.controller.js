(function() {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .controller('DomainsConfigureAdvancedController', DomainsConfigureAdvancedController);


  /*@ngInject*/
  function DomainsConfigureAdvancedController($scope, DomainsConfig, $timeout, AlertService, $stateParams) {

    $scope.id = $stateParams.id;

    $scope.clearDomain = function(model) {
      delete model.domain_name;
      delete model.cname;
      delete model.id;
      return model;
    };

    $scope._loading = false;

    $scope.obj = {
      data: {},
      options: {
        mode: 'code',
        modes: ['code', 'view'], // allowed modes['code', 'form', 'text', 'tree', 'view']
        error: function(err) {
          alert(err.toString());
        }
      }
    };

    $scope.loadDomainDetails = function() {
      DomainsConfig
        .get({
          id: $scope.id
        })
        .$promise
        .then(function(data) {
          $scope.domain = data;
          $scope.obj.data = $scope.clearDomain(data.toJSON());
        })
        .catch(function(err) {
          AlertService.danger(err);
        })
        .finally(function() {
          $scope._loading = false;
        });
    };

    $scope.$on('$stateChangeSuccess', function (state) {
      $scope.loadDomainDetails();
    });

    //$timeout(function() {
    //  $scope.obj.options.mode = 'code';
    //}, 10);

    $scope.verify = function() {
      if (!$scope.id) {
        AlertService.danger('Please select domain first');
        return;
      }
      $scope._loading = true;
      DomainsConfig.update({
          id: $scope.id,
          options: 'verify_only'
        }, $scope.obj.data)
        .$promise
        .then(function(data) {
          $scope.alertService.success('The domain configuration is correct', 5000);
        })
        .catch(function(err) {
          AlertService.danger(err);
        })
        .finally(function() {
          $scope._loading = false;
        });
    };

    $scope.publish = function() {
      if (!$scope.id) {
        AlertService.danger('Please select domain first');
        return;
      }
      $scope.confirm('confirmPublishModal.html', $scope.domain).then(function () {
        $scope._loading = true;
        DomainsConfig.update({
            id: $scope.id,
            options: 'publish'
          }, $scope.obj.data)
          .$promise
          .then(function(data) {
            $scope.alertService.success('Domain configuration is published', 5000);
          })
          .catch(function(err) {
            AlertService.danger(err);
          })
          .finally(function() {
            $scope._loading = false;
          });
      });
    };

    $scope.update = function() {
      if (!$scope.id) {
        AlertService.danger('Please select domain first');
        return;
      }
      $scope.confirm('confirmUpdateModal.html', $scope.domain).then(function () {
        $scope._loading = true;
        DomainsConfig.update({
            id: $scope.id
          }, $scope.obj.data)
          .$promise
          .then(function(data) {
            if (data.message) {
              AlertService.success(data.message, 5000);
            }
          })
          .catch(function(err) {
            if (err.data && err.data.message) {
              AlertService.danger(err.data.message);
            } else {
              AlertService.danger('Something wrong');
            }
          })
          .finally(function() {
            $scope._loading = false;
          });
      });
    };
  }
})();

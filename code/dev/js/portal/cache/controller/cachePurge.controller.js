(function() {
  'use strict';

  angular
    .module('revapm.Portal.Cache')
    .controller('CachePurgeController', CachePurgeController);

  /*@ngInject*/
  function CachePurgeController($scope, $state, Cache, DomainsConfig, AlertService, $timeout, $uibModal) {
    $scope._loading = false;

    // $scope.domain;
    $scope.json = {
      purges: [{
        url: {
          is_wildcard: true,
          expression: '/images/*.png'
        }
      }]
    };

    // $scope.exampleJsons for advanced cache
    if ($state.current.name === 'index.webApp.advanced'){
      $scope.exampleJsons =  [
        {
        'text': 'Purge all PNG files under /images, <b>non-recursive</b> (so e.g. files under /images/today/ will not be purged):',
        'json': {
        'purges': [
          {
            'url': {
              'is_wildcard': true,
              'expression': '/images/*.png'
            }
          }
        ]
       }
      },
        {
          'text': ' Purge all PNG files under /images, <b>recursive</b> (so e.g. files under /images/today/ will also be purged):',
          'json': {
          'purges': [
            {
              'url': {
                'is_wildcard': true,
                'expression': '/images/**/*.png'
              }
            }
          ]
         }
        },
        {
          'text': 'Purge everything, recursively, for current domain:',
          'json': {
          'purges': [
            {
              'url': {
                'is_wildcard': true,
                'expression': '/**/*'
              }
            }
          ]
        }
        }
      ];

      $scope.exampleJsons.forEach(function(item){
        item.json = JSON.stringify(item.json,null,2);
      });
    }

    $scope.text = '';

    $scope.options = {
      mode: 'code',
      modes: ['code', 'view'], // allowed modes['code', 'form', 'text', 'tree', 'view']
      error: function(err) {
        AlertService.danger(err.toString());
      }
    };

    /**
     * Purge cache using JSON
     */
    $scope.purge = function() {
      if (!$scope.domain) {
        return;
      }
      var json = angular.copy($scope.json);
      json.domainName = $scope.domain.domain_name;
      $scope._loading = true;
      Cache.purge({}, json)
        .$promise
        .then(function(data) {
          AlertService.success(data);
        })
        .catch(function(err) {
          AlertService.danger(err, 5000);
        })
        .finally(function() {
          $scope._loading = false;
        });
    };

    $scope.purgeText = function() {
      if (!$scope.text || !$scope.domain) {
        return;
      }
      var json = {
        domainName: $scope.domain.domain_name,
        purges: []
      };
      var list = $scope.text.split('\n');
      list.forEach(function(val) {
        json.purges.push({
          url: {
            is_wildcard: true,
            expression: val
          }
        });
      });
      $scope._loading = true;
      Cache.purge({}, json)
        .$promise
        .then(function(data) {
          AlertService.success(data);
        })
        .catch(function(err) {
          AlertService.danger(err);
        })
        .finally(function() {
          $scope._loading = false;
        });
    };
    /**
     * @name  purgeDefaultText
     * @description
     *
     *
     * @return {[type]} [description]
     */
    $scope.purgeDefaultText = function() {
      if (!$scope.domain) {
        return;
      }
      $scope
        .confirm('confirmModal.html', $scope.domain)
        .then(function() {
          var domainName = $scope.domain.domain_name;
          $scope._loading = true;
          Cache.purge({}, json)
            .$promise
            .then(function(data) {
              AlertService.success(data);
            })
            .catch(function(err) {
              AlertService.danger(err);
            })
            .finally(function() {
              $scope._loading = false;
            });
        });
      var json = {
        domainName: $scope.domain.domain_name,
        purges: [{
          'url': {
            'is_wildcard': true,
            'expression': '/**/*'
          }
        }, {
          'url': {
            'is_wildcard': true,
            'expression': '/'
          }
        }, {
          'url': {
            'is_wildcard': true,
            'expression': '/**'
          }
        }]
      };
    };
    /**
     * Get editor instance
     */
    $scope.jsonEditorEvent = function(instance) {
      $scope.jsonEditorInstance = instance;
    };

    /**
     * Set watcher on json editor's text to catch json validation error
     */
    $scope.$watch('jsonEditorInstance.getText()', function(val) {
      // if editor text is empty just return
      if (!val) {
        $scope.jsonIsInvalid = false;
        return;
      }

      // try to parse editor text as valid json and check if at least one item exists, if yes then enable Purge button
      try {
        var json = JSON.parse(val);
        $scope.jsonIsInvalid = !json || !Object.keys(json).length;
      } catch (err) {
        // if it's not valid json or it's empty disable Purge button
        $scope.jsonIsInvalid = true;
      }
    });


    /**
     * Confirmation dialog
     *
     * @param {string=} [template]
     * @param {Object=} [resolve]
     * @returns {*}
     */
    $scope.confirm = function(template, resolve) {
      if (angular.isObject(template)) {
        resolve = template;
        template = '';
      }
      if (angular.isObject(resolve)) {
        resolve = {
          model: resolve
        };
      }
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: template || 'parts/modal/confirmDelete.html',
        controller: 'ConfirmModalInstanceCtrl',
        size: 'md',
        resolve: resolve || {}
      });

      return modalInstance.result;
    };

    /**
     * Copy example to json editor
     */
    $scope.copyToJsonEditor = function(item) {
      if (angular.isObject($scope.json)) {
        $scope.jsonEditorInstance.setText(item.json);
      } else {
        angular.extend($scope.json, JSON.parse(item.json));
      }
    };
  }
})();

(function (angular, empty) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .factory('CRUDController', CRUDController);

  /*@ngInject*/
  function CRUDController($config, $rootScope, AlertService, $q, User, $anchorScroll, $uibModal, $filter, $timeout, $animate, $state, $localStorage) {

    function CRUDControllerImpl($scope, $stateParams) {

      /***************************************************************************************
       *****                           VARIABLES INITIALIZATION SECTION
       **************************************************************************************/

      $scope.auth = User;

      /**
       * Alert service
       */
      $scope.alertService = AlertService;

      /**
       * Loading flag
       *
       * @access private
       * @type {boolean}
       */
      $scope._loading = false;

      /**
       * Current state
       *
       * @type {string}
       */
      $scope.state = '';

      /**
       * List of routing params
       */
      $scope.params = $stateParams;

      /**
       * Resource that will be used for work with data
       * @type {object|null}
       */
      $scope.resourse = null;

      /**
       * List of loaded records
       *
       * @type {Array}
       */
      $scope.records = [];

      /**
       * List of loaded records with applyed filter
       *
       * @type {Array}
       */
      $scope.filteredRecords = [];

      /**
       * Selected model
       * @type {object|null}
       */
      $scope.model = null;

      /**
       * Filter field value
       * @type {string}
       */
      $scope.quickFilter = '';

      /**
       * List of fields that not allowed
       * @type {Array}
       */
      $scope.deniedFields = [];

      /**
       * Base filter for loaded records.
       * This filter will be applied before any others.
       * Result of this filter will be stored in {@link $scope.records}
       * If `false` will be ignored
       *
       * @type {Object|boolean}
       * @private
       */
      $scope._baseFilter = false;

      /**
       * Page settings
       *
       * @type {object}
       */
      $scope.page = {
        hasPrevPage: false,
        hasNextPage: true,
        current: 1,
        pages: [1]
      };

      /**
       * Filters to make pagination
       *
       * @type {object}
       */
      $scope.filter = {
        filter: '',
        limit: $config.DEFAULT_LIMIT_RECORDS_IN_TABLE,
        skip: 0,
        predicate: '',
        reverse: false
      };

      /**
       * Filters keys for the filter
       *
       * @type {array}
       */
      $scope.filterKeys = [];
      /**
       * List actions dependencies for data return
       *
       * @type {array<Promises>}
       */
      $scope.dependencies = [];
      /**
       * Private property for store filter settings
       *
       * @type {String}
       */
      var storageNameFilter_;
      /***************************************************************************************
       *****                       END VARIABLES INITIALIZATION SECTION
       **************************************************************************************/

      /***************************************************************************************
       *****                              FILTER APPLY SECTION
       **************************************************************************************/

      $scope._delayTimeout = null;

      /**
       * Apply filter for list
       *
       * @private
       */
      $scope._applyFilter = function () {
        var filtered,
          i,
          res,
          compareValue;

        // pay attention to the $scope.filter.filter - should be a string;
        // checks if filter value is string and not blank + checks the length of filterKeys to be not empty
        if (_.isString($scope.filter.filter) && $scope.filter.filter.length > 0 && $scope.filterKeys.length > 0) {
          // filters over the array
          filtered = _.filter($scope.records, function (record) {
            //checks for each key
            //if value is found returns true
            for (i = 0; i < $scope.filterKeys.length; i++) {
              compareValue = record[$scope.filterKeys[i]];
              if (compareValue) {
                //checks if date
                if (moment(compareValue, moment.ISO_8601).isValid()) {
                  //formats as date obj
                  compareValue = new Date(compareValue);
                }
                res = (compareValue.toString().toLowerCase().indexOf($scope.filter.filter.toLowerCase()) !== -1);
              }
              if (res) {
                return res;
              }
            }
          });
        } else {
          filtered = $filter('filter')($scope.records, $scope.filter.filter);
        }
        $scope.filteredRecords = $filter('orderBy')(filtered, $scope.filter.predicate, $scope.filter.reverse);
        $scope._checkPagination();
      };

      /**
       * Manually filter list of records with 300ms delay
       *
       * Delay added for UX. Without it function might be called on every letter in filter field.
       * So it will be invokd lot of times and might break output.
       */
      $scope.filterList = function () {
        if ($scope._delayTimeout) {
          $timeout.cancel($scope._delayTimeout);
          $scope._delayTimeout = null;
        }
        $scope._delayTimeout = $timeout($scope._applyFilter, 300);
      };

      /**
       * Will watch filter to be able to apply it
       */
      $scope.$watch('filter', function (newVal, oldVal) {
        // NOTE: store filter settings if set value for the private property "storageNameFilter_"
        if (storageNameFilter_ && (newVal !== oldVal)) {
          $localStorage[storageNameFilter_] = newVal;
        }
        // Apply filters here
        $scope.filterList();
      }, true);

      /***************************************************************************************
       *****                            END FILTER APPLY SECTION
       **************************************************************************************/

      /***************************************************************************************
       *****                       MODAL INITIALIZATION SECTION
       **************************************************************************************/

      /**
       * Confirmation dialog
       *
       * @param {string=} [template]
       * @param {Object=} [resolve]
       * @returns {*}
       */
      $scope.confirm = function (template, resolve) {
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
          animation: false,
          templateUrl: template || 'parts/modal/confirmDelete.html',
          controller: 'ConfirmModalInstanceCtrl',
          size: 'md',
          resolve: resolve || {}
        });

        return modalInstance.result;
      };

      /***************************************************************************************
       *****                       END MODAL INITIALIZATION SECTION
       **************************************************************************************/

      /**
       * Getter and setter for {@link $scope._loading} property
       *
       * @param {boolean?} [loading]
       * @returns {boolean}
       */
      $scope.loading = function (loading) {
        if (angular.isUndefined(loading)) {
          return $scope._loading;
        }
        $scope._loading = Boolean(loading);
      };

      /**
       * Set {@link $scope.state} property
       *
       * @param {string} state
       */
      $scope.setState = function (state) {
        if (!state) {
          throw new Error('Wrong state provided.');
        }
        $scope.state = state;
      };

      /**
       * Clear quick filter value
       *
       * @param {string=} [filter] filter to clear otherwise {@link $scope.quickFilter} will be cleared
       */
      $scope.clearQuickFilter = function (filter) {
        if (filter) {
          filter = '';
        } else {
          $scope.quickFilter = '';
        }
      };

      /**
       * Clears model record.
       *
       * @param {object=} [model]
       */
      $scope.clearModel = function (model) {
        if (!model) {
          model = $scope.model;
        }
        angular.forEach(model, function (val, key) {
          model[key] = '';
        });
        model = null;
      };

      /**
       * Will remove all elements from array of records.
       */
      $scope.clearList = function () {
        $scope.records.splice(0, $scope.records.length);
        $scope.filteredRecords.splice(0, $scope.filteredRecords.length);
      };

      /**
       * Set resource for future using
       *
       * @param {object} resource
       */
      $scope.setResource = function (resource) {
        $scope.resource = resource;
      };

      /**
       * Set fields that not allowed
       *
       * @param {Array} fields
       */
      $scope.setDeniedFields = function (fields) {
        if (!angular.isArray(fields)) {
          return;
        }
        $scope.deniedFields = fields;
      };
      /**
       * Set name for store filter settings
       *
       * @param {String} fields
       */
      $scope.setStorageNameForFilterSettings = function(name){
        storageNameFilter_ = name;
      };

      /**
       * Scroll to top of the page *only if theres only one pagination on the page* -- fix for page scrolling up when not needed
       */
      $scope.scrollTop = function () {
        if (document.querySelectorAll('crud-pagination').length > 2) {
          return false;
        } else {
          $anchorScroll('top');
        }
      };

      /**
       * Order by some field
       *
       * @param {string} predicate
       */
      $scope.order = function (predicate) {
        $scope.filter.reverse = ($scope.filter.predicate === predicate) ? !$scope.filter.reverse : false;
        $scope.filter.predicate = predicate;
      };

      /**
       * Check if user is not on the 1st page. he will be send there.
       */
      $scope.checkFilterPage = function () {
        if ($scope.filter.skip > 0) {
          $scope.goToPage(1);
        }
      };

      /***************************************************************************************
       *****                             PAGINATION SECTION
       **************************************************************************************/

      /**
       * This method will check if next page is available and prev one.
       *
       * @private
       */
      $scope._checkPagination = function () {
        if (!$scope.filteredRecords) {
          return;
        }
        if ($scope.filteredRecords.length < ($scope.filter.limit + $scope.filter.skip)) {
          $scope.page.hasNextPage = false;
        } else {
          $scope.page.hasNextPage = true;
        }
        if ($scope.filter.skip > 0) {
          $scope.page.hasPrevPage = true;
        } else {
          $scope.page.hasPrevPage = false;
        }
        var pages = Math.ceil($scope.filteredRecords.length / $scope.filter.limit);
        $scope.page.pages.splice(0, $scope.page.pages.length);
        for (var i = 1; i <= pages; i++) {
          $scope.page.pages.push(i);
        }
        $scope.page.current = Math.ceil($scope.filter.skip / $scope.filter.limit) + 1;
      };

      /**
       * Load next records
       */
      $scope.nextPage = function () {
        if (!$scope.page.hasNextPage) {
          return;
        }
        if ($scope.page.current === $scope.page.pages.length) {
          return;
        }
        $scope.filter.skip += $scope.filter.limit;
        $scope._checkPagination();
        $scope.scrollTop();
      };

      /**
       * Load prev records
       */
      $scope.prevPage = function () {
        if (!$scope.page.hasPrevPage) {
          return;
        }
        $scope.filter.skip -= $scope.filter.limit;
        if ($scope.filter.skip < 0) {
          $scope.filter.skip = 0;
        }
        $scope._checkPagination();
        $scope.scrollTop();
      };

      /**
       * List of pages
       *
       * @param {number} page
       */
      $scope.goToPage = function (page) {
        if ($scope.page.current === page) {
          return;
        }
        $scope.page.current = page;
        $scope.filter.skip = (page * $scope.filter.limit) - $scope.filter.limit;
        $scope._checkPagination();
        $scope.scrollTop();
      };

      /***************************************************************************************
       *****                                  END PAGINATION SECTION
       **************************************************************************************/


      /***************************************************************************************
       *****                                  BASE ACTIONS SECTION
       **************************************************************************************/


      /**
       * Loads list of models
       *
       * @see $scope#_checkPagination()
       * @throws Error is not {@link $scope.resource} provided
       * @returns {Promise}
       */
      $scope.list = function (data) {
        if (!$scope.resource) {
          throw new Error('No resource provided.');
        }
        $scope.loading(true);
        //fetching data
        return $scope.resource
          .query(data, function (data) {
            // NOTE: control data type
            if (!angular.isArray(data)) {
              // no data for display in a list
              $scope.records = null;
              return null;
            }
            if (!$scope._baseFilter) {
              $scope.records = data;
            } else {
              $scope.records = $filter('filter')(data, $scope._baseFilter, true);
            }
            $scope.filterList(); // Apply filters
            $scope._checkPagination();
            return data; // Send data to future promise
          }, function () {
            $scope.records = null;
            return null;
          }).$promise
          .then(function(data){
            // NOTE: get additional data for controller and execute additional actions with data
            return $scope.dependenciesData()
              .then($scope.dependenciesListAction)
              .catch(function(err) {
                $scope.alertService.danger(err);
                return data;
              })
              .then(function() { return data; });
          })
          .finally(function () {
            $scope.loading(false);
          });
      };

      /**
       * Delete a model from list
       *
       * @throws Error if not {@link $scope.resource} provided
       * @param {object} model
       */
      $scope.delete = function (model) {
        if (!model) {
          return;
        }
        if (!angular.isFunction(model.$remove)) {
          throw new Error('Wrong model provided.');
        }
        // loading model
        model.loading = true;
        // NOTE: user resource method "remove" for delete data.
        return $scope.resource.remove({
            id: model.id
          }).$promise
          .then(function (data) {
            $rootScope.$broadcast('update:searchData');
            if (data.statusCode === $config.STATUS.OK || data.statusCode === $config.STATUS.ACCEPTED) {
              // NOTE: delete item from arrays
              var idx = _.findIndex($scope.records, function (item) {
                return item.id === model.id;
              });
              if (idx > -1) {
                $scope.records.splice(idx, 1);
                $scope.filterList();
              }
              // var idx_f = _.findIndex($scope.filteredRecords, function(item) {
              //   return item.id === model.id;
              // });
              // if (idx_f > -1) {
              //   $scope.filteredRecords.splice(idx_f, 1);
              // }
            }
            return data;
          })
          .finally(function () {
            model.loading = false;
          });
      };

      /**
       * @name  create
       * @description
       *
       *   Create a new record
       *
       * @param  {Object}  model  [description]
       * @param  {Boolean} isStay [description]
       * @return {Promise}         [description]
       */
      $scope.create = function (model, isStay) {
        if (!$scope.resource) {
          throw new Error('No resource provided.');
        }
        $scope.loading(true);
        var record = new $scope.resource(model);
        return record.$save()
          .then(function (data) {
            $rootScope.$broadcast('update:searchData');
            $scope.clearModel(model);
            if (isStay === true) {
              return $q.resolve(data); // Send data next to promise handlers
            } else {
              $state.go('.^'); // NOTE: go to up to list from new state
              return $scope.list().then(function () {
                // NOTE: set sort for see new record on top of list
                $scope.filter.predicate = 'updated_at';
                $scope.filter.reverse = true;
                $scope.goToPage(1);
                $scope.elementIndexForAnchorScroll = 'anchor0';
                return $q.resolve(data);
              }); // Update list
            }
          })
          .catch(function (data) {
            return $q.reject(data);
          })
          .finally(function () {
            $scope.loading(false);
          });
      };

      /**
       * Load details about record
       *
       * @param {string|number} id
       * @returns {Promise}
       */
      $scope.get = function (id) {
        if (!$scope.resource) {
          throw new Error('No resource provided.');
        }
        $scope.clearModel();
        $scope.loading(true);
        return $scope.resource
          .get({
            id: id
          })
          .$promise
          .then(function (record) {
            $scope.model = record;
            return record;
          })
          .finally(function () {
            $scope.loading(false);
          });
      };

      /**
       * Update model data
       *
       * @param {object} [params]
       * @param {object} model
       * @returns {Promise}
       */
      $scope.update = function (params, model) {
        if (angular.isObject(params) && !model) {
          model = params;
          params = undefined;
        }
        var id = model.id;
        if (!params) {
          params = {
            id: id
          };
        }
        angular.forEach($scope.deniedFields, function (val) {
          if (model[val]) {
            delete model[val];
          }
        });
        $scope.loading(true);
        // Send data
        return $scope.resource
          .update(params, model)
          .$promise
          .then(function (data) {
            $rootScope.$broadcast('update:searchData');
            $scope.list(); // Update list
            $scope.$emit('list');
            return data;
          })
          .finally(function () {
            $scope.loading(false);
          });
      };

      $scope.$on('list', function () {
        $scope.list();
      });

      /***************************************************************************************
       *****                             END BASE ACTIONS SECTION
       **************************************************************************************/

      /***************************************************************************************
       *****                                  SCROLL ANCHOR POSITION SECTION
       **************************************************************************************/

      $scope.saveAnchorScrollIndex = saveAnchorScrollIndex;
      $scope.elementIndexForAnchorScroll = empty;

      /**
       * Save anchor index
       *
       * @param {Number} index of the clicked element
       */
      function saveAnchorScrollIndex($index) {
        $scope.elementIndexForAnchorScroll = $index;
      }

      /***************************************************************************************
       *****                             END SCROLL POSITION HANDLER SECTION
       **************************************************************************************/

      $scope.setDefaultAccountId = function () {
        if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
          if (!!$scope.companies && $scope.companies.length === 1) {
            $scope.model.account_id = $scope.companies[0].id;
          }
        } else {
          $scope.model.account_id = $scope.auth.getUser().account_id;
        }
      };

      $scope.fetchCompanies = function (companyIds) {
        var promises = [];
        if (!companyIds) {
          return $q.when([]);
        }
        companyIds.forEach(function (id) {
          promises.push(Companies.get({
            id: id
          }).$promise);
        });
        return $q.all(promises).then(function (data) {
          $scope.companies = data;
        });
      };
      /**
       * @name isReadOnly
       * @description
       *
       * @return {Boolean}
       */
      $scope.isReadOnly = $scope.auth.isReadOnly;

      /**
       * @name onGoToAccountInformation
       * @description action for go to page "All Account Resources"
       *
       */
      $scope.onGoToAccountInformation = function (e, model) {
        e.preventDefault();
        // NOTE: make data format for using into state 'index.accountSettings.companies_information'

        model.acc_id = model.account_id !== undefined ? model.account_id : model.id;

        // fix for users list
        if (model.account_id !== undefined) {
          model.acc_id = model.account_id;
        }
        User.selectAccount(model);
        $state.go('index.accountSettings.accountresources');
      };

      $scope.getRelativeDate = function (datetime) {
        return moment.utc(datetime).fromNow();
      };

      $scope.dependenciesData = function(){
        if($scope.dependencies.length>0){
          var keys = [];
          var promises = [];
          for(var index in $scope.dependencies){
            var depObj= $scope.dependencies[index];
            for(var key in depObj ){
              keys.push(key);
              promises.push(depObj[key]);
            }
          }
          return $q.all(promises).then(function(data){
            var response = {};
            for(var i=0; i< keys.length;i++){
              response[keys[i]]=data[i];
            }
            return $q.when(response);
          });
        }else{
          return $q.when({});
        }
      };

      // NOTE: default action after load list of data
      $scope.dependenciesListAction = function(data){
        return $q.when({success: true});
      };
    }

    return CRUDControllerImpl;
  }
})(angular);

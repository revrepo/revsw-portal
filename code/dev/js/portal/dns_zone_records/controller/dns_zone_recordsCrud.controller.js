(function() {
  'use strict';

  angular
    .module('revapm.Portal.DNSZoneRecords')
    .controller('DNSZoneRecordsCrudController', DNSZoneRecordsCrudController);

  /*@ngInject*/
  function DNSZoneRecordsCrudController($rootScope, $scope, $timeout,
    $localStorage,
    CRUDController,
    DNSZones,
    DNSZoneRecords,
    DNSZoneRecordsAnswerParser,
    $injector,
    $stateParams,
    $config,
    Companies,
    $http,
    $q,
    $state,
    $anchorScroll,
    $uibModal) {

    $scope.DNS_DEFAULT_VALUES = $config.DNS_DEFAULT_VALUES;
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });
    //Set state (ui.router)
    $scope.setState('index.dnsServices.dns_zone_records');

    $scope.setResource(DNSZoneRecords);

    $scope.dnsZoneId = $stateParams.dns_zone_id;
    // NOTE: get
    DNSZones.get({ id: $stateParams.dns_zone_id }).$promise
      .then(function setCurrentZoneInfo(data) {
        $scope.zone_name = data.zone;
      });
    // Fetch list of records
    $scope.$on('$stateChangeSuccess', function(state, stateTo, stateParams) {
      $scope.dnsZoneId = $stateParams.dns_zone_id || stateParams.dns_zone_id;
      if ($state.is($scope.state)) {
        $scope.list({ dns_zone_id: $stateParams.dns_zone_id })
          .then(function() {
            if ($scope.elementIndexForAnchorScroll) {
              setTimeout(function() {
                $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
                $scope.$digest();
              }, 500);
            }
          });
      } else {        
        //$scope.clearModel();
      }
    });

    // $scope.filterKeys = ['domain', 'companyName', 'expires_at', 'domains', 'updated_at'];

    $scope.locations = [];
    $scope.companies = [];


    /**
     * @name prepareDNSZoneRecordToUpdate
     * @description
     *
     * @param  {[type]} model_current [description]
     * @return {[type]}               [description]
     */
    $scope.prepareDNSZoneRecordToUpdate = function(model_current) {
      var model;
      // TODO: review
      if (model_current.toJSON === undefined) {
        model = _.clone(model_current, true);
      } else {
        model = _.clone(model_current.toJSON(), true);
      }
      delete model.id;
      delete model.created_by;
      delete model.created_at;
      delete model.updated_at;
      delete model.expires_at;
      delete model.domains;
      delete model.last_published_ssl_config_version;

      return model;
    };

    // $scope.setAccountId = function() {
    //   if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
    //     // Loading list of companies
    //     Companies.query(function(list) {
    //       $scope.companies = list;
    //       if ($scope.companies.length === 1) {
    //         $scope.model.account_id = $scope.companies[0].id;
    //       }
    //     });
    //   } else if (!angular.isArray($scope.auth.getUser().companyId)) {
    //     $scope.model.account_id = $scope.auth.getUser().companyId;
    //   } else if ($scope.auth.getUser().companyId.length === 1) {
    //     $scope.model.account_id = $scope.auth.getUser().companyId[0];
    //   } else {
    //     $scope.fetchCompanies($scope.auth.getUser().companyId);
    //   }
    // };

    // $scope.setAccountId(); //TODO: delete - not need

    $scope.getDNSZoneRecord = function(id) {
      $scope.get(id)
        .then(function() {
          $scope.record = $scope.model;
        })
        .catch(function(err) {
          $scope.alertService.danger('Could not load DNS Record');
        });

    };
    /**
     * @name  deleteDNSZoneRecord
     * @description
     *
     * @param  {Object} model
     * @return
     */
    $scope.deleteDNSZoneRecord = function(model) {
      // NOTE: not delete if RO user
      if($scope.isReadOnly() === true){
        return;
      }
      var model_ = {
        delrec: model,
        zone: $scope.zone_name
      };
      $scope.confirm('confirmModal.html', model_).then(function() {
        var domain = model.domain;
        model.dns_zone_id = $scope.dnsZoneId;
        $scope
          .delete(model)
          .then(function(data) {
            $scope.alertService.success(data);
            $scope.list({ dns_zone_id: $stateParams.dns_zone_id });
            // .then(setAccountName);
          })
          .catch($scope.alertService.danger);
      });
    };

    /**
     * @name  createDNSZoneRecord
     * @description
     *
     * Create new DNS Zone Record
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.createDNSZoneRecord = function(model, isStay) {
      model.rec.zone = $scope.zone_name; //decodeURIComponent($routeParams.zone);      
      var idomain = model.idomain;
      if (idomain) {
        if (idomain.slice(-1) === '.') {
          model.rec.domain = idomain + model.rec.zone;
        } else {
          model.rec.domain = idomain + '.' + model.rec.zone;
        }
      } else {
        model.rec.domain = model.rec.zone;
      }
      if ((!model.newanswer || model.newanswer === {}) && !model.advanced) {
        var create_error = 'No answer value specified';
        $scope.alertService.danger(create_error);
        return;
      } else if (Object.keys(model.newanswer).length) {
        model.rec.answers = [{
          answer: DNSZoneRecordsAnswerParser.parse(model.rec.type, model.newanswer)
        }];
      } else {
        model.rec.answers = [];
      }
      if (!!model.newanswer  && model.newanswer.link) {
        model.rec.link = model.newanswer.link;
        model.rec.answers = [];
      }

      var newDNSZoneRecord = {
        dns_zone_id: $scope.dnsZoneId,
        domain: model.rec.domain,
        type: model.rec.type,
        record: model.rec
      };

      $scope
        .create(newDNSZoneRecord, isStay)
        .then(function(data) {
          if(isStay===true){
            // NOTE: set default values
            model.rec.ttl = 3600;// NOTE: set default TTL
            model.rec.type = 'A';
            model.idomain = '';
            model.rec.answers = [];
            model.newanswer = null;
          }
          $scope.alertService.success(data);
        })
        .catch($scope.alertService.danger);
    };
    /**
     * @name  updateDNSZoneRecord
     * @description
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.updateDNSZoneRecord = function(model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmUpdateModal.html', model).then(function() {
        model = $scope.prepareDNSZoneRecordToUpdate(model);
        $scope.update({
            id: modelId,
            dns_zone_id: $scope.dnsZoneId
          }, model)
          .then($scope.alertService.success)
          .catch($scope.alertService.danger);
      });
    };

    $scope.storeToStorage = function(model) {
      alert('a');
      $localStorage.selectedDomain = model;
    };

    $scope.disableSubmit = function(model, isEdit) {
      if (!isEdit) {
        return $scope._loading ||
          !model.cert_name ||
          (!model.account_id && !$scope.model.account_id) ||
          !model.public_ssl_cert ||
          !model.private_ssl_key;
      } else {
        return $scope._loading ||
          (!model.account_id && !$scope.model.account_id) ||
          !model.public_ssl_cert ||
          !model.private_ssl_key;
      }
    };

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };

    $scope.reverse_permitted = function(record_type) {
      //TODO: check $scope.hasfeature('reverse_record')
      // return (record_type === 'A' || record_type === 'AAAA') && $scope.hasfeature('reverse_record')
      return (record_type === 'A' || record_type === 'AAAA');
    };

    //confirmNewAnswerModal
    $scope.onAddNewAnswer = function(model) {
      var model_ = {
        record: $scope.model,
        newanswer: {
          answer: []
        }
      };
      $scope.confirm('confirmNewAnswerModal.html', model_)
        .then(function(data) {
          $scope.model.answers.push(model_.newanswer);
        });
    };
    // confirmDeleteModal
    $scope.onRemoveAnswer = function($index) {
      // NOTE: not delete if RO user
      if($scope.isReadOnly() === true){
        return;
      }
      var model_ = {
        record: $scope.model,
        zone: $scope.zone_name,
        index: $index
      };
      $scope.confirm('confirmDeleteModal.html', model_).then(function() {
        $scope.model.answers.splice($index, 1);
      });
    };
    //==============================
    // Override method
    /**
     * Load details about record
     *
     * @param {string|number} id
     * @returns {Promise}
     */
    $scope.get = function(id) {
      if (!$scope.resource) {
        throw new Error('No resource provided.');
      }
      //$scope.clearModel();
      $scope.loading(true);
      return $scope.resource
        .get({
          id: id,
          dns_zone_id: $scope.dnsZoneId
        })
        .$promise
        .then(function(record) {
          $scope.model = record;
          return record;
        })
        .finally(function() {
          $scope.loading(false);
        });
    };
    // Override method
    $scope.delete = function(model) {
      // NOTE: not delete if RO user
      if($scope.isReadOnly() === true){
        return;
      }
      if (!model) {
        return;
      }
      if (!angular.isFunction(model.$remove)) {
        throw new Error('Wrong model provided.');
      }
      // loading model
      model.loading = true;
      // NOTE: user resource method 'remove' for delete data.
      return $scope.resource.remove({
          id: model.id,
          dns_zone_id: $scope.dnsZoneId
        }).$promise
        .then(function(data) {
          $rootScope.$broadcast('update:searchData');
          if (data.statusCode === $config.STATUS.OK || data.statusCode === $config.STATUS.ACCEPTED) {
            // NOTE: delete item from arrays
            var idx = _.findIndex($scope.records, function(item) {
              return item.id === model.id;
            });
            if (idx > -1) {
              $scope.records.splice(idx, 1);
              $scope.filterList();
            }
          }
          return data;
        })
        .finally(function() {
          model.loading = false;
        });
    };
    //
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
    $scope.create = function(model, isStay) {
      if (!$scope.resource) {
        throw new Error('No resource provided.');
      }
      $scope.loading(true);
      var record = new $scope.resource(model);
      return record.$save()
        .then(function(data) {
          $rootScope.$broadcast('update:searchData');
          //$scope.clearModel(model);
          if (isStay === true) {
            return $q.resolve(data); // Send data next to promise handlers
          } else {
            $state.go('.^'); // NOTE: go to up to list from new state
            return $scope.list({ dns_zone_id: $stateParams.dns_zone_id }).then(function() {
              // NOTE: set sort for see new record on top of list
              $scope.filter.predicate = 'updated_at';
              $scope.filter.reverse = true;
              $scope.goToPage(1);
              $scope.elementIndexForAnchorScroll = 'anchor0';
              return $q.resolve(data);
            }); // Update list
          }
        })
        .catch(function(data) {
          return $q.reject(data);
        })
        .finally(function() {
          $scope.loading(false);
        });
    };

    /**
      * Window AutoDiscover dialog
      *
      * @param {string=} [template]
      * @param {Object=} [resolve]
      * @returns {*}
      */
    $scope.windowAutoDiscover = function(template, resolve) {
      if(angular.isObject(template)) {
        resolve = template;
        template = '';
      }
      if(angular.isObject(resolve)) {
        resolve = {
          model: resolve
        };
      }
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: template || 'parts/modal/confirmDelete.html',
        // NOTE: use specific controller for additional actions
        controller: 'dnsZoneAutoDiscoverZoneRecordsModalController',
        size: 'lg modal-dialog--max-size',
        resolve: resolve || {}
      });

      return modalInstance.result;
    };
    /**
     * @name onOpenAutoDiscoverZoneRecords
     */
    $scope.onOpenAutoDiscoverZoneRecords = function(zoneName) {
      if(!zoneName || zoneName.length === 0) {
        return;
      }
      var model_ = {
        dns_zone_id: $scope.dnsZoneId,
        zone_name: zoneName,
        _loading: true
      };
      // NOTE: show main work window
      $scope.windowAutoDiscover('processAutoDiscover.html', model_)
        .then(function(data){
          if(data === true){
            $scope.list({ dns_zone_id: $stateParams.dns_zone_id });
          }
        });
      // NOTE: get data for show in modal window
      DNSZoneRecords.autoDiscover(model_).$promise
        .then(function(data) {
          _.merge(model_, {
            zone_records: angular.copy(data.zone_records)
          });
          // NOTE: add additional properties
          angular.forEach(model_.zone_records, function(item) {
            var existRecords = _.where($scope.records, { type: item.type, domain: item.domain });
            item.$$isExists = (existRecords.length>0);
            item.$$isDifferentExist = true; // NOTE: value by default
            if(item.$$isExists){
              // NOTE: add additional data -  "short_answers"
              item.short_answers = _.map(item.answers, function(itemAnswer) {
                return itemAnswer.answer.join(' ');
              });
              // NOTE: make an alternative collection with short answers
              // add a dot at the end of our local answers
              var shortAnswersAlternative = _.map(item.answers, function(itemAnswer) {
                return itemAnswer.answer.join(' ')+'.';
              });

              if(existRecords[0].short_answers.length === item.short_answers.length){
                // Exists With Different Answer(s)
                item.$$isDifferentExist = false;
                _.forEach(existRecords[0].short_answers,function(itemShortAnswer){
                  if(_.indexOf(item.short_answers, itemShortAnswer) === -1 &&
                    _.indexOf(shortAnswersAlternative, itemShortAnswer) === -1){
                    item.$$isDifferentExist = true;
                  }
                });
              }else{
                item.$$isDifferentExist = true;
              }
            }
          });
        })
        .catch(function(err){
          $scope.alertService.danger(err);
          angular.merge(model_, {
            zone_records: []
          });
        })
        .finally(function() {
            model_._loading = false;
        });
    };

  }
})();

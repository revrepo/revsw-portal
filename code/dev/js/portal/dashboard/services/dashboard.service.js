(function() {
  'use strict';
  //http://www.slideshare.net/RajthilakMCA/awesome-dash-angular-js-42552385
  angular
    .module('revapm.Portal.Dashboard')
    .service('DashboardSrv', DashboardSrv)
    .run( /*ngInject*/ function(DashboardSrv) {
      DashboardSrv.getAll();
    });

  function DashboardSrv($q, $http, $localStorage, $config) {
    'ngInject';
    var API_URL = 'http://localhost:3003/v1';
    var dashboardsList = [],
      _del = [{
        "id": "00001",
        "title": "Dashboard 1",
        "structure": "6-6",
        "rows": [{
          "columns": [{
            "styleClass": "col-md-6",
            "widgets": [],
            "cid": "1458098751084-1"
          }, {
            "styleClass": "col-md-6",
            "widgets": [],
            "cid": "1458098751088-2"
          }]
        }],
        "titleTemplateUrl": "parts/dashboard/dashboard-title.tpl.html"
      }, {
        "id": "000002",
        "title": "Dashboard 2",
        "structure": "6-6",
        "rows": [{
          "columns": [{
            "styleClass": "col-md-6",
            "widgets": [],
            "cid": "1458098751084-1"
          }, {
            "styleClass": "col-md-6",
            "widgets": [],
            "cid": "1458098751088-2"
          }]
        }],
        "titleTemplateUrl": "parts/dashboard/dashboard-title.tpl.html"
      }];

    return {
      dashboardsList: dashboardsList,
      /**
       * @name getAll
       * @description get all user`s dashboards
       * @return {Promise}
       */
      getAll: function() {
        var deferred = $q.defer();
        $http.get(API_URL + '/dashboards')
          .success(function(data) {
            angular.forEach(data.dashboards, function(item) {
              dashboardsList.push(item)
            })
            deferred.resolve(data.dashboards);
          })
          .error(function() {
            deferred.reject();
          });
        deferred.resolve(dashboardsList)
        return deferred.promise;
      },
      /**
       * @name get
       * @description
       * @param  {String} id - dashdoars ID
       * @return {Promise}
       */
      get: function(id) {
        var deferred = $q.defer();
        // return $q.when($localStorage[id]);
        // var deferred = $q.defer();
        //TODO:
        $http.get(API_URL + '/dashboards/' + id)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function() {
            deferred.reject();
          });
        return deferred.promise;

      },
      create: function(data) {
        var deferred = $q.defer();
        var model = {
          "title": "New Dashboard ",
          "titleTemplateUrl": "parts/dashboard/dashboard-title.tpl.html",
          // "editTemplateUrl": 'parts/dashboard/dashboard-title.tpl.html',
          "structure": "6-6",
          "rows": [{
            "columns": [{
              "styleClass": "col-md-6",
              "widgets": []
            }, {
              "styleClass": "col-md-6",
              "widgets": []
            }]
          }]
        };
        // data.editTemplateUrl='parts/dashboard/dashboard-title.tpl.html';
        console.log(data)
        angular.extend(model, data)
          // this.dashboardsList.push(model);
          // console.log(this.dashboardsList)
        var dashboardsList = this.dashboardsList
        $http.post(API_URL + '/dashboards/', model)
          .success(function(data) {
            console.log('create', data)
            model.id = data.id
            dashboardsList.push(model);
            deferred.resolve(model);
          })
          .error(function() {
            deferred.reject();
          });
        return deferred.promise;
      },
      /**
       * @name  set
       * @description
       * @param {Indeger} id  - dashdoard id
       * @param {Object} data - dashboard data
       */
      set: function(id, data) {
        var deferred = $q.defer();
        $http.post(API_URL + '/dashboards/' + id, data)
          .success(function(data) {
            deferred.resolve();
          })
          .error(function() {
            deferred.reject();
          });
        return deferred.promise;
      },
      /**
       * @name  delete
       * @description Delete dashboard
       * @param  {[type]} id - dashboard id
       * @return {Promise}
       */
      delete: function(id) {
        var deferred = $q.defer();
        $http.delete($config.API_URL + '/v1/dashboards/' + id)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function() {
            deferred.reject();
          });
        return deferred.promise;
      }
    };
  }
})();

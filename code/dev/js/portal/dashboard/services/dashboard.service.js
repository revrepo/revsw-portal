(function() {
  'use strict';
  //http://www.slideshare.net/RajthilakMCA/awesome-dash-angular-js-42552385
  angular
    .module('revapm.Portal.Dashboard')
    .factory('DashboardSrv', DashboardSrv)
    .run( /*ngInject*/ function(DashboardSrv) {
     //DashboardSrv.getAll();
    });

  function DashboardSrv($q, $http, $localStorage, $config) {
    'ngInject';
    // var API_URL  = $config.API_URL;
    // var API_URL = 'http://localhost:3003/v1';
    var API_URL = 'https://127.0.0.1:8000/v1';
    var dashboardsList = [];
    /**
     * @name getAll
     * @description get all user`s dashboards
     * @return {Promise}
     */
    function getAll() {
      var deferred = $q.defer();
      dashboardsList.length = 0;
      $http.get(API_URL + '/dashboards')
        .success(function(data) {
          angular.forEach(data, function(item) {
            dashboardsList.push(item);
          })
          deferred.resolve(dashboardsList);
        })
        .error(function() {
          deferred.reject();
        });
      return deferred.promise;
    }
    return {
      dashboardsList: dashboardsList,
      getAll: getAll,
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
            data["titleTemplateUrl"] = "parts/dashboard/dashboard-title.tpl.html";
            deferred.resolve(data);
          })
          .error(function() {
            deferred.reject();
          });
        return deferred.promise;

      },
      /**
       * @name create
       * @description Create new dashboard
       * @param  {[type]} data [description]
       * @return {[type]}      [description]
       */
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
        angular.extend(model, data);
        var dashboardsList = this.dashboardsList
        $http.post(API_URL + '/dashboards', model)
          .success(function(data) {
            model.id = data.object_id;
            getAll();
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
        $http.put(API_URL + '/dashboards/' + id, data)
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
        $http.delete(API_URL + '/dashboards/' + id)
          .success(function(data) {
            deferred.resolve(data);
            getAll()
          })
          .error(function() {
            deferred.reject();
          });
        return deferred.promise;
      }
    };
  }
})();

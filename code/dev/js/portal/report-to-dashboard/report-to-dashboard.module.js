(function() {
  'use strict';
  /**
   * @name  revapm.Portal.ReportToDashboard
   * @document service
   */
  angular.module('revapm.Portal.ReportToDashboard', [
    'revapm.Portal.Dashboard',
    'revapm.Portal.Mobile',
    'adf',
    'adf.provider'
  ])
    .run(['dashboard', 'DashboardSrv', function(dashboardProvider, DashboardSrv) {
      console.log(dashboardProvider.widgets);
      // Add button "Add To dashboard" to all charts
      var menuItems = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
      menuItems.unshift({
        text: 'Add To Dashboard',
        onclick: function(event) {
          DashboardSrv.getAll().then(function() {
            var scope = angular.element(event.target).scope();
            /**
             * @todo Ask user for target dashboard
             */
            var selectedDashboard = DashboardSrv.dashboardsList[0];
            var model = {};
            DashboardSrv.get(selectedDashboard.id).then(function(data) {
              angular.extend(model, data);

              var widget = {
                config: {
                  domain: scope.ngDomain,
                  /**
                   * @todo Transform filters to needed format
                   */
                  filters: scope.filters
                },
                styleClass: 'rev-widget',
                title: scope.heading,
                /**
                 * @todo Replace with values from widget
                 */
                titleTemplateUrl: 'parts/dashboard/widgets/proxy-traffic/widget-title-with-params-proxy-traffic.html',
                type: 'analytics-proxy-traffic-bandwidth-usage'
              };
              // console.log(dashboardProvider.widgets['widget-apps-mobile-http-codes-chart']);
              model.rows[0].columns[0].widgets.push(widget);

              DashboardSrv.set(selectedDashboard.id, model);
              /**
               * @todo Add success notification
               */
            });
          });
        }
      });
    }
    ]);

})();

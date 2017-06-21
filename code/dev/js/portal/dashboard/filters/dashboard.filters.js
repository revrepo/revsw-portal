(function () {

  angular.module('revapm.Portal.Dashboard')
    .filter('orderWidgets', orderWidgets);
  // NOTE:  default order list
  var _default_order_widgets = [
    'analytics-proxy-traffic-bandwidth-usage', // "Bandwidth Usage"
    'analytics-proxy-traffic-chart', // "Total Requests"
    'analytics-proxy-traffic-http-https-chart', // "HTTP/HTTPS Hits"
    'analytics-proxy-hits-cache-chart', // "Edge Cache Efficiency Hits"
    'adf-widget-gbt-heatmaps', //"GBT Heatmap"
    'adf-widget-top-10-countries', // "Top 10 Countries"
    'adf-widget-http-https-requests-ratio', // "Request Success/Failure Ratio"

    'widget-web-analytics-http-staus-codes-graph', //Web Analytics "HTTP Status Codes Graph"
    'widget-web-analytics-edge-cache-hit-miss-ratio', //Web Analytics “Edge Cache Hit/Miss Ratio”
    'widget-web-analytics-http-status-codes-ratio', //Web Analytics “HTTP Status Codes Ratio”
    'widget-web-analytics-http-https-request-ratio', //Web Analytics Pie chart “HTTP/HTTPS Requests Ratio”
    'widget-web-analytics-ftb-average', //Web Analytics - Average FBT
    'widget-web-analytics-imageengine-linechart-bytes-saved', // Web Analytics - Bandwidth Saved By ImageEngine Graph
    'widget-web-analytics-imageengine-solidgauge-performance-improvement',// Web Analytics -  Performance Improvement By ImageEngine

    'bluetriangletech-conversions-subcategories', //"Conversion Rate"
    'bluetriangletech-bounce-rate', //"Bounce Rate"
    'bluetriangletech-brand-conversion-rate', // "Brand Conversion Rate"
    'bluetriangletech-lost-revenue-calculator', //"Lost Revenue Calculator"
    'bluetriangletech-traffic-info', //"BTT Traffic Parameters"
    'widget-norse-live-attack-map', //"Norse Live Attack Map"
    'widget-apps-mobile-top-10-domains-hits', // TODO: rebase to Apps Analytics
    'widget-apps-mobile-top-10-domains-hits', // TODO: rebase to Apps Analytics
    'widget-apps-mobile-rps-chart', // TODO: rebase to Apps Analityc group
  ];
  var _group_widgets = {
    apps: {
      title: 'Apps Analitycs',
      order: 1,
      widgets_list: [
        'widget-apps-mobile-rps-chart',
        'widget-apps-mobile-bw-chart',
        'widget-apps-mobile-http-codes-chart',
        'widget-apps-mobile-top-10-domains-hits',
        'widget-apps-mobile-top-10-domains-gbt',
        'widget-apps-mobile-top-countries-hits',
        'widget-apps-mobile-top-countries-users',
        'widget-apps-mobile-top-operators-hits',
        'widget-apps-mobile-top-networks-hits',
        'widget-apps-traffic-dist-cache-hits',
        'widget-apps-traffic-dist-cache-gbt'
      ]
    },
    web: {
      title: 'Web Analytics',
      order: 2,
      widgets_list: [
        'analytics-proxy-traffic-bandwidth-usage', // "Bandwidth Usage"
        'analytics-proxy-traffic-chart', // "Total Requests"
        'analytics-proxy-traffic-http-https-chart', // "HTTP/HTTPS Hits"
        'analytics-proxy-hits-cache-chart', // "Edge Cache Efficiency Hits"
        'adf-widget-gbt-heatmaps', //"GBT Heatmap"
        'adf-widget-top-10-countries', // "Top 10 Countries"
        'adf-widget-http-https-requests-ratio', // "Request Success/Failure Ratio"

        'widget-web-analytics-http-staus-codes-graph', //Web Analytics "HTTP Status Codes Graph"
        'widget-web-analytics-edge-cache-hit-miss-ratio', //Web Analytics “Edge Cache Hit/Miss Ratio”
        'widget-web-analytics-http-status-codes-ratio', //Web Analytics “HTTP Status Codes Ratio”
        'widget-web-analytics-http-https-request-ratio', //Web Analytics Pie chart “HTTP/HTTPS Requests Ratio”
        'widget-web-analytics-ftb-average', //Web Analytics - Average FBT
        'widget-web-analytics-imageengine-linechart-bytes-saved', // Web Analytics - Bandwidth Saved By ImageEngine Graph
        'widget-web-analytics-imageengine-solidgauge-performance-improvement',// Web Analytics - Performance Improvement By ImageEngine
      ]
    },
    business: {
      title: 'Business Analytics',
      order: 3,
      widgets_list: [
        'bluetriangletech-conversions-subcategories', //"Conversion Rate"
        'bluetriangletech-bounce-rate', //"Bounce Rate"
        'bluetriangletech-brand-conversion-rate', // "Brand Conversion Rate"
        'bluetriangletech-lost-revenue-calculator', //"Lost Revenue Calculator"
        'bluetriangletech-traffic-info', //"BTT Traffic Parameters"
      ]
    },
    security: {
      title: 'Security Analytics',
      order: 4,
      widgets_list: [
        'widget-norse-live-attack-map', //"Norse Live Attack Map"
      ]
    },
    // “Third-Party Integrations”
    thirdPartyIntegrations: {
      title: 'Third-Party Integrations',
      order: 6,
      widgets_list: [
        'third-party-iframe-page'
      ]
    },
  };
  /**
   * @name  orderWidgets
   * @description
   *
   * RU: Функция сортировки списка виджетов
   *
   * @return {Object} - reorder widgets list
   */
  function orderWidgets() {
    'ngInject';
    var widgetList = {};
    return function (widgets, group) {
      if (!group || group === '') {
        group = 'all';
      }
      var defaultOrderWidgets_ = [];
      var _orderWidgets = {};
      if (!!orderWidgets[group]) {
        return orderWidgets[group];
      } else {
        orderWidgets[group] = {};
      }
      var _widgets = angular.copy(widgets);


      if (group !== 'all') {
        defaultOrderWidgets_ = _group_widgets[group].widgets_list;
      } else {
        defaultOrderWidgets_ = _default_order_widgets;
      }

      angular.forEach(defaultOrderWidgets_, function (key) {
        widgets[key].edit.immediate = true; // NOTE: open edit window immediate
        orderWidgets[group][key] = _widgets[key];

        delete _widgets[key];
      });
      // TODO: delete?? - add another widget not set in "_default_order_widgets"
      // angular.forEach(_widgets, function (item, key) {
      //   orderWidgets[group][key] = item;
      // });
      return orderWidgets[group];
    };
  }

})();

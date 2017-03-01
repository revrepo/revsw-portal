(function () {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('googleAnalyticsInclude', googleAnalyticsIncludeDirective);

  /*@ngInject*/
  function googleAnalyticsIncludeDirective() {

    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        var gaJS = '(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){ ' +
        '(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), ' +
        'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) ' +
        '})(window,document,"script","//www.google-analytics.com/analytics.js","ga"); ' +
        'ga("create",  window.vendorConfig.googleAnalyticsAccount, "auto")';


        scope.$watch('vendorConfig', function(val){
          if (val) {
            element[0].text = gaJS;
          }
        });
      }
    };
  }
})();

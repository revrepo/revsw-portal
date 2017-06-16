(function() {
  'use strict';

  angular
    .module('revapm.Portal')
    .run(runIntro);

  function runIntro($config, $rootScope, $localStorage, $timeout, $window, $state, $stateParams) {
    'ngInject';
    $rootScope.menuExpandedNodes = {};

    var introduction_application = {
      exitOnOverlayClick: false, // NOTE: close intor windows only by buttons "Skip" and "Done"
      steps: [{
          intro: 'Welcome to the {{companyNameShort}} Customer Portal! It looks like you are a new user of the service, and we would ' +
            'like to run for you a quick introduction tour.',
        }, {
          element: '#side-menu-sub-item__webApp-domains',
          intro: 'The "Domains" section allows you to manage the way how your websites (domains) are accelerated by {{companyNameShort}}.',
          position: 'right'
        }, {
          element: '#side-menu-sub-item__webApp-staging-environment',
          intro: 'We provide an easy and safe way to test your {{companyNameShort}} domain configuration changes before making them ' +
            'available for all your website users - please ' +
            'see the "Staging Env." page for full details about our configuration staging workflow.',
          position: 'right'
        }, {
          element: '#side-menu-sub-item__webApp-ssl_certs',
          intro: 'We highly recommend to use SSL protocol for your websites - it will increase the website security and also allow your visitors to use modern and ' +
            'fast HTTP/2 protocol',
          position: 'right'
        }, {
          element: '#side-menu-sub-item__webApp-ssl_names',
          intro: 'When using {{companyNameShort}} shared SSL certificate managed by GlobalSign CA you can use this section to manage SSL ' +
            'domain names protected by the certificate',
          position: 'right'
        }, {
          element: '#side-menu-sub-item__webApp-cache ',
          intro: 'If you use our global edge caching feature then the "Purge Cache" section will allow you to instantly ' +
            'purge cached objects when you make changes on your origin server.',
          position: 'right'
        },
        {
          element: '#side-menu-web-analytics-item',
          intro: 'The "Web Analytics" section will provide you with a lot of insights about your website\'s performance, availability, user geography, popular content ' +
            'and many other important metrics!',
          position: 'right'
        },
        {
          element: '#side-menu-dns-service-item',
          intro: 'We also offer an integrated DNS service powered by our partner NS1. This section allows you to manage your DNS resources without leaving our ' +
            'customer portal!',
          position: 'right'
        },
        {
          element: '#side-menu-apps-item',
          intro: 'The "Mobile Apps" section is the right place to supercharge your mobile application with our mobile SDK. In the section your can create new SDK ' +
            'keys and manage ' +
            '{{companyNameShort}} acceleration options.',
          position: 'right'
        },
        {
          element: '#side-menu-mobile-analytics-item',
          intro: 'This section is full of information about mobile application availability, performance, userbase, top objects, etc.',
          position: 'right'
        },
        {
          element: '#left-menu-dashboard-section',
          intro: 'Here you can easily build your own dashboards using different graphs from mobile and web analytics sections.',
          position: 'right'
        },
      ]
    };
    // NOTE: Main Menu Introduction (intro.js)
    $rootScope.IntroOptions = introduction_application;

    /**
     * @name onIntroCompletedEvent
     * @description method will call when clicked button "Done"
     *
     * @param {Object} e
     */
    $rootScope.onIntroCompletedEvent = function(e) {
      if (!!$localStorage.intro && $localStorage.intro.isShowMainIntro === false) {
        $localStorage.intro.isShowMainIntro = true; // NOTE: store information about Intor was shows
        $state.transitionTo($state.current, $stateParams, {
          reload: false,
          inherit: true,
          notify: true
        });
      }
    };
  }
})();

(function() {
  'use strict';

  angular
    .module('revapm.Portal')
    .run(runIntro);

  function runIntro($config, $rootScope, $localStorage, $timeout, $window, $state, $stateParams) {
    'ngInject';
    $rootScope.menuExpandedNodes = {};
    var introduction_application = {
      steps: [{
          element: '#side-menu-sub-item__webApp-domains',
          intro: 'Use Domains section to configure your websites or API backend URLs if you don’t use RevAPM mobile SDK',
          position: 'right'
        }, {
          element: '#side-menu-sub-item__webApp-ssl_certs',
          intro: 'Use the section to upload and configure your SSL certificates purchased from a third-party CA',
          position: 'right'
        }, {
          element: '#side-menu-sub-item__webApp-cache ',
          intro: 'If you use our global edge caching feature then the Purge Cache section will allow to instantly ' +
            'purge cached objects when you make changes on your origin server',
          position: 'right'
        },
        //“Web Analytics -> Proxy Traffic”:
        {
          element: '#side-menu-sub-item__reports-proxy',
          intro: ' Proxy Traffic ',
          position: 'right'
        },
        //“Mobile Apps -> iOS”: TBD
        {
          element: '#side-menu-sub-item__apps-ios',
          intro: 'Mobile Apps -> iOS',
          position: 'right'
        },
        //“Web Analytics -> Traffic Levels”: TBD
        {
          element: '#side-menu-sub-item__apps-ios',
          intro: 'Mobile Apps -> iOS',
          position: 'right'
        },
      ]
    };
    // NOTE: Main Menu Introduction
    $rootScope.IntroOptions = introduction_application;
    if ($localStorage.intro === undefined) {
      $localStorage.intro = {
        isShowMainIntro: false,
        pages: {}
      };
      $rootScope.menuExpandedNodes = {};
      $rootScope.isShowMainIntro = false;
    } else {
      $rootScope.isShowMainIntro = $localStorage.intro.isShowMainIntro;
    }

    if ($rootScope.isShowMainIntro === false) {
      ['index.apps', 'index.reports', 'index.webApp', 'index.accountSettings'].forEach(function(menuState) {
        $rootScope.menuExpandedNodes[menuState] = true;
      });
    }

    $rootScope.ChangeEvent = function(targetElement, scope) {
      // console.log('Change Event called');
      // console.log(targetElement); //The target element
      // console.log(this); //The IntroJS object
    };

    /**
     * @name  BeforeChangeEvent
     * @description
     *
     * @param {[type]} e     [description]
     * @param {[type]} scope [description]
     */
    $rootScope.BeforeChangeEvent = function(e, scope) {
      angular.element(e).focus();
    };

    /**
     * @CompletedEvent
     * @description
     * @param {[type]} e [description]
     */
    $rootScope.onIntroCompletedEvent = function(e) {
      if ($localStorage.intro.isShowMainIntro === false) {
        $localStorage.intro.isShowMainIntro = true;
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: true,
          notify: true
        });
      } else {
        if ($localStorage.intro.pages[$state.current.name] !== true) {
          $localStorage.intro.pages[$state.current.name] = true;
        }
      }
    };
  }
})();

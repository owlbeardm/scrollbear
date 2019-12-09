import 'angular';
import 'angular-ui-router';
import 'angular-sanitize';
import './src/css/owlbear-style/scss/material-dashboard.scss';
import './src/css/app.css';

import './src/components/components.module';
import './src/pages/pages.module';
import './src/filter/filters.module';
import './src/services/services.module';
import './src/constants/constants.module';
// import './src/directives/directives.module.js';
import 'angular-ui-bootstrap/dist/ui-bootstrap-tpls';

import AppComponent from './src/pages/app.component';

const showdown = require('showdown');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

function getSpellDescription(md) {
  const converter = new showdown.Converter({
    tables: true,
    strikethrough: true,
  });
  let html = `<div>${converter.makeHtml(md)}</div>`;
  html = html.replace(/<table>/g, "<div class='table-responsive'><table class='table table-sm'>")
    .replace(/<\/table>/g, '</table></div>')
    .replace(/<thead>/g, "<thead class='text-primary'>");
  return html;
}

angular.module('exceptionOverwrite', []).factory('$exceptionHandler', [
  '$log',
  '$state',
  ($log, $state) => function myExceptionHandler(exception, cause) {
    $log.error(exception, cause, $state.$current.name);
    ga('send', 'event', 'exception', exception.message, $state.$current.name);
  },
]);

const scrollbearApp = angular.module('scrollbearApp', [
  'pages.components',
  'app.components',
  'app.constants',
  'app.services',
  'app.filters',
  'ui.router',
  'ui.bootstrap',
  'ngSanitize',
  'exceptionOverwrite',
  // 'app.directives'
]);
scrollbearApp.component('app', AppComponent);

scrollbearApp.config([
  '$stateProvider',
  '$locationProvider',
  '$urlRouterProvider',
  ($stateProvider, $locationProvider, $urlRouterProvider) => {
    $stateProvider.state({
      name: 'main',
      url: '/',
      template: '<ui-view></ui-view>',
      onEnter: [
        '$rootScope',
        ($rootScope) => {
          $rootScope.title = '';
          $rootScope.description = 'Scrollbear spellbook reference for Pathfinder RPG.';
        },
      ],
    });

    $stateProvider.state({
      name: 'list',
      url: '/',
      component: 'main',
      onEnter: [
        '$rootScope',
        ($rootScope) => {
          // popup.modal('hide');
          $rootScope.title = '';
          $rootScope.description = 'Scrollbear spellbook reference for Pathfinder RPG.';
        },
      ],
    });

    $stateProvider.state({
      name: 'license',
      url: '/legal',
      component: 'license',
    });

    $stateProvider.state({
      name: 'about',
      url: '/about',
      component: 'about',
    });

    $stateProvider.state({
      name: 'spellbook',
      url: '/spellbook',
      component: 'spellbook',
      onEnter: [
        '$rootScope',
        ($rootScope) => {
          $rootScope.title = 'Spellbook - ';
          $rootScope.description = 'Scrollbear spellbook reference for Pathfinder RPG.';
        },
      ],
    }).state({
      name: 'spellbook.characters',
      url: '/characters',
      component: 'characters',
    })
      .state({
        name: 'spellbook.newcharacter',
        url: '/characters/new',
        component: 'newcharacter',
      })
      .state({
        name: 'spellbook.prepared',
        url: '/prepared',
        component: 'prepared',
      })
      .state({
        name: 'spellbook.known',
        url: '/known',
        component: 'known',
      })
      .state({
        name: 'spellbook.list',
        url: '/list',
        component: 'spellbookSpelllist',
      })
      .state({
        name: 'spellbook.book',
        url: '/book',
        component: 'spellbookBook',
      });

    $stateProvider.state({
      name: 'spells',
      url: 'spells/:spellUrl',
      parent: 'main',
      component: 'spell',
      resolve: {
        spell: [
          '$rootScope',
          'spellService',
          '$stateParams',
          ($rootScope, spellService, $stateParams) => {
            const spell = spellService.getSpellByUrl($stateParams.spellUrl);
            $rootScope.title = `${spell.name} - `;
            $rootScope.spell = spell;
            const spellDescription = getSpellDescription(spell.description);
            $rootScope.description = `"${spell.name}" Pathfinder spell from \
            ${spellService.getPlainSpellSource(spell.source)}: ${spell.description}`;
            $rootScope.spellDescription = spellDescription;
            $rootScope.spellSource = spellService.getSpellSource(spell.source);
            return spell;
          },
        ],
      },
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  },
]);

scrollbearApp.run([
  '$log',
  '$transitions',
  '$location',
  '$state',
  '$rootScope',
  'sidebarService',
  ($log, $transitions, $location, $state, $rootScope, sidebarService) => {
    if (window.performance) {
      ga('send', 'timing', 'JS Dependencies', 'load', Math.round(performance.now()));
    }
    $transitions.onStart({}, (transition) => {
      const popup = angular.element('#modalSpell');
      popup.modal('hide');
      const modalBackdrop = angular.element('.modal-backdrop');
      modalBackdrop.remove();
      const body = angular.element('body');
      body.removeClass('modal-open');
      $log.debug(`onStart Transition from ${transition.from().name} to ${transition.to().name}`);
      if (window.performance) {
        $rootScope.onStartTime = Math.round(performance.now());
      }
    });
    $transitions.onFinish({}, (transition) => {
      $log.debug('onFinish Transition', transition.params());
      if (!transition.from().abstract) {
        window.ga('set', 'page', $location.url());
        window.ga('send', 'pageview');
      }
      sidebarService.disableSidebar();
      if (window.performance) {
        ga('send', 'timing', 'Transition', 'onFinish',
          Math.round(performance.now()) - $rootScope.onStartTime,
          transition.to().name);
      }
    });
    $transitions.onStart({
      to: 'main',
    }, (transition) => transition.router.stateService.target('list'));
    $transitions.onStart({
      to: 'spellbook',
    }, (transition) => {
      $log.debug(`onStart Transition from ${transition.from().name} to ${transition.to().name}`);
      return transition.router.stateService.target('spellbook.characters');
    });
  },
]);

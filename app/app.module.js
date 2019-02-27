'use strict';
import 'angular';
import 'angular-ui-router';
import 'angular-sanitize';
const showdown = require('showdown');
import './src/css/material-dashboard.css';
import './src/css/app.css';

import './src/components/components.module.js';
import './src/filter/filters.module.js';
import './src/services/services.module.js';
import './src/constants/constants.module.js';
// import './src/directives/directives.module.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

const initiativeApp = angular.module('initiativeApp', [
  'app.components',
  'app.constants',
  'app.services',
  'app.filters',
  'ui.router',
  'ngSanitize'
  // 'app.directives'
]);

import AppComponent from './src/app.component.js';

initiativeApp.component('app', AppComponent);

initiativeApp.config([
  '$stateProvider',
  '$locationProvider',
  '$urlRouterProvider',
  function($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider.state({
      name: 'main',
      url: '/',
      template: '<ui-view></ui-view>',
      onEnter: [
        '$rootScope',
        function($rootScope) {
          $rootScope.title = '';
          $rootScope.description = 'Scrollbear spellbook reference for Pathfinder RPG.';
        }
      ]
    });

    $stateProvider.state({
      name: 'list',
      url: '/',
      component: 'main',
      onEnter: [
        '$rootScope',
        function($rootScope) {
          // popup.modal('hide');
          $rootScope.title = '';
          $rootScope.description = 'Scrollbear spellbook reference for Pathfinder RPG.';
        }
      ]
    });

    $stateProvider.state({
      name: 'spellbook',
      url: '/spellbook',
      component: 'spellbook',
      onEnter: [
        '$rootScope',
        function($rootScope) {
          $rootScope.title = 'Spellbook - ';
          $rootScope.description = 'Scrollbear spellbook reference for Pathfinder RPG.';
        }
      ]
    }).state({name: 'spellbook.characters', url: '/characters', component: 'characters'}).state({name: 'spellbook.newcharacter', url: '/characters/new', component: 'newcharacter'}).state({name: 'spellbook.prepared', url: '/prepared', component: 'prepared'}).state({name: 'spellbook.list', url: '/list', component: 'spellbookSpelllist'}).state({name: 'spellbook.book', url: '/book', component: 'spellbookBook'});

    $stateProvider.state({
      name: 'spells',
      url: 'spells/:spellUrl',
      component: 'spell',
      parent: 'main',
      resolve: {
        spell: [
          '$rootScope',
          'spellService',
          '$stateParams',
          function($rootScope, spellService, $stateParams) {
            console.log('spells spell', spell);
            const spell = spellService.getSpellByUrl($stateParams.spellUrl)
            $rootScope.title = `${spell.name} - `;
            $rootScope.spell = spell;
            const spellDescription = getSpellDescription(spell.description);
            $rootScope.description = spell.description;
            $rootScope.spellDescription = spellDescription;
            return spell;
          }
        ],
        prevstate: [
          '$transition$',
          '$rootScope',
          function($transition$, $rootScope) {
            console.log('spells prevState');
            console.log('prevState', $transition$.from());
            $rootScope.newstate = $transition$.from().name;
            return $transition$.from();
          }
        ]
      },
      onEnter: [
        'spell',
        '$rootScope',
        function(spell, $rootScope) {
          const popup = angular.element("#exampleModal");
          console.log('spells onEnter', spell, popup);
          popup.modal('show');
        }
      ],
      onExit: [
        '$transition$',
        function($transition$) {
          if ($transition$.to().name != 'spells') {
            const popup = angular.element("#exampleModal");
            popup.modal('hide');
            const modalBackdrop = angular.element('.modal-backdrop');
            modalBackdrop.remove();
            const body = angular.element('body');
            body.removeClass('modal-open');
          }
        }
      ]
    });

    // $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }
]);

initiativeApp.run([
  '$log',
  '$transitions',
  '$location',
  '$state',
  '$rootScope',
  function($log, $transitions, $location, $state, $rootScope) {
    let prevSpellsLocation;
    $transitions.onStart({}, function(transition) {
      console.log("onBefore Transition from " + transition.from().name + " to " + transition.to().name);
      // check if the state should be protected
      if ($location.search()._escaped_fragment_) {
        const p = $location.search()._escaped_fragment_;
        $location.search({});
        $location.path(p);
      }
    });
    $transitions.onStart({
      from: 'spells'
    }, function(transition) {
      $rootScope.newstate = transition.to();
    });
    $transitions.onStart({
      to: 'main'
    }, function(transition) {
      console.log("onStart Transition from " + transition.from().name + " to " + transition.to().name);
      return transition.router.stateService.target('list');
      // $rootScope.newstate = transition.to();
    });
    $transitions.onStart({
      to: 'spellbook'
    }, function(transition) {
      console.log("onStart Transition from " + transition.from().name + " to " + transition.to().name);
      return transition.router.stateService.target('spellbook.characters');
      // $rootScope.newstate = transition.to();
    });
  }
]);

function getSpellDescription(md) {
  const converter = new showdown.Converter({tables: true, strikethrough: true});
  let html = `<div>${converter.makeHtml(md)}</div>`;
  html = html.replace(/<table>/g, "<div class='table-responsive'><table class='table table-sm'>").replace(/<\/table>/g, "</table></div>").replace(/<thead>/g, "<thead class='text-primary'>");
  return html;
}

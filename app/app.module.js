'use strict';
import 'angular';
import 'angular-ui-router';
import 'angular-sanitize';
const showdown = require('showdown');
// import 'showdown';
import './src/css/material-dashboard.css';
import './src/css/app.css';

import './src/components/components.module.js';
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
  'app.components', 'app.constants', 'app.services', 'ui.router', 'ngSanitize'
  // 'app.directives'
]);

import AppComponent from './src/app.component.js';

initiativeApp.component('app', AppComponent);

initiativeApp.config([
  '$stateProvider',
  '$locationProvider',
  function($stateProvider, $locationProvider) {
    $stateProvider.state({
      name: 'main',
      url: '/',
      component: 'main',
      onEnter: [
        '$rootScope',
        function($rootScope) {
          // const popup = angular.element("#exampleModal");
          // popup.modal('hide');
          $rootScope.title = '';
          $rootScope.description = 'Scrollbear spellbook reference for Pathfinder RPG.';
        }
      ]
    });

    $stateProvider.state({
      name: 'spells',
      url: 'spells/:spellUrl',
      parent: 'main',
      resolve: {
        spell: [
          'spellService',
          '$stateParams',
          function(spellService, $stateParams) {
            return spellService.getSpellByUrl($stateParams.spellUrl);
          }
        ]
      },
      onEnter: [
        'spell',
        '$rootScope',
        function(spell, $rootScope) {
          $rootScope.title = `${spell.name} - `;
          $rootScope.spell = spell;

          const spellDescription = getSpellDescription(spell.description);
          $rootScope.description = spell.description;
          $rootScope.spellDescription = spellDescription;
          const popup = angular.element("#exampleModal");
          popup.modal('show');
        }
      ]
    });

    $locationProvider.html5Mode(true);
  }
]);

initiativeApp.run([
  '$log',
  '$transitions',
  '$location',
  function($log, $transitions, $location) {
    $transitions.onStart({
      // to: 'main'
    }, function(transition) {
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
      if (transition.to().name != 'spells') {
        console.log("onStart replace Transition from " + transition.from().name + " to " + transition.to().name);
        $location.replace();
      }
    });
    $transitions.onStart({
      to: 'spells'
    }, function(transition) {
      if (transition.from().name != 'spells') {
        console.log("onStart replace Transition from " + transition.from().name + " to " + transition.to().name);
        $location.replace();
      }
    });

  }
]);

function getSpellDescription(md) {
  const converter = new showdown.Converter({
    tables: true,
    strikethrough: true
  });
  let html = `<div>${converter.makeHtml(md)}</div>`;
  html = html
    .replace(/<table>/g, "<div class='table-responsive'><table class='table table-sm'>")
    .replace(/<\/table>/g, "</table></div>")
    .replace(/<thead>/g, "<thead class='text-primary'>");
  return html;
}

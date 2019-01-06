'use strict';
import 'angular';
import 'angular-ui-router';
import './src/css/bootstrap.min.css';
import './src/css/material-dashboard.css';

import './src/components/components.module.js';
import './src/services/services.module.js';
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
  'app.components', 'app.services', 'ui.router'
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
      onEnter: function() {
        const popup = angular.element("#exampleModal");
        popup.modal('hide');
      }
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
          $rootScope.spell = spell;
          const popup = angular.element("#exampleModal");
          popup.modal('show');
        }
      ],
      onExit: function() {
        const popup = angular.element("#exampleModal");
        popup.modal('hide');
      }
    });

    // $locationProvider.html5Mode(true);
  }
]);

// initiativeApp.run([
//   '$log',
//   '$location',
//   '$state',
//   function($log, $location, $state) {
//      $state.go('main')
//
//   }
// ]);

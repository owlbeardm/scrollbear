'use strict';
import 'angular';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import './src/css/bootstrap.min.css';
import './src/css/material-dashboard.css';

import './src/components/components.module.js';
import './src/services/services.module.js';
// import './src/directives/directives.module.js';

const initiativeApp = angular.module('initiativeApp', [
  'app.components', 'app.services', 'ui.router', 'ui.bootstrap'
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
        '$location',
        '$state',
        "$log",
        function($location, $state, $log) {
          $log.debug('Modal exit hide state');
          const popup = angular.element("#exampleModal");
          popup.modal('hide');
        }
      ]
    });

    $stateProvider.state({
      name: 'spells',
      url: 'spells/:spellUrl',
      parent: 'main',
      resolve: {
        spell: function(spellService, $stateParams) {
          return spellService.getSpellByUrl($stateParams.spellUrl);
        }
      },
      onEnter: [
        'spell',
        '$rootScope',
        '$location',
        '$state',
        "$log",
        function(spell, $rootScope, $location, $state, $log) {
          $log.debug('Modal entering state', spell);
          $rootScope.spell = spell;
          const popup = angular.element("#exampleModal");
          popup.modal('show');
        }
      ],
      onExit: [
        '$log',
        '$state',
        function($log, $state) {
          $log.debug('Modal onExit state', $state.current);
          const popup = angular.element("#exampleModal");
          popup.modal('hide');
        }
      ]

    });

    $locationProvider.html5Mode(true);
  }
]);

initiativeApp.run([
  '$log',
  '$location',
  '$state',
  function($log, $location, $state) {
    // $state.go('main')

  }
]);

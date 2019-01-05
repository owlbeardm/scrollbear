'use strict';
import './src/css/bootstrap.min.css';
import './src/css/material-dashboard.css';

import './src/components/components.module.js';
import './src/services/services.module.js';
// import './src/directives/directives.module.js';

const initiativeApp = angular.module('initiativeApp', [
  'app.components',
  'app.services'
  // 'app.directives'
]);


import AppComponent from './src/app.component.js';

initiativeApp.component('app', AppComponent);

// initiativeApp.config([]);

// initiativeApp.run([]);

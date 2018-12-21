"use strict";

function AppController($log, $scope, $window, focusService) {
  const ctrl = this;
  const localStorage = $window['localStorage'];
  const STORAGE_PCS = 'PCS';
  const STORAGE_COUNT = 'COUNT';

  ctrl.$onInit = function() {
    $log.debug("AppController init");
    let pcs;
    try {
      pcs = JSON.parse(localStorage.getItem(STORAGE_PCS));
    } catch (err) {
      $log.error(err);
    }
    ctrl.pcs = (!pcs || !pcs.length) ? [] : pcs;
    let count;
    try {
      count = JSON.parse(localStorage.getItem(STORAGE_COUNT));
    } catch (err) {
      $log.error(err);
    }
    ctrl.count = (!count || !angular.equals({}, {})) ? {initiative:1, round:1} : count;
  }

  ctrl.endRound = function() {
    ctrl.pcs.forEach((pc) => {
      pc.actions = [false, false, false, false];
      pc.initiative = undefined;
      if(pc.conditions && pc.conditions.length){
        pc.conditions.forEach((condition) => {
          if(condition.count){
            if(condition.descending){
              condition.count = Math.max(0, condition.count-1);
            } else {
              condition.count++;
            }
          }
        });
      }
    });
    ctrl.count.initiative = 1;
    ctrl.count.round++;
  }

  ctrl.nextCount = function() {
    ctrl.count.initiative++;
  }

  ctrl.reset = function() {
    ctrl.pcs.forEach((pc) => {
      pc.actions = [false, false, false, false];
      pc.initiative = undefined;
    });
    ctrl.count.initiative = 1;
    ctrl.count.round = 1;
  }

  ctrl.clear = function() {
    ctrl.pcs = [];
    ctrl.count.initiative = 1;
    ctrl.count.round = 1;
  }

  ctrl.deletePC = function(index) {
    console.log('AppController deletePC', index);
    ctrl.pcs.splice(index, 1);
  }

  $scope.$watch('$ctrl.pcs', function(newVal, oldVal) {
    console.log('AppController changed', newVal, oldVal);
    localStorage.setItem(STORAGE_PCS, JSON.stringify(newVal));
  }, true);

  $scope.$watch('$ctrl.count', function(newVal, oldVal) {
    console.log('AppController changed', newVal, oldVal);
    localStorage.setItem(STORAGE_COUNT, JSON.stringify(newVal));
  }, true);
}

const AppComponent = {
  template: require('./app.html'),
  controller: [
    '$log',
    '$scope',
    '$window',
    'focusService',
    AppController
  ]
};

export default AppComponent;

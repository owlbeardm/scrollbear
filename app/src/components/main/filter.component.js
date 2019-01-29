"use strict";

function FilterController(notificationService, filterService, $log, $window, CLASSES) {
  $log.debug('FilterController create');
  const ctrl = this;
  const localStorage = $window['localStorage'];
  const FAV_ONLY = "FAV_ONLY";
  const SELECTED_CLASS = "SELECTED_CLASS";

  ctrl.$onInit = function() {
    $log.debug('FilterController init ');
    const favOnly = JSON.parse(localStorage.getItem(FAV_ONLY));
    ctrl.favOnly = filterService.favOnly;
  }

  ctrl.search = function() {
    $log.debug("AppController ctrl.search", ctrl.filter);
    filterService.filterText = ctrl.filter;
    notificationService.notify(notificationService.FILTER_CHANGED, undefined);
  }

  ctrl.setClass = function() {
    // spellService.setClass(ctrl.classSelected);
    localStorage.setItem(SELECTED_CLASS, JSON.stringify(ctrl.classSelected));
    ctrl.search();
  }

  ctrl.setFavOnly = function() {
    filterService.setFavOnly(ctrl.favOnly);
    ctrl.search();
  }

  ctrl.reset = function() {
    ctrl.filter = "";
  }

}

const FilterComponent = {
  template: require('./filter.html'),
  controller: [
    'notificationService', 'filterService', '$log', '$window', 'CLASSES', FilterController
  ],
  bindings: {}
}

export default FilterComponent;

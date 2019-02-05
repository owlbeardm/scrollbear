"use strict";

function FilterController(notificationService, filterService, $log, $window, SCHOOLS) {
  $log.debug('FilterController create');
  const ctrl = this;
  const localStorage = $window['localStorage'];
  const FAV_ONLY = "FAV_ONLY";

  ctrl.$onInit = function() {
    $log.debug('FilterController init ');
    const favOnly = JSON.parse(localStorage.getItem(FAV_ONLY));
    ctrl.favOnly = filterService.favOnly;
    ctrl.schools = SCHOOLS;
    ctrl.schoolSelected = 'any';
    ctrl.filters = [];
    ctrl.setSchool();
  }

  ctrl.search = function() {
    $log.debug("AppController ctrl.search", ctrl.filter);
    ctrl.filters = [];
    if (ctrl.schoolSelected != 'any') {
      ctrl.filters.push(SCHOOLS[ctrl.schoolSelected].name);
    }
    filterService.filterText = ctrl.filter;
    notificationService.notify(notificationService.FILTER_CHANGED, undefined);
  }

  ctrl.setSchool = function() {
    filterService.school = ctrl.schoolSelected;
    ctrl.search();
  }

  ctrl.setFavOnly = function() {
    filterService.setFavOnly(ctrl.favOnly);
    ctrl.search();
  }

  ctrl.reset = function() {
    ctrl.filter = "";
    ctrl.schoolSelected = 'any';
    filterService.school = ctrl.schoolSelected;
    // ctrl.search();
  }

}

const FilterComponent = {
  template: require('./filter.html'),
  controller: [
    'notificationService', 'filterService', '$log', '$window', 'SCHOOLS', FilterController
  ],
  bindings: {}
}

export default FilterComponent;

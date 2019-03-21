"use strict";

function FilterController(notificationService, filterService, $log, $window, SCHOOLS, CASTING_TIME) {
  $log.debug('FilterController create');
  const ctrl = this;
  const localStorage = $window['localStorage'];
  const FAV_ONLY = "FAV_ONLY";

  ctrl.$onInit = function() {
    $log.debug('FilterController init ');
    const favOnly = JSON.parse(localStorage.getItem(FAV_ONLY));
    ctrl.favOnly = filterService.favOnly;
    ctrl.schools = SCHOOLS;
    ctrl.castingTimes = CASTING_TIME;
    ctrl.schoolSelected = 'any';
    ctrl.castingTimeSelected = 'any';
    ctrl.filters = [];
    filterService.school = ctrl.schoolSelected;
    filterService.castingTime = ctrl.castingTimeSelected;
    ctrl.search();
  }

  ctrl.search = function() {
    $log.debug("AppController ctrl.search", ctrl.filter);
    ctrl.filters = [];
    if (ctrl.schoolSelected != 'any') {
      ctrl.filters.push(SCHOOLS[ctrl.schoolSelected].name);
    }
    if (ctrl.castingTimeSelected != 'any') {
      ctrl.filters.push(CASTING_TIME[ctrl.castingTimeSelected].name);
    }
    filterService.filterText = ctrl.filter;
    notificationService.notify(notificationService.FILTER_CHANGED, undefined);
  }

  ctrl.setSchool = function() {
    filterService.school = ctrl.schoolSelected;
    ctrl.search();
  }

  ctrl.setCastingTime = function() {
    filterService.castingTime = ctrl.castingTimeSelected;
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
    ctrl.castingTimeSelected = 'any';
    filterService.castingTime = ctrl.schoolSelected;
    // ctrl.search();
  }

}

const FilterComponent = {
  template: require('./filter.html'),
  controller: [
    'notificationService', 'filterService', '$log', '$window', 'SCHOOLS', 'CASTING_TIME', FilterController
  ],
  bindings: {}
}

export default FilterComponent;

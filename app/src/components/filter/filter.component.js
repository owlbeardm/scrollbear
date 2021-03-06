function FilterController(
  notificationService,
  filterService,
  $log,
  $window,
  $timeout,
  SCHOOLS,
  SUBSCHOOLS,
  CASTING_TIME,
  SOURCE_BOOK,
) {
  const ctrl = this;
  $log.debug('FilterController create');

  ctrl.$onInit = () => {
    $log.debug('FilterController init ');
    ctrl.onlyClassSpells = false;
    ctrl.favOnly = filterService.favOnly;
    ctrl.sourceBookSelected = filterService.sourceBooks;
    ctrl.schools = SCHOOLS;
    ctrl.castingTimes = CASTING_TIME;
    ctrl.sourceBooks = SOURCE_BOOK;
    ctrl.SUBSCHOOLS = SUBSCHOOLS;
    ctrl.schoolSelected = 'any';
    ctrl.subSchoolSelected = 'any';
    ctrl.castingTimeSelected = 'any';
    ctrl.filters = [];
    filterService.school = ctrl.schoolSelected;
    filterService.castingTime = ctrl.castingTimeSelected;
    ctrl.search();
    $timeout(() => {
      angular.element('.selectpicker').selectpicker('refresh');
    });
  };

  ctrl.search = () => {
    $log.debug('FilterController ctrl.search', ctrl.filter);
    ctrl.filters = [];
    if (ctrl.schoolSelected !== 'any') {
      ctrl.filters.push(SCHOOLS[ctrl.schoolSelected].name);
    }
    if (ctrl.subSchoolSelected !== 'any') {
      ctrl.filters.push(SUBSCHOOLS[ctrl.subSchoolSelected].name);
    }
    if (ctrl.castingTimeSelected !== 'any') {
      ctrl.filters.push(CASTING_TIME[ctrl.castingTimeSelected].name);
    }
    if (ctrl.sourceBookSelected.length) {
      ctrl.filters.push(`${ctrl.sourceBookSelected.length} source${ctrl.sourceBookSelected.length > 1 ? 's' : ''}`);
    }
    filterService.filterText = ctrl.filter;
    notificationService.notify(notificationService.FILTER_CHANGED, undefined);
  };

  ctrl.setSchool = () => {
    filterService.school = ctrl.schoolSelected;
    ctrl.subSchools = SCHOOLS[ctrl.schoolSelected].subschool;
    ctrl.subSchoolSelected = 'any';
    filterService.subSchool = ctrl.subSchoolSelected;
    ctrl.search();
    $timeout(() => {
      angular.element('.selectpicker').selectpicker('refresh');
    });
  };

  ctrl.setSubSchool = () => {
    filterService.subSchool = ctrl.subSchoolSelected;
    ctrl.search();
  };

  ctrl.setCastingTime = () => {
    filterService.castingTime = ctrl.castingTimeSelected;
    ctrl.search();
  };

  ctrl.setSourceBook = () => {
    filterService.setSourceBook(ctrl.sourceBookSelected);
    ctrl.search();
  };

  ctrl.setFavOnly = () => {
    filterService.setFavOnly(ctrl.favOnly);
    ctrl.search();
  };

  ctrl.reset = () => {
    ctrl.filter = '';
    ctrl.schoolSelected = 'any';
    filterService.school = ctrl.schoolSelected;
    ctrl.subSchools = undefined;
    ctrl.subSchoolSelected = 'any';
    filterService.subSchool = ctrl.subSchoolSelected;
    ctrl.castingTimeSelected = 'any';
    filterService.castingTime = ctrl.schoolSelected;
    // ctrl.search();
    $timeout(() => {
      angular.element('.selectpicker').selectpicker('refresh');
    });
  };

  ctrl.onlyClassSpellsChanges = () => {
    notificationService.notify(notificationService.FILTER_ONLY_CLASS_SPELLS_CHANGED,
      !ctrl.onlyClassSpells);
  };
}

const FilterComponent = {
  template: require('./filter.html'),
  controller: [
    'notificationService',
    'filterService',
    '$log',
    '$window',
    '$timeout',
    'SCHOOLS',
    'SUBSCHOOLS',
    'CASTING_TIME',
    'SOURCE_BOOK',
    FilterController,
  ],
  bindings: {
    onlyClassSpellsEnabled: '<',
  },
};

export default FilterComponent;

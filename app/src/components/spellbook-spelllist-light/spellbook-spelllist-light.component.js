function SpellbookSpelllistLightController(
  $log,
  $scope,
  filterService,
  characterService,
  spellService,
  spellbookService,
  $window,
  $document,
  CLASSES,
) {
  $log.debug('SpellbookSpelllistLightController create');
  const ctrl = this;

  function redrawPreparedBookLists() {
    ctrl.bookL = [];
    ctrl.spellsL.forEach((spell) => {
      ctrl.bookL.push(ctrl.isInSpellBook(spell.name));
    });
    ctrl.preparedL = [];
    ctrl.spellsL.forEach((spell) => {
      ctrl.preparedL.push(ctrl.isSpellPrepared(spell.name));
    });
  }

  function addSpell(spell, spellToAdd) {
    spellbookService.addSpell(spell, spellToAdd, ctrl.classSelected, ctrl.lvl);
    redrawPreparedBookLists();
  }

  ctrl.$onInit = () => {
    $log.debug('SpellbookSpelllistLightController init');
    ctrl.prepared = characterService.getSelectedCharacter().prepared;
    ctrl.spellbook = characterService.getSelectedCharacter().spellbook;
    angular.element($window).bind('scroll', () => {
      ctrl.redraw();
    });
    angular.element($window).bind('resize', () => {
      ctrl.redraw();
    });
    $log.debug(angular.element(`#${ctrl.collapseName}`));
  };

  ctrl.$onChanges = () => {
    ctrl.elementHeight = ctrl.spells.length * 40;
    ctrl.spellsL = ctrl.spells.slice(ctrl.start, ctrl.start + ctrl.elements);
  };

  ctrl.$doCheck = () => {
    ctrl.collapse = angular.element(`#${ctrl.collapseName}`);
    if (ctrl.collapse.attr('class')) {
      ctrl.classes = ctrl.collapse.attr('class').split(' ');
      ctrl.scroll = $document.scrollTop();
      ctrl.offsetTop = angular.element(`#list-new-${ctrl.collapseName}`).offset();
      if (ctrl.offsetTop && ctrl.scroll > ctrl.offsetTop.top + ctrl.spells.length * 40) {
        return;
      }
      ctrl.elementHeight = ctrl.spells.length * 40;
      ctrl.height = $window.innerHeight;
      if (ctrl.offsetTop) {
        if (ctrl.scroll > ctrl.offsetTop.top + ctrl.spells * 40) {
          return;
        }
        const elements = ctrl.height / 40 + 2;
        const start = Math.min(Math.max(0, Math.floor((ctrl.scroll - ctrl.offsetTop.top) / 40)), ctrl.spells.length);
        if (elements !== ctrl.elements || start !== ctrl.start) {
          ctrl.start = start;
          ctrl.elements = elements;
          ctrl.spellsL = ctrl.spells.slice(ctrl.start, ctrl.start + ctrl.elements);
          redrawPreparedBookLists();
        }
      }
    }
  };

  ctrl.redraw = () => {
    ctrl.$doCheck();
    $scope.$digest();
  };

  ctrl.chooseSpell = (spell) => {
    spellService.showSpell(spell.name);
  };

  ctrl.isFav = (spell) => filterService.isFav(spell);

  ctrl.changeFav = (spell) => {
    filterService.changeFav(spell);
  };

  ctrl.isInSpellBook = (spellName) => {
    if (characterService.getSelectedCharacter().book) {
      const present = Object.entries(characterService.getSelectedCharacter().book)
        .reduce((acc, curr) => acc || curr[1]
          .reduce((acc2, curr2) => acc2 || (curr2 === spellName), false),
        false);
      return present;
    }
    return false;
  };

  ctrl.isSpellPrepared = (spellName) => {
    if (!characterService.getSelectedCharacter().prepared) {
      if (characterService.getSelectedCharacter().knownSpells) {
        const present = characterService.getSelectedCharacter().knownSpells[ctrl.lvl]
                       && characterService.getSelectedCharacter().knownSpells[ctrl.lvl].spells
                         .reduce((acc2, curr2) => acc2 || (curr2.name === spellName), false);
        return present;
      }
    } else if (characterService.getSelectedCharacter().preparedSpells) {
      const present = Object.entries(characterService.getSelectedCharacter().preparedSpells)
        .reduce((acc, curr) => acc + curr[1].spells
          .reduce((acc2, curr2) => acc2 + (
            curr2.name === spellName
              ? 1
              : 0), 0), 0);
      return present;
    }
    return false;
  };

  ctrl.addToBook = (spell) => {
    if (!characterService.getSelectedCharacter().book) {
      characterService.getSelectedCharacter().book = {};
    }
    $log.debug(spell.levels);
    let level = spell.levels.reduce((accumulator, currentValue) => {
      if (CLASSES[ctrl.classSelected].search && CLASSES[ctrl.classSelected].search.length) {
        if (CLASSES[ctrl.classSelected].search.reduce((acc, curr) => acc || currentValue.search(curr) !== -1, false)) {
          const curLevel = currentValue.substring(currentValue.length - 1);
          if (!accumulator || accumulator > curLevel) {
            return curLevel;
          }
        }
      }
      return accumulator;
    }, undefined);
    if (level === undefined) {
      level = ctrl.lvl;
    }
    if (!characterService.getSelectedCharacter().book[level]) {
      characterService.getSelectedCharacter().book[level] = [];
    }
    characterService.getSelectedCharacter().book[level].push(spell.name);
    characterService.persist();
    redrawPreparedBookLists();
    ga('send', 'event', 'spellbook_add', spell.name, characterService.getSelectedCharacter().class);
  };

  ctrl.addSpell = (spell) => {
    $log.debug('ctrl.addSpell', ctrl.collapseName, spell);
    const spellToAdd = {
      name: spell.name,
    };
    addSpell(spell, spellToAdd);
  };

  ctrl.addSpellAsDomain = (spell) => {
    $log.debug('ctrl.addSpellAsDomain', spell);
    const spellToAdd = {
      name: spell.name,
      domain: true,
    };
    addSpell(spell, spellToAdd);
  };

  ctrl.addSpellAsSpecial = (spell) => {
    $log.debug('ctrl.addSpellAsSpecial', spell);
    const spellToAdd = {
      name: spell.name,
      special: true,
    };
    addSpell(spell, spellToAdd);
  };

  ctrl.addSpellAsMetamagic = (spell) => {
    spellbookService.addMetamagic(spell, ctrl.classSelected, ctrl.lvl);
  };
}

const SpellbookSpelllistLightComponent = {
  template: require('./spellbook-spelllist-light.html'),
  controller: [
    '$log',
    '$scope',
    'filterService',
    'characterService',
    'spellService',
    'spellbookService',
    '$window',
    '$document',
    'CLASSES',
    SpellbookSpelllistLightController,
  ],
  bindings: {
    spells: '<',
    collapseName: '<',
    classSelected: '<',
    lvl: '<',
  },
};

export default SpellbookSpelllistLightComponent;

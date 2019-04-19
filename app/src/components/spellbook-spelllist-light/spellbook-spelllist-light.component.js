"use strict";

function SpellbookSpelllistLightController($log, $state, $scope, $rootScope, $uibModal, $timeout, filterService, spellService, spellbookService, $window, $document, CLASSES) {
  $log.debug('SpellbookSpelllistLightController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("SpellbookSpelllistLightController init");
    ctrl.prepared = spellbookService.selectedCharacter.prepared;
    ctrl.spellbook = spellbookService.selectedCharacter.spellbook;
    angular.element($window).bind('scroll', function() {
      ctrl.redraw();
    })
    angular.element($window).bind('resize', function() {
      ctrl.redraw();
    });
    $log.debug(angular.element('#' + ctrl.collapseName));
  }

  ctrl.$onChanges = function(ch) {
    ctrl.elementHeight = ctrl.spells.length * 40;
    ctrl.spellsL = ctrl.spells.slice(ctrl.start, ctrl.start + ctrl.elements);
  }

  ctrl.$doCheck = function() {
    ctrl.collapse = angular.element('#' + ctrl.collapseName);
    if (ctrl.collapse.attr('class')) {
      ctrl.classes = ctrl.collapse.attr('class').split(" ");
      ctrl.scroll = $document.scrollTop();
      ctrl.offsetTop = angular.element('#list-new-' + ctrl.collapseName).offset();
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
        if (elements != ctrl.elements || start != ctrl.start) {
          ctrl.start = start;
          ctrl.elements = elements;
          ctrl.spellsL = ctrl.spells.slice(ctrl.start, ctrl.start + ctrl.elements);
        }
      }
    }
  }

  ctrl.redraw = function() {
    ctrl.$doCheck();
    $scope.$digest();
  }

  ctrl.chooseSpell = function(spell) {
    spellService.showSpell(spell.name);
  }

  ctrl.isFav = function(spell) {
    return filterService.isFav(spell);
  }

  ctrl.changeFav = function(spell) {
    filterService.changeFav(spell);
  }

  ctrl.isInSpellBook = function(spellName) {
    if (spellbookService.selectedCharacter.book) {
      const present = Object.entries(spellbookService.selectedCharacter.book).reduce((acc, curr) => acc || curr[1].reduce((acc2, curr2) => acc2 || (curr2 == spellName), false), false);
      return present;
    }
    return false;
  }

  ctrl.isSpellPrepared = function(spellName) {
    if (!spellbookService.selectedCharacter.prepared) {
      if (spellbookService.selectedCharacter.knownSpells) {
        const present = Object.entries(spellbookService.selectedCharacter.knownSpells).reduce((acc, curr) => acc || curr[1].spells.reduce((acc2, curr2) => acc2 || (curr2.name == spellName), false), false);
        return present;
      }
    } else {
      if (spellbookService.selectedCharacter.preparedSpells) {
        const present = Object.entries(spellbookService.selectedCharacter.preparedSpells).reduce((acc, curr) => acc + curr[1].spells.reduce((acc2, curr2) => acc2 + (
          curr2.name == spellName ?
          1 :
          0), 0), 0);
        return present;
      }
    }
    return false;
  }

  ctrl.addToBook = function(spell) {
    if (!spellbookService.selectedCharacter.book) {
      spellbookService.selectedCharacter.book = {};
    }
    console.log(spell.levels);
    let level = spell.levels.reduce((accumulator, currentValue) => {
      if (CLASSES[ctrl.classSelected].search && CLASSES[ctrl.classSelected].search.length)
        if (CLASSES[ctrl.classSelected].search.reduce((acc, curr) => {
            return acc || currentValue.search(curr) != -1;
          }, false)) {
          const level = currentValue.substring(currentValue.length - 1);
          if (!accumulator || accumulator > level) {
            return level;
          }
        }
      return accumulator;
    }, undefined);
    if (level == undefined) {
      level = ctrl.lvl;
    }
    if (!spellbookService.selectedCharacter.book[level]) {
      spellbookService.selectedCharacter.book[level] = [];
    }
    spellbookService.selectedCharacter.book[level].push(spell.name);
    spellbookService.saveCharacters()
  }

  ctrl.addSpell = function(spell) {
    console.log("ctrl.addSpell", ctrl.collapseName, spell);
    const spellToAdd = {
      name: spell.name
    };
    addSpell(spell, spellToAdd);
  }

  ctrl.addSpellAsDomain = function(spell) {
    console.log("ctrl.addSpellAsDomain", spell);
    const spellToAdd = {
      name: spell.name,
      domain: true
    };
    addSpell(spell, spellToAdd);
  }

  ctrl.addSpellAsSpecial = function(spell) {
    console.log("ctrl.addSpellAsSpecial", spell);
    const spellToAdd = {
      name: spell.name,
      special: true
    };
    addSpell(spell, spellToAdd);
  }

  ctrl.addSpellAsMetamagic = function(spell) {
    console.log("ctrl.addSpellAsMetamagic", spell);
    const spellToAdd = {
      name: spell.name,
      metamagic: true
    };
    let modal = $uibModal.open({
      // animation: false,
      component: 'yesNoModal',
      backdropClass: 'fade show',
      windowClass: 'fade show',
      // windowTopClass: '',
      size: 'lg',
      resolve: {
        noLabel: () => {
          return "asd";
        },
        title: () => {
          return "asd";
        },
        yesLabel: () => {
          return "asd";
        },
        modalText: () => {
          return "asd";
        }
      }
    });
    modal.result.then(() => {
      console.log('modal result');
    }, () => {
      console.log('modal second');
    });
    // addSpell(lvl, spell, spellToAdd);
  }

  function addSpell(spell, spellToAdd) {
    console.log("addSpell 1", spellToAdd, spell);
    let level = spell.levels.reduce((accumulator, currentValue) => {
      if (CLASSES[ctrl.classSelected].search && CLASSES[ctrl.classSelected].search.length)
        if (CLASSES[ctrl.classSelected].search.reduce((acc, curr) => {
            return acc || currentValue.search(curr) != -1;
          }, false)) {
          const level = currentValue.substring(currentValue.length - 1);
          if (!accumulator || accumulator > level) {
            return level;
          }
        }
      return accumulator;
    }, undefined);
    console.log("addSpell 2", ctrl.lvl, level, spellToAdd);
    if (!level) {
      level = ctrl.lvl;
    }
    if (!spellbookService.selectedCharacter.prepared) {
      if (!spellbookService.selectedCharacter.knownSpells) {
        spellbookService.selectedCharacter.knownSpells = {};
      }
      if (!spellbookService.selectedCharacter.knownSpells[level]) {
        spellbookService.selectedCharacter.knownSpells[level] = {
          spells: []
        };
      }
      spellbookService.selectedCharacter.knownSpells[level].spells.push(spellToAdd);
    } else {
      if (!spellbookService.selectedCharacter.preparedSpells) {
        spellbookService.selectedCharacter.preparedSpells = {};
      }
      if (!spellbookService.selectedCharacter.preparedSpells[level]) {
        spellbookService.selectedCharacter.preparedSpells[level] = {
          spells: []
        };
      }
      spellbookService.selectedCharacter.preparedSpells[level].spells.push(spellToAdd);
    }
    spellbookService.saveCharacters();
    console.log(spellbookService.selectedCharacter);
  }

}

const SpellbookSpelllistLightComponent = {
  template: require('./spellbook-spelllist-light.html'),
  controller: ['$log', '$state', '$scope', '$rootScope', '$uibModal', '$timeout', 'filterService', 'spellService', 'spellbookService', '$window', '$document', 'CLASSES', SpellbookSpelllistLightController],
  bindings: {
    spells: '<',
    collapseName: '<',
    classSelected: '<',
    lvl: '<'
  }
}

export default SpellbookSpelllistLightComponent;

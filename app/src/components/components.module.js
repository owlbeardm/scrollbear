import History from './history/history.component';

import CharacterItem from './character-item/character-item.component';

import KnownSpelLevel from './known-spell-level/known-spell-level.component';

import ModalSpell from './modal-spell/modal-spell.component';

import PreparedSpelLevel from './prepared-spell-level/prepared-spell-level.component';

import SpellbookSpelllistLightComponent from './spellbook-spelllist-light/spellbook-spelllist-light.component';

import SpellListComponent from './spell-list/spell-list.component';

import SpellListLightComponent from './spell-list/spell-list-light.component';

import PageHeaderComponent from './page-header/page-header.component';

import PageFooterComponent from './page-footer/page-footer.component';

import FilterComponent from './filter/filter.component';

import SidebarToggleComponent from './sidebar-toggle/sidebar-toggle.component';

import SidebarComponent from './sidebar/sidebar.component';

import YesNoModalComponent from './yes-no-modal/yes-no-modal.component';

const appComponents = angular.module('app.components', []);
appComponents.component('history', History);
appComponents.component('characterItem', CharacterItem);
appComponents.component('knownSpellLevel', KnownSpelLevel);
appComponents.component('modalSpell', ModalSpell);
appComponents.component('preparedSpellLevel', PreparedSpelLevel);
appComponents.component('spellbookSpelllistLight', SpellbookSpelllistLightComponent);
appComponents.component('spellList', SpellListComponent);
appComponents.component('spellListLight', SpellListLightComponent);
appComponents.component('pageHeader', PageHeaderComponent);
appComponents.component('pageFooter', PageFooterComponent);
appComponents.component('filter', FilterComponent);
appComponents.component('sidebarToggle', SidebarToggleComponent);
appComponents.component('sidebar', SidebarComponent);
appComponents.component('yesNoModal', YesNoModalComponent);

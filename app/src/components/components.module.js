"use strict";

import './spelllist/spelllist.module.js';
import './spellbook/spellbook.module.js';
import './main/main.module.js';

const appComponents = angular.module('app.components', ['spelllist.components', 'spellbook.components', 'main.components']);

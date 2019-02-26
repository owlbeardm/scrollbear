"use strict";

import './spelllist/spelllist.module.js';
import './main/main.module.js';

const appComponents = angular.module('app.components', ['spelllist.components', 'main.components']);

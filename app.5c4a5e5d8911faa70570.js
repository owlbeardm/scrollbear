!function(e){function n(n){for(var l,s,o=n[0],c=n[1],i=n[2],d=0,u=[];d<o.length;d++)s=o[d],a[s]&&u.push(a[s][0]),a[s]=0;for(l in c)Object.prototype.hasOwnProperty.call(c,l)&&(e[l]=c[l]);for(p&&p(n);u.length;)u.shift()();return r.push.apply(r,i||[]),t()}function t(){for(var e,n=0;n<r.length;n++){for(var t=r[n],l=!0,o=1;o<t.length;o++){var c=t[o];0!==a[c]&&(l=!1)}l&&(r.splice(n--,1),e=s(s.s=t[0]))}return e}var l={},a={0:0},r=[];function s(n){if(l[n])return l[n].exports;var t=l[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=e,s.c=l,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var l in e)s.d(t,l,function(n){return e[n]}.bind(null,l));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="";var o=window.webpackJsonp=window.webpackJsonp||[],c=o.push.bind(o);o.push=n,o=o.slice();for(var i=0;i<o.length;i++)n(o[i]);var p=c;r.push(["Ha7V",3,2,1]),t()}({"13op":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var l={template:t("lwo9"),controller:["$log",function(e){this.$onInit=function(){e.debug("AppController init")}}]};n.default=l},"6n4l":function(e,n,t){"use strict";var l=o(t("IP2n")),a=o(t("Kvk2")),r=o(t("Qh26")),s=o(t("qTWB"));function o(e){return e&&e.__esModule?e:{default:e}}var c=angular.module("app.components",[]);c.component("spell",l.default),c.component("spelllist",a.default),c.component("pageheader",r.default),c.component("main",s.default)},"87dM":function(e,n,t){"use strict";angular.module("app.services",[]),t("TBcf")},Ha7V:function(e,n,t){"use strict";t("KHwQ"),t("2C69"),t("102d"),t("zOca"),t("6n4l"),t("87dM"),t("NxeQ");var l,a=t("13op"),r=(l=a)&&l.__esModule?l:{default:l};"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("/service-worker.js").then(function(e){console.log("SW registered: ",e)}).catch(function(e){console.log("SW registration failed: ",e)})});var s=angular.module("initiativeApp",["app.components","app.constants","app.services","ui.router"]);s.component("app",r.default),s.config(["$stateProvider","$locationProvider",function(e,n){e.state({name:"main",url:"/",component:"main",onEnter:["$rootScope",function(e){angular.element("#exampleModal").modal("hide"),e.title="",e.description="Scrollbear spellbook reference for Pathfinder RPG."}]}),e.state({name:"spells",url:"spells/:spellUrl",parent:"main",resolve:{spell:["spellService","$stateParams",function(e,n){return e.getSpellByUrl(n.spellUrl)}]},onEnter:["spell","$rootScope",function(e,n){n.title=e.name+" - ",n.description=e.description,n.spell=e,angular.element("#exampleModal").modal("show")}],onExit:["$rootScope",function(e){angular.element("#exampleModal").modal("hide"),e.title="",e.description="Scrollbear spellbook reference for Pathfinder RPG."}]}),n.html5Mode(!0)}]),s.run(["$log","$transitions","$location",function(e,n,t){n.onStart({to:"main"},function(e){if(console.log("onBefore Transition from "+e.from().name+" to "+e.to().name),t.search()._escaped_fragment_){var n=t.search()._escaped_fragment_;t.search({}),t.path(n)}}),n.onStart({from:"spells"},function(e){t.replace()}),n.onStart({to:"spells"},function(e){t.replace()})}])},IP2n:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var l={template:t("jGoG"),controller:["$log","$rootScope","$state",function(e,n,t){e.debug("SpellController create");var l=this;l.rootScope=n,l.$onInit=function(){var n=angular.element("#exampleModal");e.debug("Modal popup",n),n.on("hidden.bs.modal",function(){t.go("main")})},l.getDescripters=function(){for(var e="[",n=0;n<l.rootScope.spell.descripters.length;n++)e=e+(0!=n?", ":"")+l.rootScope.spell.descripters[n];return e+"]"}}]};n.default=l},Kbvx:function(e,n){e.exports='<spell spell="$ctrl.spell"></spell>\n<div class="card">\n  <div class="card-header">\n    <div class="flextable table-actions">\n      <div class="flextable-item ">\n        <form ng-submit="$ctrl.search()">\n          <div class="form-row">\n            <div class="col col-centered ">\n              <select class="form-control" ng-change="$ctrl.setClass()" name="classSelect" id="classSelect" ng-model="$ctrl.classSelected">\n                <option ng-repeat="(key, value) in $ctrl.classes" value="{{key}}">{{value.name}}</option>\n              </select>\n            </div>\n          </div>\n          <div class="form-row">\n            <div class="col">\n              <input type="text" class="form-control input-block" placeholder="Search" ng-change="$ctrl.search()" ng-model="$ctrl.filter">\n            </div>\n            <div class="col-auto">\n              <div class="form-check">\n                <label class="form-check-label text-info">\n                  <input class="form-check-input" type="checkbox" ng-change="$ctrl.setFavOnly()" ng-model="$ctrl.favOnly">\n                  <span class="form-check-sign">\n                    <span class="check"></span>\n                  </span>\n                  Favorites Only\n                </label>\n              </div>\n            </div>\n          </div>\n          <div class="form-row">\n            <div class="col">\n              <button class="btn btn-sm" ng-click="$ctrl.reset()">Reset</button>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n  <div class="card-body">\n    <spelllist spells="$ctrl.spells" class-name="$ctrl.classSelected"></spelllist>\n  </div>\n  <div class="card-footer">\n    <div class="container">\n      <span class="float-right">\n      Total: {{$ctrl.total}}\n    </span>\n    </div>\n  </div>\n</div>\n<ui-view></ui-view>\n'},Kvk2:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var l={template:t("S2v3"),controller:["$log","$rootScope","$state","spellService","CLASSES",function(e,n,t,l,a){e.debug("SpellController create");var r=this;r.rootScope=n,r.$onInit=function(){e.debug("SpellListController init"),r.classesC=a},r.chooseSpell=function(e){r.spell=e;var n=r.spell.name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g,"-").replace(/[’]/g,"_");t.go("spells",{spellUrl:n})},r.isFav=function(e){return l.isFav(e)},r.changeFav=function(e){l.changeFav(e)}}],bindings:{spells:"<",className:"<"}};n.default=l},NxeQ:function(e,n,t){"use strict";angular.module("app.constants",[]).constant("CLASSES",{alchemist:{name:"Alchemist",search:["alchemist"]},antipaladin:{name:"Antipaladin",search:["antipaladin"]},arcanist:{name:"Arcanist",search:["arcanist","wizard","sorcerer"]},bard:{name:"Bard",search:["bard"]},bloodrager:{name:"Bloodrager",search:["bloodrager"]},cleric:{name:"Cleric",search:["cleric"]},druid:{name:"Druid",search:["druid"]},hunter:{name:"Hunter",search:["hunter","druid","ranger"]},inquisitor:{name:"Inquisitor",search:["inquisitor"]},investigator:{name:"Investigator",search:["investigator","alchemist"]},magus:{name:"Magus",search:["magus"]},medium:{name:"Medium",search:["medium"]},mesmerist:{name:"Mesmerist",search:["mesmerist"]},occultist:{name:"Occultist",search:["occultist"]},oracle:{name:"Oracle",search:["oracle","cleric"]},paladin:{name:"Paladin",search:["paladin"]},psychic:{name:"Psychic",search:["psychic"]},ranger:{name:"Ranger",search:["ranger"]},shaman:{name:"Shaman",search:["shaman"]},skald:{name:"Skald",search:["bard","skald"]},sorcerer:{name:"Sorcerer",search:["sorcerer"]},spiritualist:{name:"Spiritualist",search:["spiritualist"]},summoner:{name:"Summoner",search:["summoner"]},warpriest:{name:"Warpriest",search:["warpriest","cleric"]},witch:{name:"Witch",search:["witch"]},wizard:{name:"Wizard",search:["wizard","sorcerer"]}})},Qh26:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var l={template:t("SEDi"),controller:["$log",function(e){e.debug("PageHeaderController create");var n=this;n.$onInit=function(){e.debug("PageHeaderController init ",n.title,n.breadcrumbItems),n.titleValues=n.titleValues||{},n.subtitleValues=n.subtitleValues||{}}}],bindings:{title:"@",subtitle:"@?"}};n.default=l},S2v3:function(e,n){e.exports='<div class="accordion" id="accordionExample">\n  <div ng-repeat="(key, value) in $ctrl.spells" class="card card-collapse">\n    <div class="card-header" role="tab" id="heading{{key}}" data-toggle="collapse" href="#collapse{{key}}" aria-expanded="true" aria-controls="collapse{{key}}">\n      <h5 class="mb-0 text-primary">\n        <a >\n          {{$ctrl.classesC[$ctrl.className].name}} {{key}}\n          <i class="float-right fas fa-chevron-down"></i>\n          <div><small class=\'text-muted\'>count {{value.length}}</small></div>\n        </a>\n      </h5>\n    </div>\n\n    <div id="collapse{{key}}" class="collapse" role="tabpanel" aria-labelledby="heading{{key}}" data-parent="#accordionExample">\n      <div class="card-body">\n        <table class="table">\n          <tbody>\n            <tr ng-repeat="spell in value track by $index">\n              <td ng-click="$ctrl.chooseSpell(spell)">\n                <a href="#" class="text-dark">\n                  {{spell.name}}\n                </a>\n                <div><small class="text-info">{{spell.duration}}</small>; <small class="text-info">{{spell.savingThrow}}</small></div>\n              </td>\n              <td class="float-right">\n                <button type="button" rel="tooltip" title="" class="btn btn-primary btn-link btn-sm" ng-click="$ctrl.changeFav(spell)">\n                  <i class="fa-2x fa-star" ng-class="{\'fas text-primary\': $ctrl.isFav(spell), \'far text-muted\': !$ctrl.isFav(spell)}"></i>\n                  <div class="ripple-container"></div>\n                </button>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>\n'},SEDi:function(e,n,t){e.exports='<nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">\n  <div class="container-fluid">\n    <div class="navbar-wrapper">\n      <img src="'+t("TtU3")+'" style="width: 72px;" class="img-fluid float-left" alt="Responsive image">\n      <h2 class="text-light ml-3 align-top">\n        <span>{{$ctrl.title}}</span>\n      </h2>\n      <h6 class="text-primary ml-3 align-top" ng-if="$ctrl.subtitle">\n        <span>{{$ctrl.subtitle}}</span>\n      </h6>\n    </div>\n  </div>\n</nav>\n'},TBcf:function(e,n,t){"use strict";var l=t("kTu0");angular.module("app.services").factory("spellService",["$log","$window","CLASSES",function(e,n,t){var a={},r=n.localStorage,s=[];return a.getAllSpells=function(){return s},a.setClass=function(e){s=l.filter(function(n){return n.levels.split(", ").reduce(function(n,l){var a=l.substring(0,l.length-2),r=t[e].search.reduce(function(e,n){return e||a.startsWith(n)},!1);return n||r},!1)})},a.getSpellByUrl=function(e){return l.find(function(n){return n.name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g,"-").replace(/[’]/g,"_")==e})},a.isFav=function(e){var n=JSON.parse(r.getItem("FAV_SPELLS"));return n&&n.length||(n=[]),n.includes(e.name)},a.changeFav=function(e){var n=JSON.parse(r.getItem("FAV_SPELLS"));n&&n.length||(n=[]),n.includes(e.name)?n.splice(n.indexOf(e.name),1):n.push(e.name),r.setItem("FAV_SPELLS",JSON.stringify(n))},a}])},TtU3:function(e,n,t){e.exports=t.p+"29c29b1671ae5a81d788b944e8611181.png"},jGoG:function(e,n){e.exports='<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">\n  <div class="modal-dialog modal-lg" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h3 class="modal-title" id="exampleModalLabel">{{$ctrl.rootScope.spell.name}}</h3>\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n      <span class="fas fa-times"></span>\n    </button>\n      </div>\n      <div class="modal-body">\n        <div>\n          <p><b>School </b> {{$ctrl.rootScope.spell.school}}<span ng-if="$ctrl.rootScope.spell.subschool"> ({{$ctrl.rootScope.spell.subschool}})</span><span ng-if="$ctrl.rootScope.spell.descripters"> {{$ctrl.getDescripters()}}</span>;\n          <b>Level </b>{{$ctrl.rootScope.spell.levels}}<br />\n          \x3c!-- sorcerer/wizard 1 --\x3e\n          <b>Casting Time </b>\n          {{$ctrl.rootScope.spell.castingTime}}<br />\n          <b>Components </b>\n          {{$ctrl.rootScope.spell.components}}<br />\n          <span ng-if="$ctrl.rootScope.spell.range"><b>Range </b>{{$ctrl.rootScope.spell.range}}<br /></span>\n          <span ng-if="$ctrl.rootScope.spell.area"><b>Area </b>{{$ctrl.rootScope.spell.area}}<br /></span>\n          <span ng-if="$ctrl.rootScope.spell.target"><b>Target </b>{{$ctrl.rootScope.spell.target}}<br /></span>\n          <span ng-if="$ctrl.rootScope.spell.targets"><b>Targets </b>{{$ctrl.rootScope.spell.targets}}<br /></span>\n          <span ng-if="$ctrl.rootScope.spell.effect"><b>Effect </b>{{$ctrl.rootScope.spell.effect}}<br /></span>\n          <span ng-if="$ctrl.rootScope.spell.duration"><b>Duration </b>{{$ctrl.rootScope.spell.duration}}<br /></span>\n          <span ng-if="$ctrl.rootScope.spell.savingThrow"><b>Saving Throw </b>{{$ctrl.rootScope.spell.savingThrow}}; <b>Spell Resistance </b>{{$ctrl.rootScope.spell.spellResistance}}</p></span>\n          <p ng-repeat="paragraph in $ctrl.rootScope.spell.description.split(\'\\n\') track by $index">{{paragraph}}</p>\n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>\n      </div>\n    </div>\n  </div>\n</div>\n'},lwo9:function(e,n){e.exports='<div class="wrapper">\n  <div class="main-panel">\n    <pageheader title="ScrollBear" subtitle="Handy Spellbook"></pageheader>\n\n    <div class="content">\n      \x3c!-- <div class="container-fluid"> --\x3e\n        <div class="row">\n          <div class="col-xl-8 col-centered">\n            <ui-view></ui-view>\n          </div>\n        </div>\n      \x3c!-- </div> --\x3e\n    </div>\n\n\n  </div>\n</div>\n\n<spell></spell>\n'},qTWB:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var l={template:t("Kbvx"),controller:["spellService","$window","$state","$log","CLASSES",function(e,n,t,l,a){l.debug("SpellController create");var r=this,s=n.localStorage;r.$onInit=function(){l.debug("AppController init");var e=angular.element("#exampleModal");l.debug("Modal popup",e),e.on("hidden.bs.modal",function(){t.go("main")}),r.classes=a;var n=JSON.parse(s.getItem("FAV_ONLY")),o=JSON.parse(s.getItem("SELECTED_CLASS"));r.classSelected=o&&a[o]?o:"wizard",r.favOnly=n||!1,r.setClass()},r.chooseSpell=function(e){r.spell=r.spells[e];var n=r.spell.name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g,"-").replace(/[’]/g,"_");t.go("spells",{spellUrl:n})},r.isFav=function(n){return e.isFav(r.spells[n])},r.changeFav=function(n){e.changeFav(r.spells[n])},r.search=function(){var n;l.debug("AppController ctrl.search",r.filter),r.spells=(n={},e.getAllSpells().forEach(function(t){var l=!1;if(l=!r.filter||t.name.toLowerCase().includes(r.filter.toLowerCase()),r.favOnly&&(l=l&&e.isFav(t)),l){var s=t.levels.split(", ").reduce(function(e,n){var t=n.substring(0,n.length-2);if(a[r.classSelected].search.reduce(function(e,n){return e||t.startsWith(n)},!1)){var l=n.substring(n.length-1);if(!e||l<e)return l}return e},void 0);s&&(n[s]||(n[s]=[]),n[s].push(t))}}),r.total=Object.entries(n).reduce(function(e,n){return e+n[1].length},0),n)},r.setClass=function(){e.setClass(r.classSelected),s.setItem("SELECTED_CLASS",JSON.stringify(r.classSelected)),r.search()},r.setFavOnly=function(){s.setItem("FAV_ONLY",JSON.stringify(r.favOnly)),r.search()},r.reset=function(){r.filter=""}}]};n.default=l}});
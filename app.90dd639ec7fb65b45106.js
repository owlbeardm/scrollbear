!function(e){function n(n){for(var a,s,o=n[0],i=n[1],c=n[2],u=0,d=[];u<o.length;u++)s=o[u],l[s]&&d.push(l[s][0]),l[s]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);for(p&&p(n);d.length;)d.shift()();return r.push.apply(r,c||[]),t()}function t(){for(var e,n=0;n<r.length;n++){for(var t=r[n],a=!0,o=1;o<t.length;o++){var i=t[o];0!==l[i]&&(a=!1)}a&&(r.splice(n--,1),e=s(s.s=t[0]))}return e}var a={},l={0:0},r=[];function s(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.m=e,s.c=a,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)s.d(t,a,function(n){return e[n]}.bind(null,a));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="";var o=window.webpackJsonp=window.webpackJsonp||[],i=o.push.bind(o);o.push=n,o=o.slice();for(var c=0;c<o.length;c++)n(o[c]);var p=i;r.push(["Ha7V",3,2,1]),t()}({"13op":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={template:t("lwo9"),controller:["$log",function(e){this.$onInit=function(){e.debug("AppController init")}}]};n.default=a},"5A2s":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={template:t("J235"),controller:["notificationService","filterService","spellService","$window","$state","$scope","$log","CLASSES",function(e,n,t,a,l,r,s,o){s.debug("SpellController create");var i=this,c=a.localStorage;function p(){i.otherSpellsCount=0;var e=t.getSpellsSplited();return i.total=Object.entries(e).reduce(function(e,n){return e+n[1].length},0),i.total||(i.otherSpellsCount=t.getSpellsCountByFilter()),e}i.$onInit=function(){s.debug("AppController init");var n=angular.element("#exampleModal");s.debug("Modal popup",n),n.on("hidden.bs.modal",function(){l.go("main")}),i.classes=o;var t=JSON.parse(c.getItem("SELECTED_CLASS"));i.classSelected=t&&o[t]?t:"wizard",i.setClass(),e.subscribe(r,e.FILTER_CHANGED,function(e,n){i.spells=p()})},i.search=function(){s.debug("AppController ctrl.search",i.filter),i.spells=p()},i.setClass=function(){t.setClass(i.classSelected),c.setItem("SELECTED_CLASS",JSON.stringify(i.classSelected)),i.search()},i.classToAll=function(){i.classSelected="all",i.setClass()}}]};n.default=a},"6n4l":function(e,n,t){"use strict";var a=c(t("EwJf")),l=c(t("lLoU")),r=c(t("lLAa")),s=c(t("O9me")),o=c(t("GAHJ")),i=c(t("5A2s"));function c(e){return e&&e.__esModule?e:{default:e}}var p=angular.module("app.components",[]);p.component("spell",a.default),p.component("spelllist",l.default),p.component("pageheader",r.default),p.component("pagefooter",s.default),p.component("filter",o.default),p.component("main",i.default)},"87dM":function(e,n,t){"use strict";angular.module("app.services",[]),t("TBcf"),t("vNZY"),t("LVIG")},EwJf:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={template:t("WhGt"),controller:["$log","$rootScope","$state",function(e,n,t){e.debug("SpellController create"),this.$onInit=function(){var n=angular.element("#exampleModal");e.debug("Modal popup",n),n.on("hidden.bs.modal",function(){t.go("main")})},this.dd=function(){return e.debug("ctrl.dd"),n.spellDescription},this.getDescripters=function(){for(var e="[",t=0;t<n.spell.descripters.length;t++)e=e+(0!=t?", ":"")+n.spell.descripters[t];return e+"]"}}]};n.default=a},GAHJ:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={template:t("f1Ss"),controller:["notificationService","filterService","$log","$window","CLASSES",function(e,n,t,a,l){t.debug("FilterController create");var r=this,s=a.localStorage;r.$onInit=function(){t.debug("FilterController init "),JSON.parse(s.getItem("FAV_ONLY")),r.favOnly=n.favOnly},r.search=function(){t.debug("AppController ctrl.search",r.filter),n.filterText=r.filter,e.notify(e.FILTER_CHANGED,void 0)},r.setClass=function(){s.setItem("SELECTED_CLASS",JSON.stringify(r.classSelected)),r.search()},r.setFavOnly=function(){n.setFavOnly(r.favOnly),r.search()},r.reset=function(){r.filter=""}}],bindings:{}};n.default=a},Ha7V:function(e,n,t){"use strict";t("KHwQ"),t("2C69"),t("wmx0"),t("102d"),t("zOca"),t("6n4l"),t("QFgh"),t("87dM"),t("NxeQ");var a,l=t("13op"),r=(a=l)&&a.__esModule?a:{default:a};var s=t("M55E");"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("/service-worker.js").then(function(e){console.log("SW registered: ",e)}).catch(function(e){console.log("SW registration failed: ",e)})});var o=angular.module("initiativeApp",["app.components","app.constants","app.services","app.filters","ui.router","ngSanitize"]);o.component("app",r.default),o.config(["$stateProvider","$locationProvider",function(e,n){e.state({name:"main",url:"/",component:"main",onEnter:["$rootScope",function(e){e.title="",e.description="Scrollbear spellbook reference for Pathfinder RPG."}]}),e.state({name:"spells",url:"spells/:spellUrl",parent:"main",resolve:{spell:["spellService","$stateParams",function(e,n){return e.getSpellByUrl(n.spellUrl)}]},onEnter:["spell","$rootScope",function(e,n){n.title=e.name+" - ",n.spell=e;var t,a=(t=e.description,("<div>"+new s.Converter({tables:!0,strikethrough:!0}).makeHtml(t)+"</div>").replace(/<table>/g,"<div class='table-responsive'><table class='table table-sm'>").replace(/<\/table>/g,"</table></div>").replace(/<thead>/g,"<thead class='text-primary'>"));n.description=e.description,n.spellDescription=a,angular.element("#exampleModal").modal("show")}]}),n.html5Mode(!0)}]),o.run(["$log","$transitions","$location",function(e,n,t){n.onStart({},function(e){if(console.log("onBefore Transition from "+e.from().name+" to "+e.to().name),t.search()._escaped_fragment_){var n=t.search()._escaped_fragment_;t.search({}),t.path(n)}}),n.onStart({from:"spells"},function(e){"spells"!=e.to().name&&(console.log("onStart replace Transition from "+e.from().name+" to "+e.to().name),t.replace())}),n.onStart({to:"spells"},function(e){"spells"!=e.from().name&&(console.log("onStart replace Transition from "+e.from().name+" to "+e.to().name),t.replace())})}])},J235:function(e,n){e.exports='<spell spell="$ctrl.spell"></spell>\n<div class="card">\n  <div class="card-header">\n    <form ng-submit="$ctrl.search()">\n      <div class="form-row">\n        <div class="col col-centered ">\n          <select class="form-control" ng-change="$ctrl.setClass()" name="classSelect" id="classSelect" ng-model="$ctrl.classSelected">\n            <option ng-repeat="(key, value) in $ctrl.classes" value="{{key}}">{{value.name}}</option>\n          </select>\n        </div>\n      </div>\n    </form>\n    <filter></filter>\n  </div>\n  <div class="card-body">\n    <spelllist spells="$ctrl.spells" class-name="$ctrl.classSelected"></spelllist>\n    <button ng-if="$ctrl.otherSpellsCount" ng-click="$ctrl.classToAll()" class=\'btn btn-warning\'>Found <strong>{{$ctrl.otherSpellsCount}}</strong> spell{{$ctrl.otherSpellsCount!=1?\'s\':\'\'}} in other classes</button>\n  </div>\n  <div class="card-footer">\n    <div class="container">\n      <span class="float-right">\n        Total: {{$ctrl.total}}\n      </span>\n    </div>\n  </div>\n</div>\n<ui-view></ui-view>\n'},LVIG:function(e,n,t){"use strict";angular.module("app.services").factory("notificationService",["$rootScope","$log",function(e,n){var t={FILTER_CHANGED:"Filter:Changed",subscribe:function(n,t,a){var l=e.$on(t,a);n.$on("$destroy",l)},notify:function(t,a){n.debug("NotificationService.notify",t,a),e.$emit(t,a)}};return t}])},NxeQ:function(e,n,t){"use strict";var a=angular.module("app.constants",[]);a.constant("CLASSES",{all:{name:"All"},alchemist:{name:"Alchemist",search:["alchemist"]},antipaladin:{name:"Antipaladin",search:["antipaladin"]},arcanist:{name:"Arcanist",search:["arcanist","wizard","sorcerer"]},bard:{name:"Bard",search:["bard"]},bloodrager:{name:"Bloodrager",search:["bloodrager"]},cleric:{name:"Cleric",search:["cleric"]},druid:{name:"Druid",search:["druid"]},hunter:{name:"Hunter",search:["hunter","druid","ranger"]},inquisitor:{name:"Inquisitor",search:["inquisitor"]},investigator:{name:"Investigator",search:["investigator","alchemist"]},magus:{name:"Magus",search:["magus"]},medium:{name:"Medium",search:["medium"]},mesmerist:{name:"Mesmerist",search:["mesmerist"]},occultist:{name:"Occultist",search:["occultist"]},oracle:{name:"Oracle",search:["oracle","cleric"]},paladin:{name:"Paladin",search:["paladin"]},psychic:{name:"Psychic",search:["psychic"]},ranger:{name:"Ranger",search:["ranger"]},shaman:{name:"Shaman",search:["shaman"]},skald:{name:"Skald",search:["bard","skald"]},sorcerer:{name:"Sorcerer",search:["sorcerer"]},spiritualist:{name:"Spiritualist",search:["spiritualist"]},summoner:{name:"Summoner",search:["summoner"]},warpriest:{name:"Warpriest",search:["warpriest","cleric"]},witch:{name:"Witch",search:["witch"]},wizard:{name:"Wizard",search:["wizard","sorcerer"]}}),a.constant("SCHOOL",{transmutation:{name:"Transmutation",search:["transmutation"]},conjuration:{name:"Conjuration",search:["conjuration"]},evocation:{name:"Evocation",search:["evocation"]},enchantment:{name:"Enchantment",search:["enchantment"]},abjuration:{name:"Abjuration",search:["abjuration"]},necromancy:{name:"Necromancy",search:["necromancy"]},divination:{name:"Divination",search:["divination"]},illusion:{name:"Illusion",search:["illusion"]},other:{name:"Other",search:function(e){return!["transmutation","conjuration","evocation","enchantment","abjuration","necromancy","divination","illusion"].includes(e.school)}}})},O9me:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={template:t("ijqF"),controller:["$log",function(e){e.debug("PageFooterController create"),this.$onInit=function(){e.debug("PageFooterController init ")}}],bindings:{}};n.default=a},QFgh:function(e,n,t){"use strict";angular.module("app.filters",[]),t("xODW")},TBcf:function(e,n,t){"use strict";var a=t("kTu0");angular.module("app.services").factory("spellService",["$log","$window","filterService","CLASSES",function(e,n,t,l){var r={};n.localStorage;return r.currentSpells=[],r.classSet=[],r.getAllSpells=function(){return r.currentSpells},r.getSpellsSplited=function(){var e=r.currentSpells.filter(t.filter),n={};return e.forEach(function(e){var t=e.levels.reduce(function(e,n){var t=n.substring(0,n.length-2);if(!l[r.classSet].search||l[r.classSet].search.reduce(function(e,n){return e||t.startsWith(n)},!1)){var a=n.substring(n.length-1);if(!e||a<e)return a}return e},void 0);t&&(n[t]||(n[t]=[]),n[t].push(e))}),n},r.setClass=function(e){r.classSet=e,r.currentSpells=a.filter(function(n){return!!n.levels&&n.levels.reduce(function(n,t){var a=t.substring(0,t.length-2),r=!l[e].search||l[e].search.reduce(function(e,n){return e||a.startsWith(n)},!1);return n||r},!1)})},r.getSpellByUrl=function(e){return a.find(function(n){return r.spellNameToUrl(n.name)==e})},r.spellNameToUrl=function(e){return e.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g,"-").replace(/[’]/g,"_")},r.getSpellsCountByFilter=function(){return a.filter(t.filter).length},r}])},TtU3:function(e,n,t){e.exports=t.p+"29c29b1671ae5a81d788b944e8611181.png"},WhGt:function(e,n){e.exports='<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">\n  <div class="modal-dialog modal-lg" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <h3 class="modal-title" id="exampleModalLabel">{{$root.spell.name}}</h3>\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n      <span class="fas fa-times"></span>\n    </button>\n      </div>\n      <div class="modal-body">\n        <div>\n          <div class="spell-description">\n            <p><b>School </b> {{$root.spell.school}}<span ng-if="$root.spell.subschool"> ({{$root.spell.subschool}})</span><span ng-if="$root.spell.descripters"> {{$ctrl.getDescripters()}}</span>;\n              <b>Level </b><span>{{$root.spell.levels | array}}</span></p>\n            <p><b>Casting Time </b> {{$root.spell.castingTime}}</p>\n            <p><b>Components </b> {{$root.spell.components | array}}</p>\n            <p><span ng-if="$root.spell.range"><b>Range </b>{{$root.spell.range}}</span></p>\n            <p><span ng-if="$root.spell.area"><b>Area </b>{{$root.spell.area}}</span></p>\n            <p><span ng-if="$root.spell.target"><b>Target </b>{{$root.spell.target}}</span></p>\n            <p><span ng-if="$root.spell.targets"><b>Targets </b>{{$root.spell.targets}}</span></p>\n            <p><span ng-if="$root.spell.effect"><b>Effect </b>{{$root.spell.effect}}</span></p>\n            <p><span ng-if="$root.spell.duration"><b>Duration </b>{{$root.spell.duration}}</span></p>\n            <p><span ng-if="$root.spell.savingThrow"><b>Saving Throw </b>{{$root.spell.savingThrow}}; <b>Spell Resistance </b>{{$root.spell.spellResistance}}</span></p>\n          </div>\n          \x3c!-- <p ng-repeat="paragraph in $root.spell.description.split(\'\\n\') track by $index">{{paragraph}}</p> --\x3e\n          <ng-bind-html ng-bind-html="$ctrl.dd()"></ng-bind-html>\n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>\n      </div>\n    </div>\n  </div>\n</div>\n'},f1Ss:function(e,n){e.exports='<div class="flextable table-actions">\n  <div class="flextable-item ">\n    <form ng-submit="$ctrl.search()">\n      <div class="form-row">\n        <div class="col">\n          <input type="text" class="form-control input-block" placeholder="Search" ng-change="$ctrl.search()" ng-model="$ctrl.filter">\n        </div>\n        <div class="col-auto">\n          <div class="form-check">\n            <label class="form-check-label text-info">\n              <input class="form-check-input" type="checkbox" ng-change="$ctrl.setFavOnly()" ng-model="$ctrl.favOnly">\n              <span class="form-check-sign">\n                <span class="check"></span>\n              </span>\n              Favorites Only\n            </label>\n          </div>\n        </div>\n      </div>\n      <div class="form-row">\n        <div class="col">\n          <button class="btn btn-sm" ng-click="$ctrl.reset()">Reset</button>\n        </div>\n      </div>\n    </form>\n  </div>\n</div>\n'},iDBG:function(e,n,t){e.exports='<nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">\n  <div class="container-fluid">\n    <div class="navbar-wrapper">\n      <a ui-sref="main"><img src="'+t("TtU3")+'" style="width: 72px;" class="img-fluid float-left" alt="Responsive image"></a>\n      <h2 class="text-light ml-3 align-top">\n        <span>{{$ctrl.title}}</span>\n      </h2>\n      <h6 class="text-primary ml-3 align-top" ng-if="$ctrl.subtitle">\n        <span>{{$ctrl.subtitle}}</span>\n      </h6>\n    </div>\n  </div>\n</nav>\n'},ijqF:function(e,n){e.exports='<footer class="footer">\n  <div class="container-fluid">\n    <div class="row">\n      <div class="col-md">\n        <nav class="float-md-left">\n          <ul>\n            <li>\n              <a href="https://github.com/owlbeardm/scrollbear">\n                GitHub\n              </a>\n            </li>\n            <li>\n              <a href="mailto:owlbeardm@gmail.com?subject=Scrollbear: ">Email ME</a>\n            </li>\n            <li>\n              <a href="https://c7d5a6.com/">\n                CONTACTS\n              </a>\n            </li>\n          </ul>\n        </nav>\n      </div>\n      <div class="col-md">\n        <div class="copyright float-md-right">\n          2018-2019 by <a href="https://owlbeardm.com/" target="_blank">OwlbearDM</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</footer>\n'},lLAa:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={template:t("iDBG"),controller:["$log",function(e){e.debug("PageHeaderController create");var n=this;n.$onInit=function(){e.debug("PageHeaderController init ",n.title,n.breadcrumbItems),n.titleValues=n.titleValues||{},n.subtitleValues=n.subtitleValues||{}}}],bindings:{title:"@",subtitle:"@?"}};n.default=a},lLoU:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={template:t("vaH9"),controller:["$log","$state","filterService","spellService","CLASSES",function(e,n,t,a,l){e.debug("SpellController create");var r=this;r.$onInit=function(){e.debug("SpellListController init"),r.classesC=l},r.chooseSpell=function(e){r.spell=e;var t=a.spellNameToUrl(r.spell.name);n.go("spells",{spellUrl:t})},r.isFav=function(e){return t.isFav(e)},r.changeFav=function(e){t.changeFav(e)}}],bindings:{spells:"<",className:"<"}};n.default=a},lwo9:function(e,n){e.exports='<div class="wrapper">\n  <div class="main-panel">\n    <pageheader title="ScrollBear" subtitle="Handy Spellbook"></pageheader>\n\n    <div class="content">\n      <div class="row">\n        <div class="col-xl-8 col-centered">\n          <ui-view></ui-view>\n        </div>\n      </div>\n    </div>\n\n    <pagefooter></pagefooter>\n  </div>\n</div>\n\n<spell></spell>\n'},vNZY:function(e,n,t){"use strict";angular.module("app.services").factory("filterService",["$log","$window","CLASSES",function(e,n,t){var a={},l=n.localStorage;return a.favOnly=!!JSON.parse(l.getItem("FAV_ONLY"))&&JSON.parse(l.getItem("FAV_ONLY")),a.setFavOnly=function(e){a.favOnly=e,l.setItem("FAV_ONLY",JSON.stringify(a.favOnly))},a.filter=function(e){var n=!1;return n=!a.filterText||e.name.toUpperCase().includes(a.filterText.toUpperCase()),a.favOnly&&(n=n&&a.isFav(e)),n},a.isFav=function(e){var n=JSON.parse(l.getItem("FAV_SPELLS"));return n&&n.length||(n=[]),n.includes(e.name)},a.changeFav=function(e){var n=JSON.parse(l.getItem("FAV_SPELLS"));n&&n.length||(n=[]),n.includes(e.name)?n.splice(n.indexOf(e.name),1):n.push(e.name),l.setItem("FAV_SPELLS",JSON.stringify(n))},a}])},vaH9:function(e,n){e.exports='<div class="accordion" id="accordionExample">\n  <div ng-repeat="(key, value) in $ctrl.spells" class="card card-collapse">\n    <div class="card-header" role="tab" id="heading{{key}}" data-toggle="collapse" href="#collapse{{key}}" aria-expanded="false" aria-controls="collapse{{key}}">\n      <h5 class="mb-0 text-primary">\n        <a >\n          {{$ctrl.classesC[$ctrl.className].name}} {{key}}\n          <i class="float-right fas fa-chevron-down expanded-flip"></i>\n          <div><small class=\'text-muted\'>count {{value.length}}</small></div>\n        </a>\n      </h5>\n    </div>\n\n    <div id="collapse{{key}}" class="collapse" role="tabpanel" aria-labelledby="heading{{key}}" data-parent="#accordionExample">\n      <div class="card-body">\n        <table class="table table-sm">\n          <tbody>\n            <tr ng-repeat="spell in value track by $index">\n              <td ng-click="$ctrl.chooseSpell(spell)">\n                <a href="#" class="text-dark">\n                  {{spell.name}}\n                </a>\n                \x3c!-- <div><small class="text-info">{{spell.duration}}</small>; <small class="text-info">{{spell.savingThrow}}</small></div> --\x3e\n              </td>\n              <td class="float-right">\n                <button type="button" rel="tooltip" title="" class="btn btn-primary btn-link btn-sm" ng-click="$ctrl.changeFav(spell)">\n                  <i class="fa-lg fa-star" ng-class="{\'fas text-primary\': $ctrl.isFav(spell), \'far text-muted\': !$ctrl.isFav(spell)}"></i>\n                  <div class="ripple-container"></div>\n                </button>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>\n'},xODW:function(e,n,t){"use strict";angular.module("app.filters").filter("array",["$log",function(e){return function(n){return n&&n.length?(e.debug("app.filters",n),n.reduce(function(e,n,t){return e+(0==t?"":", ")+n},"")):n}}])}});
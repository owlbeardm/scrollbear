'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollBearApp = function (_React$Component) {
  _inherits(ScrollBearApp, _React$Component);

  function ScrollBearApp(props) {
    _classCallCheck(this, ScrollBearApp);

    return _possibleConstructorReturn(this, (ScrollBearApp.__proto__ || Object.getPrototypeOf(ScrollBearApp)).call(this, props));
  }

  _createClass(ScrollBearApp, [{
    key: 'render',
    value: function render() {
      var title = 'ScrollBear';
      var subtitle = 'Best spellbook ever';
      return React.createElement(
        'div',
        null,
        React.createElement(Header, { title: title, subtitle: subtitle }),
        React.createElement(Spell, null)
      );
    }
  }]);

  return ScrollBearApp;
}(React.Component);

var Header = function (_React$Component2) {
  _inherits(Header, _React$Component2);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          this.props.title
        ),
        React.createElement(
          'h2',
          null,
          this.props.subtitle
        )
      );
    }
  }]);

  return Header;
}(React.Component);

var spellbook = [{
  "title": "Burning Hands",
  "spell": '<div>\n < p > <h3>Burning Hands</h3>\n  </p>\n  <p >\n    <b>School</b>evocation[fire];\n    <b>Level</b>sorcerer / wizard 1</p> < p > <b>Casting Time</b>1 standard action</p> < p > <b>Components</b>V,\n    S</p> < p > <b>Range</b>15 ft.</p>\n  <p >\n    <b>Area</b>cone - shaped burst</p> < p > <b>Duration</b>instantaneous</p> < p > <b>Saving Throw</b>Reflex half;\n    <b>Spell Resistance</b>yes</p> < p > A cone of searing flame shoots from your fingertips.Any creature in the area of the flames takes 1 d4 points of fire damage per caster level(maximum 5 d4).Flammable materials burn if the flames touch them.A character can extinguish burning items as a full - round action.</p>\n</div>'
}, {
  "title": "Magic Missile",
  "spell": '<div>\n      <p>\n        <b>Magic Missile</b>\n      </p>\n      <p>\n        <b>School</b>\n        evocation [force];\n        <b>Level</b>\n        sorcerer/wizard 1</p>\n      <p>\n        <b>Casting Time</b>\n        1 standard action</p>\n      <p>\n        <b>Components</b>\n        V, S</p>\n      <p>\n        <b>Range\n        </b>medium (100 ft. + 10 ft./level)</p>\n      <p>\n        <b>Targets</b>\n        up to five creatures, no two of which can be more than 15 ft. apart</p>\n      <p>\n        <b>Duration</b>\n        instantaneous</p>\n      <p>\n        <b>Saving Throw</b>\n        none;\n        <b>\n          Spell Resistance\n        </b>\n        yes</p>\n      <p>A missile of magical energy darts forth from your fingertip and strikes its target, dealing 1d4+1 points of force damage.</p>\n      <p>The missile strikes unerringly, even if the target is in melee combat, so long as it has less than total cover or total concealment. Specific parts of a creature can\'t be singled out. Objects are not damaged by the spell.</p>\n      <p>For every two caster levels beyond 1st, you gain an additional missile\u2014two at 3rd level, three at 5th, four at 7th, and the maximum of five missiles at 9th level or higher. If you shoot multiple missiles, you can have them strike a single creature or several creatures. A single missile can strike only one creature. You must designate targets before you check for\n        spell resistance or roll damage.</p>\n\n    </div>'
}];

var Spells = function (_React$Component3) {
  _inherits(Spells, _React$Component3);

  function Spells(props) {
    _classCallCheck(this, Spells);

    return _possibleConstructorReturn(this, (Spells.__proto__ || Object.getPrototypeOf(Spells)).call(this, props));
  }

  _createClass(Spells, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { onClick: this.props.handleDeleteOptions },
          'Remove All'
        ),
        this.props.spells.map(function (spell) {
          return React.createElement(Spell, { key: spell.title, spellText: spell.spell });
        })
      );
    }
  }]);

  return Spells;
}(React.Component);

var Spell = function (_React$Component4) {
  _inherits(Spell, _React$Component4);

  function Spell() {
    _classCallCheck(this, Spell);

    return _possibleConstructorReturn(this, (Spell.__proto__ || Object.getPrototypeOf(Spell)).apply(this, arguments));
  }

  _createClass(Spell, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            null,
            React.createElement(
              'b',
              null,
              'Magic Missile'
            )
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'b',
              null,
              'School'
            ),
            'evocation [force];',
            React.createElement(
              'b',
              null,
              'Level'
            ),
            'sorcerer/wizard 1'
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'b',
              null,
              'Casting Time'
            ),
            '1 standard action'
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'b',
              null,
              'Components'
            ),
            'V, S'
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'b',
              null,
              'Range'
            ),
            'medium (100 ft. + 10 ft./level)'
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'b',
              null,
              'Targets'
            ),
            'up to five creatures, no two of which can be more than 15 ft. apart'
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'b',
              null,
              'Duration'
            ),
            'instantaneous'
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'b',
              null,
              'Saving Throw'
            ),
            'none;',
            React.createElement(
              'b',
              null,
              'Spell Resistance'
            ),
            'yes'
          ),
          React.createElement(
            'p',
            null,
            'A missile of magical energy darts forth from your fingertip and strikes its target, dealing 1d4+1 points of force damage.'
          ),
          React.createElement(
            'p',
            null,
            'The missile strikes unerringly, even if the target is in melee combat, so long as it has less than total cover or total concealment. Specific parts of a creature can\'t be singled out. Objects are not damaged by the spell.'
          ),
          React.createElement(
            'p',
            null,
            'For every two caster levels beyond 1st, you gain an additional missile\u2014two at 3rd level, three at 5th, four at 7th, and the maximum of five missiles at 9th level or higher. If you shoot multiple missiles, you can have them strike a single creature or several creatures. A single missile can strike only one creature. You must designate targets before you check for spell resistance or roll damage.'
          )
        )
      );
    }
  }]);

  return Spell;
}(React.Component);

ReactDOM.render(React.createElement(ScrollBearApp, null), document.getElementById('app'));

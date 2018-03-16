"use strict";

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
    key: "render",
    value: function render() {
      var title = 'ScrollBear';
      return React.createElement(
        "div",
        null,
        React.createElement(Header, { title: title }),
        React.createElement(Spells, { spells: spellbook })
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
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "nav",
          { className: "navbar navbar-expand-lg navbar-dark bg-dark" },
          React.createElement(
            "a",
            { className: "navbar-brand", href: "#" },
            this.props.title
          )
        )
      );
    }
  }]);

  return Header;
}(React.Component);

var Footer = function (_React$Component3) {
  _inherits(Footer, _React$Component3);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "footer",
          { "class": "footer" },
          React.createElement(
            "div",
            { "class": "container" },
            React.createElement(
              "span",
              { "class": "text-muted" },
              "Place sticky footer content here."
            )
          )
        )
      );
    }
  }]);

  return Footer;
}(React.Component);

var spellbook = [{
  "title": "Burning Hands",
  "spell": {
    "title": "Burning Hands",
    "school": "evocation [fire]",
    "level": "sorcerer/wizard 1",
    "castingTime": "1 standard action",
    "components": "V, S",
    "range": "15 ft.",
    "area": "cone-shaped burst",
    "duration": "instantaneous",
    "savingThrow": "Reflex half",
    "spellResistance": "yes",
    "text": "A cone of searing flame shoots from your fingertips. Any creature in the area of the flames takes 1d4 points of fire damage per caster level (maximum 5d4). Flammable materials burn if the flames touch them. A character can extinguish burning items as a full-round action."
  }
}, {
  "title": "Magic Missile",
  "spell": {
    "title": "Magic Missile",
    "school": "evocation [force]",
    "level": "sorcerer/wizard 1",
    "castingTime": "1 standard action",
    "components": "V, S",
    "range": "medium (100 ft. + 10 ft./level)",
    "targets": "up to five creatures, no two of which can be more than 15 ft. apart",
    "duration": "instantaneous",
    "savingThrow": "none",
    "spellResistance": "yes",
    "text": "A missile of magical energy darts forth from your fingertip and strikes its target, dealing 1d4+1 points of force damage.\n                  The missile strikes unerringly, even if the target is in melee combat, so long as it has less than total cover or total concealment. Specific parts of a creature can't be singled out. Objects are not damaged by the spell.\n                  For every two caster levels beyond 1st, you gain an additional missile \u2014 two at 3rd level, three at 5th, four at 7th, and the maximum of five missiles at 9th level or higher. If you shoot multiple missiles, you can have them strike a single creature or several creatures. A single missile can strike only one creature. You must designate targets before you check for spell resistance or roll damage."

  }
}];

var Spells = function (_React$Component4) {
  _inherits(Spells, _React$Component4);

  function Spells(props) {
    _classCallCheck(this, Spells);

    return _possibleConstructorReturn(this, (Spells.__proto__ || Object.getPrototypeOf(Spells)).call(this, props));
  }

  _createClass(Spells, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.props.spells.map(function (spell) {
          return React.createElement(
            "div",
            null,
            React.createElement(
              "a",
              null,
              React.createElement(
                "h3",
                null,
                spell.title
              )
            ),
            React.createElement(Spell, { key: spell.title, spellText: spell.spell })
          );
        })
      );
    }
  }]);

  return Spells;
}(React.Component);

var Spell = function (_React$Component5) {
  _inherits(Spell, _React$Component5);

  function Spell() {
    _classCallCheck(this, Spell);

    return _possibleConstructorReturn(this, (Spell.__proto__ || Object.getPrototypeOf(Spell)).apply(this, arguments));
  }

  _createClass(Spell, [{
    key: "render",
    value: function render() {
      console.log(this.props.spellText.text.match(/[^\r\n]+/g));
      return React.createElement(
        "div",
        null,
        React.createElement(
          "b",
          null,
          "School"
        ),
        " ",
        this.props.spellText.school,
        "; ",
        React.createElement(
          "b",
          null,
          "Level"
        ),
        " ",
        this.props.spellText.level,
        React.createElement("br", null),
        React.createElement(
          "b",
          null,
          "Casting Time"
        ),
        " ",
        this.props.spellText.castingTime,
        React.createElement("br", null),
        React.createElement(
          "b",
          null,
          "Components"
        ),
        " ",
        this.props.spellText.components,
        React.createElement("br", null),
        React.createElement(
          "b",
          null,
          "Range"
        ),
        " ",
        this.props.spellText.range,
        React.createElement("br", null),
        React.createElement(
          "b",
          null,
          "Area"
        ),
        " ",
        this.props.spellText.area,
        React.createElement("br", null),
        React.createElement(
          "b",
          null,
          "Targets"
        ),
        " ",
        this.props.spellText.targets,
        React.createElement("br", null),
        React.createElement(
          "b",
          null,
          "Duration"
        ),
        " ",
        this.props.spellText.duration,
        React.createElement("br", null),
        React.createElement(
          "b",
          null,
          "Saving Throw"
        ),
        " ",
        this.props.spellText.savingThrow,
        "; ",
        React.createElement(
          "b",
          null,
          "SpellResistance"
        ),
        " ",
        this.props.spellText.spellResistance,
        React.createElement("br", null),
        this.props.spellText.text.match(/[^\r\n]+/g).map(function (line) {
          return React.createElement(
            "p",
            null,
            line.trim()
          );
        })
      );
    }
  }]);

  return Spell;
}(React.Component);

ReactDOM.render(React.createElement(ScrollBearApp, null), document.getElementById('app'));

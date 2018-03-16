class ScrollBearApp extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const title = 'ScrollBear';
    const subtitle = 'Best spellbook ever';
    return (<div>
      <Header title={title} subtitle={subtitle}/>
      <Spells spells={spellbook}/>
    </div>);
  }
}

class Header extends React.Component {
  render() {
    return (<div>
      <h1>{this.props.title}</h1>
      <h2>{this.props.subtitle}</h2>
    </div>);
  }
}

const spellbook = [
  {
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
      "text": `A cone of searing flame shoots from your fingertips. Any creature in the area of the flames takes 1d4 points of fire damage per caster level (maximum 5d4). Flammable materials burn if the flames touch them.A character can extinguish burning items as a full-round action.`
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
      "text": `A missile of magical energy darts forth from your fingertip and strikes its target, dealing 1d4+1 points of force damage.
                  The missile strikes unerringly, even if the target is in melee combat, so long as it has less than total cover or total concealment. Specific parts of a creature can't be singled out. Objects are not damaged by the spell.
                  For every two caster levels beyond 1st, you gain an additional missile — two at 3rd level, three at 5th, four at 7th, and the maximum of five missiles at 9th level or higher. If you shoot multiple missiles, you can have them strike a single creature or several creatures. A single missile can strike only one creature. You must designate targets before you check for spell resistance or roll damage.`

    }
  }
];

class Spells extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>

      {this.props.spells.map((spell) => (
        <div>
          <a><h3>{spell.title}</h3></a>
          <Spell key={spell.title} spellText={spell.spell}/>
        </div>
      ))}
    </div>);
  }
}

class Spell extends React.Component {

  render() {
    console.log(this.props.spellText.text.match(/[^\r\n]+/g));
    return (<div>
        <b>School</b> {this.props.spellText.school}; <b>Level</b> {this.props.spellText.level}<br/>
        <b>Casting Time</b> {this.props.spellText.castingTime}<br/>
        <b>Components</b> {this.props.spellText.components}<br/>
        <b>Range</b> {this.props.spellText.range}<br/>
        <b>Area</b> {this.props.spellText.area}<br/>
        <b>Targets</b> {this.props.spellText.targets}<br/>
        <b>Duration</b> {this.props.spellText.duration}<br/>
        <b>Saving Throw</b> {this.props.spellText.savingThrow}; <b>SpellResistance</b> {this.props.spellText.spellResistance}<br/>
        {this.props.spellText.text.match(/[^\r\n]+/g).map((line) => <p>{line.trim()}</p>)}
    </div>);
  }
}

ReactDOM.render(<ScrollBearApp/>, document.getElementById('app'));

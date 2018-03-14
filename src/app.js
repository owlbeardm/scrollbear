class ScrollBearApp extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const title = 'ScrollBear';
    const subtitle = 'Best spellbook ever';
    return (<div>
      <Header title={title} subtitle={subtitle}/>
      <Spells/>
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
    "spell": `<div>
 < p > <h3>Burning Hands</h3>
  </p>
  <p >
    <b>School</b>evocation[fire];
    <b>Level</b>sorcerer / wizard 1</p> < p > <b>Casting Time</b>1 standard action</p> < p > <b>Components</b>V,
    S</p> < p > <b>Range</b>15 ft.</p>
  <p >
    <b>Area</b>cone - shaped burst</p> < p > <b>Duration</b>instantaneous</p> < p > <b>Saving Throw</b>Reflex half;
    <b>Spell Resistance</b>yes</p> < p > A cone of searing flame shoots from your fingertips.Any creature in the area of the flames takes 1 d4 points of fire damage per caster level(maximum 5 d4).Flammable materials burn if the flames touch them.A character can extinguish burning items as a full - round action.</p>
</div>`
  }, {
    "title": "Magic Missile",
    "spell": `<div>
      <p>
        <b>Magic Missile</b>
      </p>
      <p>
        <b>School</b>
        evocation [force];
        <b>Level</b>
        sorcerer/wizard 1</p>
      <p>
        <b>Casting Time</b>
        1 standard action</p>
      <p>
        <b>Components</b>
        V, S</p>
      <p>
        <b>Range
        </b>medium (100 ft. + 10 ft./level)</p>
      <p>
        <b>Targets</b>
        up to five creatures, no two of which can be more than 15 ft. apart</p>
      <p>
        <b>Duration</b>
        instantaneous</p>
      <p>
        <b>Saving Throw</b>
        none;
        <b>
          Spell Resistance
        </b>
        yes</p>
      <p>A missile of magical energy darts forth from your fingertip and strikes its target, dealing 1d4+1 points of force damage.</p>
      <p>The missile strikes unerringly, even if the target is in melee combat, so long as it has less than total cover or total concealment. Specific parts of a creature can't be singled out. Objects are not damaged by the spell.</p>
      <p>For every two caster levels beyond 1st, you gain an additional missile—two at 3rd level, three at 5th, four at 7th, and the maximum of five missiles at 9th level or higher. If you shoot multiple missiles, you can have them strike a single creature or several creatures. A single missile can strike only one creature. You must designate targets before you check for
        spell resistance or roll damage.</p>

    </div>`
  }
];

class Spells extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (<div>
      <button onClick={this.props.handleDeleteOptions}>Remove All</button>
      {this.props.spells.map((spell) => <Spell key={spell.title} spellText={spell.spell}/>)}
    </div>);
  }
}

class Spell extends React.Component {

  render() {
    return (<div>
      <div>

        <p>
          <b>Magic Missile</b>
        </p>
        <p>
          <b>School</b>
          evocation [force];
          <b>Level</b>
          sorcerer/wizard 1</p>
        <p>
          <b>Casting Time</b>
          1 standard action</p>
        <p>
          <b>Components</b>
          V, S</p>
        <p>
          <b>Range
          </b>medium (100 ft. + 10 ft./level)</p>
        <p>
          <b>Targets</b>
          up to five creatures, no two of which can be more than 15 ft. apart</p>
        <p>
          <b>Duration</b>
          instantaneous</p>
        <p>
          <b>Saving Throw</b>
          none;
          <b>
            Spell Resistance
          </b>
          yes</p>
        <p>A missile of magical energy darts forth from your fingertip and strikes its target, dealing 1d4+1 points of force damage.</p>
        <p>The missile strikes unerringly, even if the target is in melee combat, so long as it has less than total cover or total concealment. Specific parts of a creature can't be singled out. Objects are not damaged by the spell.</p>
        <p>For every two caster levels beyond 1st, you gain an additional missile—two at 3rd level, three at 5th, four at 7th, and the maximum of five missiles at 9th level or higher. If you shoot multiple missiles, you can have them strike a single creature or several creatures. A single missile can strike only one creature. You must designate targets before you check for spell resistance or roll damage.</p>

      </div>
    </div>);
  }
}

ReactDOM.render(<ScrollBearApp/>, document.getElementById('app'));

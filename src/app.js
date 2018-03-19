class ScrollBearApp extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const title = 'ScrollBear';
    return (<div>
      <Header title={title}/>
      <Spells spells={spellbook}/>
    </div>);
  }
}

class Header extends React.Component {
  render() {
    return (<div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">{this.props.title}</a>
      </nav>
    </div>);
  }
}

class Footer extends React.Component {
  render() {
    return (<div>
      <footer class="footer">
        <div class="container">
          <span class="text-muted">Place sticky footer content here.</span>
        </div>
      </footer>
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
      "text": `A cone of searing flame shoots from your fingertips. Any creature in the area of the flames takes 1d4 points of fire damage per caster level (maximum 5d4). Flammable materials burn if the flames touch them. A character can extinguish burning items as a full-round action.`
    }
  }, {
    "title": "Sow Thought",
    "spell": {
      "title": "Sow Thought",
      "school": "enchantment (compulsion) [mind-affecting]",
      "level": "bard 1, psychic 1, sorcerer/wizard 1, witch 1",
      "castingTime": "1 standard action",
      "components": "V, S",
      "range": "close (25 ft. + 5 ft./2 levels)",
      "targets": "one creature",
      "duration": "permanent",
      "savingThrow": "Will negates",
      "spellResistance": "yes",
      "text": `You plant an idea, concept, or suspicion in the mind of the subject. The target genuinely believes that the idea is his own, but is not required to act upon it. If the idea is contrary to the target’s normal thoughts (such as making a paladin think, “I should murder my friends”) the target may suspect mind-altering magic is at play. The idea must be fairly clear, enough so that it can be conveyed in one or two sentences. You do not need to share a common language for the spell to succeed, but without a common language you can only sow the most basic rudimentary ideas.`
    }
  }, {
    "title": "Command Undead",
    "spell": {
      "title": "Command Undead",
      "school": "necromancy",
      "level": "sorcerer/wizard 2",
      "castingTime": "1 standard action",
      "components": "V, S, M (a shred of raw meat and a splinter of bone)",
      "range": "close (25 ft. + 5 ft./2 levels)",
      "targets": "one undead creature",
      "duration": "1 day/level",
      "savingThrow": "Will negates; see text",
      "spellResistance": "yes",
      "text": `This spell allows you a degree of control over an undead creature. If the subject is intelligent, it perceives your words and actions favorably (treat its attitude as friendly). It will not attack you while the spell lasts. You can give the subject orders, but you must win an opposed Charisma check to convince it to do anything it wouldn’t ordinarily do. Retries are not allowed. An intelligent commanded undead never obeys suicidal or obviously harmful orders, but it might be convinced that something very dangerous is worth doing.
      A nonintelligent undead creature gets no saving throw against this spell. When you control a mindless being, you can communicate only basic commands, such as “come here,” “go there,” “fight,” “stand still,” and so on. Nonintelligent undead won’t resist suicidal or obviously harmful orders.
      Any act by you or your apparent allies that threatens the commanded undead (regardless of its Intelligence) breaks the spell.
      Your commands are not telepathic. The undead creature must be able to hear you.`
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
    return (<div className="spells">

      {
        this.props.spells.map((spell) => (<div>
          <Spell key={spell.title} spellText={spell.spell}/>
        </div>))
      }
    </div>);
  }
}

class Spell extends React.Component {

  constructor(props) {
    super(props);
    this.handleToggleVisible = this.handleToggleVisible.bind(this);
    this.state = {
      visible: false
    }
  }

  handleToggleVisible(e) {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        visible: !prevState.visible
      };
    });

  }

  render() {
    return (<div>
      <a href="#" onClick={this.handleToggleVisible}>
       <h3>{this.props.spellText.title}</h3>
      </a>
      {this.state.visible && (<SpellDescription spellText={this.props.spellText}/>)}
    </div>);
  }
}

class SpellDescription extends React.Component {

  render() {
    return (<div>
      <b>School </b>
      {this.props.spellText.school};
      <b> Level </b>
      {this.props.spellText.level}<br/>
      <b>Casting Time </b>
      {this.props.spellText.castingTime}<br/>
      <b>Components </b>
      {this.props.spellText.components}<br/>
      <b>Range </b>
      {this.props.spellText.range}<br/>
      <b>Area </b>
      {this.props.spellText.area}<br/>
      <b>Targets </b>
      {this.props.spellText.targets}<br/>
      <b>Duration </b>
      {this.props.spellText.duration}<br/>
      <b>Saving Throw </b>
      {this.props.spellText.savingThrow};
      <b> SpellResistance </b>
      {this.props.spellText.spellResistance}<br/> {this.props.spellText.text.match(/[^\r\n]+/g).map((line) => <p>{line.trim()}</p>)}
    </div>);
  }
}

ReactDOM.render(<ScrollBearApp/>, document.getElementById('app'));

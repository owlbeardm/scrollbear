import React from 'react';
import myData from './spells.json';
import Header from './Header.js';
import Spells from './Spells.js';
import Selection from './Selection.js';
import CssBaseline from 'material-ui/CssBaseline';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

function TabContainer({children, dir}) {
  return (<Typography>
    {children}
  </Typography>);
}
export default class ScrollBearApp extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.state = {
      value: 0
    };
  }

  handleChange(event, value) {
    this.setState({value});
  };

  handleChangeIndex(index) {
    this.setState({value: index});
  };

  render() {
    const title = 'ScrollBear';
    return (<div>
      <CssBaseline/>
      <AppBar>
        <Tabs>
          <Tab label="Item One"/>
          <Tab label="Item Two"/>
          <Tab label="Item Three"/>
        </Tabs>
      </AppBar>
      <SwipeableViews>
        <TabContainer dir={theme.direction}>Item One</TabContainer>
        <TabContainer dir={theme.direction}>Item Two</TabContainer>
        <TabContainer dir={theme.direction}>Item Three</TabContainer>
      </SwipeableViews>
    </div>);
  }
}

const spellbook1 = [
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

const spellbook2 = [
  {
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
    "title": "Boneshaker",
    "spell": {
      "title": "Boneshaker",
      "school": "necromancy",
      "level": "sorcerer/wizard 2",
      "castingTime": "1 standard action",
      "components": "V, S, F (human-shaped fetish made of bones)",
      "range": "medium (100 ft. + 10 ft./level)",
      "targets": "one living creature or undead creature with a skeleton",
      "duration": "instantaneous",
      "savingThrow": "Fortitude partial or negates (see text)",
      "spellResistance": "yes",
      "text": `By using a bone fetish like a marionette, you take control of a target creature’s skeleton. This has a variety of effects depending on whether the target is living or undead.
A living creature has its skeleton rattle within its flesh, causing it grievous harm. The target takes 3d6 points of damage, plus 1d6 additional points of damage per 2 caster levels you have.
In addition, you can move the target 5 feet. This movement doesn’t provoke attacks of opportunity. A successful saving throw halves the damage and negates the movement.
An undead creature takes no damage. Instead, you manipulate the undead, forcing it to take an immediate action to either move up to its speed (provoking attacks of opportunity as normal) or make a single attack against a creature of your choice in its reach. Either of these is the most basic version of the action the creature can take (it doesn’t activate any special abilities that it could apply to the movement or attack, such as grab). A successful saving throw negates this effect. A mindless undead creature doesn’t receive a save against this effect.`
    }
  }
];

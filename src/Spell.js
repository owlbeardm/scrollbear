import React from 'react';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'; 

export default class Spell extends React.Component {

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
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
           <h3>{this.props.spellText.title}</h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <SpellDescription spellText={this.props.spellText}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
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

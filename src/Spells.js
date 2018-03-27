import React from 'react';
import Spell from './Spell.js';
import Card, {CardContent} from 'material-ui/Card';

export default class Spells extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="spells">
      <div>
        <Card className="spellsheader">
          <CardContent >
            <h5>{this.props.level}</h5>
          </CardContent>
        </Card>
      </div>
      <div>
        {
          this.props.spells.map((spell) => (<div>
            <Spell key={spell.name} spellText={spell}/>
          </div>))
        }
      </div>
    </div>);
  }
}

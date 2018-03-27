import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Radio, {RadioGroup} from 'material-ui/Radio';
import {FormLabel, FormControl, FormControlLabel, FormHelperText} from 'material-ui/Form';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class Selection extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 'female'
    }
  }

  handleChange(event, value) {
    this.setState(() => {
      return {value: value};
    });
  };

  render() {
    const {classes} = this.props;

    return (<div className="selection">
      <div className={classes.root}>
        <Grid container="container" spacing={24}>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Alchemist" control={<Radio color = "gray" />} label="Alchemist"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Antipaladin" control={<Radio color = "gray" />} label="Antipaladin"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Bard" control={<Radio color = "gray" />} label="Bard"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Bloodrager" control={<Radio color = "gray" />} label="Bloodrager"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Cleric" control={<Radio color = "gray" />} label="Cleric/Oracle"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Elementalist" control={<Radio color = "gray" />} label="Elementalist Wizard"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Inquisitor" control={<Radio color = "gray" />} label="Inquisitor"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Magus" control={<Radio color = "gray" />} label="Magus"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Medium" control={<Radio color = "gray" />} label="Medium"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Mesmerist" control={<Radio color = "gray" />} label="Mesmerist"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Occultist" control={<Radio color = "gray" />} label="Occultist"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Paladin" control={<Radio color = "gray" />} label="Paladin"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Psychic" control={<Radio color = "gray" />} label="Psychic"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Ranger" control={<Radio color = "gray" />} label="Ranger"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Shaman" control={<Radio color = "gray" />} label="Shaman"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Sorcerer" control={<Radio color = "gray" />} label="Sorcerer/Wizard"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Spiritualist" control={<Radio color = "gray" />} label="Spiritualist"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Summoner" control={<Radio color = "gray" />} label="Summoner"/>
          </Grid>
          <Grid item="item" xs="xs">
            <FormControlLabel value="Witch" control={<Radio color = "gray" />} label="Witch"/>
          </Grid>
        </Grid>
      </div>
    </div>);
  }
}

Selection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Selection);

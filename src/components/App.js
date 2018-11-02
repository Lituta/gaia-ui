
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { getLoading } from '../reducer';

import ConfigPanel from './ConfigPanel';
import ResultPanel from './ResultPanel';
import LoadingMask from './LoadingMask';

const drawerWidth = 480;

const styles = theme => ({
  root: {
    display: 'block',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'absolute',
    left: 0,
    zIndex: '1111',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
  },
  leftArraw: {
    position: 'absolute',
    left: drawerWidth - 24,
    top: '0',
    cursor: 'pointer',
    background: '#ddd'
  },
  rightArraw: {
    zIndex: '1111',
    position: 'absolute',
    left: '0',
    top: '0',
    cursor: 'pointer',
    background: '#ddd'
  }
});

class App extends Component {
  state = {
    open: true
  }

  toggleOpen (value) {
    this.setState({open: value});
  }

  render () {
    const { classes, loading } = this.props;

    return (
      <div className={classes.root}>
        {loading ? <LoadingMask /> : null}
        <div
          className={classes.drawer}
          style={{display: this.state.open ? 'block': 'none'}}
        >
          <span className={classes.leftArraw}
            onClick={() => {this.toggleOpen(false)}}
          ><KeyboardArrowLeft /></span>
          <ConfigPanel />
        </div>
        { this.state.open ? null: <span className={classes.rightArraw}
           onClick={() => {this.toggleOpen(true)}}
           ><KeyboardArrowRight /></span>
        }
        <div className={classes.content}>
          <ResultPanel />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(store) {
  return {
    loading: getLoading(store)
  };
}

export default connect(mapStateToProps)(withStyles(styles)(App));

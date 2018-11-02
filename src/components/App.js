
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { getLoading } from '../reducer';

import ConfigPanel from './ConfigPanel';
import ResultPanel from './ResultPanel';
import LoadingMask from './LoadingMask';

const drawerWidth = 480;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
  },
});

function PermanentDrawerLeft(props) {
  const { classes, loading } = props;

  return (
    <div className={classes.root}>
      {loading ? <LoadingMask /> : null}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <ConfigPanel />
      </Drawer>
      <main className={classes.content}>
        <ResultPanel />
      </main>
    </div>
  );
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(store) {
  return {
    loading: getLoading(store)
  };
}

export default connect(mapStateToProps)(withStyles(styles)(PermanentDrawerLeft));

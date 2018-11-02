import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { getCurResponse, getCurResponseKey, getCurQueryBody } from '../reducer';
// import { ta2graph } from '../resources/sampleResponse';

import Response from './Response';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  invisible: {
    display: 'none'
  },
  visible: {
    padding: 10
  }
});

class ResultPanel extends React.Component {
  state = {
    value: 'one',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, curResponse, curResponseKey, curQueryBody } = this.props;
    const { value } = this.state;
    // console.log('---curResponse', curResponse);
    // --- for test ---
    // if (!curResponse) {
    //   const curResponse = ta2graph;
    // }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth>
            <Tab value="one" label={`Response: ${curResponseKey}`} />
            <Tab value="two" label="Viz Results" />
            <Tab value="three" label="Logs" />
          </Tabs>
        </AppBar>
        <div className={value === 'one' ? classes.visible : classes.invisible}>
          {!curResponse || curResponse.length === 0 ? "no response" : <Response response={curResponse} />}
        </div>
        <div className={value === 'two' ? classes.visible : classes.invisible}>
          {!curResponse || curResponse.length === 0 ? "no response" : <Response response={curResponse} queryBody={curQueryBody} />}
        </div>
        <div className={value === 'three' ? classes.visible : classes.invisible}>
          Not available
        </div>
      </div>
    );
  }
}

ResultPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(store) {
  return {
    curResponse: getCurResponse(store),
    curResponseKey: getCurResponseKey(store),
    curQueryBody: getCurQueryBody(store)
  };
}

export default connect(mapStateToProps)(withStyles(styles)(ResultPanel));

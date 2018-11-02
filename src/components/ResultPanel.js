import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { getCurResponse, getCurResponseKey, getCurQueryBody } from '../reducer';
import { ta2graph } from '../resources/sampleResponse';

import Response from './Response';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
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
        {value === 'one' && <TabContainer>{!curResponse || curResponse.length === 0 ? "no response" : <Response response={curResponse} />}</TabContainer>}
        {value === 'two' && <TabContainer>{!curResponse || curResponse.length === 0 ? "no response" : <Response response={curResponse} queryBody={curQueryBody} />}</TabContainer>}
        {value === 'three' && <TabContainer>Not available</TabContainer>}
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

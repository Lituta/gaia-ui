import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

import { fetchConfigs, fetchQueryFile, findResponse, setCurEp, setCurResponseKey, setCurQueryBody } from '../actions';
import { getConfigs, getCurQueryFile, getQueryFile, getCurEp, getResponse } from '../reducer';
import DialogSelect from './DialogSelect';
import QueryPaging from './QueryPaging';

import { default_query, default_ep } from '../resources/constants';

class ConfigPanel extends Component{
  constructor(props) {
    super(props);
    this.state = {
      queryFile: null
    };
    this.props.dispatch(fetchConfigs());
    this.props.dispatch(setCurEp(default_ep));
    this.props.dispatch(fetchQueryFile(default_query, true));
    this.applyQuery = this.applyQuery.bind(this);
  }

  applyQuery(query_idx, queryBody, applyQuery) {
    const { curQueryFile, curEp, getResponseProps, dispatch } =  this.props;
    if(curEp) {
      const key = [curQueryFile, query_idx, curEp].join('/');
      if(!getResponseProps(key)) {
        if(applyQuery) {
          dispatch(applyQuery(key));
        } else {
          dispatch(findResponse(key));
        }
      } else {
        dispatch(setCurResponseKey(key));
      }
    }
    dispatch(setCurQueryBody(queryBody));
  }

  render() {
    const { configs, curQueryFile, queryFile, curEp, dispatch } =  this.props;
    if(!configs){
      return null ;
    }
    const { queries, endpoints } = configs;
    return (
      <Paper>
        <div style={{display: 'block', height: '60px', borderBottom: '3px solid #ddd'}}>
          <DialogSelect options={endpoints} title={'endpoint-set'} selected={curEp} onOk={value => {
            dispatch(setCurEp(value));
          }}/>
          <DialogSelect options={queries} title={'query-set'} selected={curQueryFile} onOk={value => { dispatch(fetchQueryFile(value, true)); }}/>
        </div>
        <div style={{display: 'block', height: 'calc(100vh - 60px)', overflowY: 'scroll'}}>
        {queryFile ? <QueryPaging
          queryList={queryFile}
          applyQuery={(idx, queryBody) => this.applyQuery(idx, queryBody, true)}
          findQuery={(idx, queryBody) => this.applyQuery(idx, queryBody)}
          /> : null}
        </div>
      </Paper>
    )
  }
}

function mapStateToProps(store) {
  return {
    configs: getConfigs(store),
    curQueryFile: getCurQueryFile(store),
    queryFile: getQueryFile(store),
    curEp: getCurEp(store),
    getResponseProps: key => getResponse(store, key)
  };
}

export default connect(mapStateToProps)(ConfigPanel)

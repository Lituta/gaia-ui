import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchConfigs, fetchQueryFile, applyQuery, findResponse, setCurEp, setCurResponseKey } from '../actions';
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

  applyQuery(query_idx) {
    const { curQueryFile, curEp, getResponseProps, dispatch } =  this.props;
    if (curEp) {
      const key = [curQueryFile, query_idx, curEp].join('/');
      if(!getResponseProps(key)) {
        // dispatch(applyQuery(key));
        dispatch(findResponse(key));
      } else {
        dispatch(setCurResponseKey(key));
      }
    }
  }

  render() {
    const { configs, curQueryFile, queryFile, curEp, dispatch } =  this.props;
    if(!configs){
      return null ;
    }
    const { queries, endpoints } = configs;
    return (
      <div>
        <DialogSelect options={endpoints} title={'endpoint-set'} selected={curEp} onOk={value => {
          dispatch(setCurEp(value));
        }}/>
        <DialogSelect options={queries} title={'query-set'} selected={curQueryFile} onOk={value => { dispatch(fetchQueryFile(value, true)); }}/>
        {queryFile ? <QueryPaging queryList={queryFile} applyQuery={this.applyQuery}/> : null}
      </div>
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

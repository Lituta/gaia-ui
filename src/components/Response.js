import React, { Component } from 'react';

import SingleResponseTable from './SingleResponseTable';
import SingleResponseViz from './SingleResponseViz';


class Response extends Component {

  renderResponses(responseList, queryBody) {
    return responseList.map((res, idx) => {
         const edgeList = Array.isArray(res.edge) ?  res.edge : [res.edge];
         return (
           <div key={idx}>
             <p>Response No. {idx}</p>
             { queryBody ? <SingleResponseViz edgeList={edgeList} queryBody={queryBody} /> : <SingleResponseTable edgeList={edgeList} /> }
           </div>
         );
       }
   );
  }

  render() {
    const { response, queryBody } = this.props;
    // export const ta2graph = {
    //   "dummy":
    //   {
    //     "graphquery_responses":
    //     {
    //       "@id": "AIDA_EG_2018_P103_Q002_H001_1hop_9_0",
    //       "response": [
    //         { "edge": {
    //           "@id": "1",
    //           "justifications": { "justification": {
    //             "@docid": "HC0002Q3H",
    //             "subject_justification": { "system_nodeid": "http://www.isi.edu/gaia/events/b75bd07a-009b-4ec8-9b2e-b3bfba952dcb-prototype", "enttype": "Transaction.TransferOwnership", "text_span": { "doceid": "HC0003P5F", "start": "7", "end": "13" }, "confidence": "0.792754" },
    //             "object_justification": { "system_nodeid": "http://www.isi.edu/gaia/entities/d5cbf475-468f-4713-8cee-f7231318b52a-prototype", "enttype": "GeopoliticalEntity", "text_span": { "doceid": "HC0003P5F", "start": "3423", "end": "3427" }, "confidence": "1.0" },
    //             "edge_justification": { "text_span": { "doceid": "HC0003P5F", "start": "1", "end": "5" }, "confidence": "0.508902" }
    //           } } }
    //         }}}}
    if (!response) {
      return null;
    }
    return (
      <div>
        {Object.keys(response).map(key => {
          const query_id = response[key].graphquery_responses['@id'];
          const responseList = Array.isArray(response[key].graphquery_responses.response) ?  response[key].graphquery_responses.response : [response[key].graphquery_responses.response];
          return <div key={key}><h4>Doc ID: {key}</h4>{this.renderResponses(responseList, queryBody)}</div>;
        })}
      </div>
    )
  }
}

export default Response;

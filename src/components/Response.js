import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { getClusterVizUrl } from '../resources/constants';

class Response extends Component {
  render() {
    const { response } = this.props;
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
        <Table>
          <TableBody>
            {Object.keys(response).map(key => {
              const query_id = response[key].graphquery_responses['@id'];
              const response_list = Array.isArray(response[key].graphquery_responses.response) ?  response[key].graphquery_responses.response : [response[key].graphquery_responses.response];
              return response_list.map((res, idx) => {
                 const edge_list = Array.isArray(res.edge) ?  res.edge : [res.edge];
                 return edge_list.map(edge => {
                   const uniqueKey = [key, idx, edge['@id']].join('/');
                   const justi = edge.justifications.justification;
                   const sub = justi.subject_justification.system_nodeid, obj = justi.object_justification.system_nodeid;
                   return (
                       <TableRow key={uniqueKey}>
                         <TableCell>{uniqueKey}</TableCell>
                         <TableCell>{justi['@docid']}</TableCell>
                         <TableCell>{sub}<a href={getClusterVizUrl(sub)} target="_blank">viz</a></TableCell>
                         <TableCell>{justi.edge_justification.confidence}</TableCell>
                         <TableCell>{obj}<a href={getClusterVizUrl(obj)} target="_blank">viz</a></TableCell>
                       </TableRow>
                   );
                 });
              });
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default Response;

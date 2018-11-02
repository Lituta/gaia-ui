import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { getClusterVizUrl } from '../resources/constants';

export default function SingleResponseTable({ edgeList }) {
  return  (
    <Table>
      <TableBody>
        <TableRow key="headers">
          <TableCell>EdgeID</TableCell>
          <TableCell>JustificationDocID</TableCell>
          <TableCell>Subject</TableCell>
          <TableCell>Edge</TableCell>
          <TableCell>Object</TableCell>
        </TableRow>
        {edgeList.map(edge => {
            const edgeID = edge['@id'];
            const justi = edge.justifications.justification;
            const sub = justi.subject_justification.system_nodeid, obj = justi.object_justification.system_nodeid;
            return (
                <TableRow key={edgeID}>
                  <TableCell>{edgeID}</TableCell>
                  <TableCell>{justi['@docid']}</TableCell>
                  <TableCell>{sub}<a href={getClusterVizUrl(sub)} target="_blank">viz</a></TableCell>
                  <TableCell>{justi.edge_justification.confidence}</TableCell>
                  <TableCell>{obj}<a href={getClusterVizUrl(obj)} target="_blank">viz</a></TableCell>
                </TableRow>
            );
          })
       }
     </TableBody>
   </Table>
 );
}

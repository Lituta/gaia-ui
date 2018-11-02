import React from 'react';
import SVG from './SVG';

export default function SingleResponseViz({ edgeList, queryBody, idx }){
  return <SVG graphQuery={queryBody} containerId={`${queryBody['@id']}_${idx}`} boldEdgeId={edgeList.map(edge => edge['@id'])} />;
}

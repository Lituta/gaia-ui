import React from 'react';
import SVG from './SVG';

export default function SingleResponseViz({ edgeList, queryBody }){
  return <SVG graphQuery={queryBody} containerId={queryBody['@id']} boldEdgeId={edgeList.map(edge => edge['@id'])} />;
}

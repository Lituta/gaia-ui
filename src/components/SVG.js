import React, { Component } from 'react';
import { run_d3 } from '../visualizer/graph';

export default class SVG extends Component {
  componentDidMount() {
    const { graphQuery, containerId, boldEdgeId } = this.props;
    run_d3(graphQuery, `#${containerId || "queryViz"}`, window.d3, boldEdgeId)
  }

  render() {
    const { containerId } = this.props;
    return <div id={containerId || "queryViz"} style={containerId ? {zIndex: '-10', position: 'absolute'} : {}}/>;
  }
}

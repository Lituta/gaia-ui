import React, { Component } from 'react';
import { run_d3 } from '../visualizer/graph';

export default class SVG extends Component {
  componentDidMount() {
    const { graphQuery, containerId, boldEdgeId } = this.props;
    run_d3(graphQuery, `#${containerId || 'queryViz'}`, window.d3, boldEdgeId)
  }

  render() {
    const { containerId } = this.props;
    const style = {
      maxWidth: '100%',
      maxHeight: '70vh',
      overflow: 'scroll',
      border: '1px solid #eee',
      margin: '0 15px'
    };
    return (
      <div id={containerId || 'queryViz'} style={style}>
        <span>
          Scroll to zoom
          <br />Drag to pan
        </span>
      </div>);
  }
}

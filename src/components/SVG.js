import React, { Component } from 'react';
import { run_d3 } from '../visualizer/graph';

export default class SVG extends Component {
  componentDidMount() {
    run_d3(this.props.graphQuery, '#graph-viz', window.d3)
  }

  render() {
    return <div id="graph-viz" />
  }
}

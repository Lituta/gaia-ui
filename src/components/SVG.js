import React, { Component } from 'react';
import { run_d3 } from '../visualizer/graph';

export default class SVG extends Component {
  state = {
    containerId: this.props.containerId
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.containerId !== this.props.containerId) {
      const { graphQuery, containerId, boldEdgeId } = nextProps;
      window.d3.select(`#${this.props.containerId}`).select('svg').remove();
      this.setState({ containerId }, () => {
        run_d3(graphQuery, `#${containerId || 'queryViz'}`, window.d3, boldEdgeId);
      });

    }
  }

  componentDidMount() {
    const { graphQuery, containerId, boldEdgeId } = this.props;
    run_d3(graphQuery, `#${containerId || 'queryViz'}`, window.d3, boldEdgeId)
  }

  render() {
    const style = {
      maxWidth: '100%',
      maxHeight: '70vh',
      overflow: 'scroll',
      border: '1px solid #eee',
      margin: '0 15px'
    };
    return (
      <div id={this.state.containerId || 'queryViz'} style={style}>
        <span>
          Scroll on background to zoom
          <br />Drag on background to pan 
          <br />Drag on nodes to relocate
        </span>
      </div>);
  }
}

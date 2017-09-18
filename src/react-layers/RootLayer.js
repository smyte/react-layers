import Layer from './Layer';
import React from 'react';

export default class RootLayer extends React.Component {
  render() {
    return <Layer style={this.props.style}>{this.props.children}</Layer>;
  }
}

import Empty from './Empty';
import React from 'react';

const WithNoopRender = {
  render() {
    return <Empty style={this.props.style}>{this.props.children}</Empty>;
  },
};

export default WithNoopRender;

import Empty from './Empty';
import React from 'react';

const STYLE = { position: 'fixed', left: 0, right: 0, top: 0, bottom: 0 };

export default class CaptureMouseBehavior extends React.Component {
  render() {
    return <Empty style={STYLE}>{this.props.children}</Empty>;
  }
}

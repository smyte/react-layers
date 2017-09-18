import React from 'react';

export default class Empty extends React.Component {
  render() {
    const style = Object.assign({ display: 'inline-block' }, this.props.style);
    return <div {...this.props} style={style} />;
  }
}

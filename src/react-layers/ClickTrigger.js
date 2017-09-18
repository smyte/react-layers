import Empty from './Empty';
import React from 'react';

export default class ClickTrigger extends React.Component {
  render() {
    const { children, ...props } = this.props;
    return (
      <Empty tabIndex={0} role="button" {...props}>
        {children}
      </Empty>
    );
  }
}

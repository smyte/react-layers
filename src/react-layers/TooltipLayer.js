import Layer from './Layer';
import PropTypes from 'prop-types';
import React from 'react';
import TetherBehavior from './TetherBehavior';

export default class TooltipLayer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children, ...props } = this.props;
    return (
      <Layer>
        <TetherBehavior
          constraints={[{ pin: ['left', 'right'], to: 'window' }]}
          {...props}
        >
          {children}
        </TetherBehavior>
      </Layer>
    );
  }
}

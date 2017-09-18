import CaptureMouseBehavior from './CaptureMouseBehavior';
import ContainFocusBehavior from './ContainFocusBehavior';
import HotkeyBehavior from './HotkeyBehavior';
import Layer from './Layer';
import OutsideBehavior from './OutsideBehavior';
import PropTypes from 'prop-types';
import React from 'react';
import RestoreFocusBehavior from './RestoreFocusBehavior';
import TetherBehavior from './TetherBehavior';
import emptyfunction from 'emptyfunction';

const ESC_KEY_CODE = 27;

export default class FlyoutLayer extends React.Component {
  static defaultProps = {
    onRequestClose: emptyfunction,
  };

  static propTypes = {
    onRequestClose: PropTypes.func,
    target: PropTypes.object.isRequired,
    children: PropTypes.node,
    attachment: PropTypes.string,
    targetAttachment: PropTypes.string.isRequired,
  };

  handleKeyUp = event => {
    if (event.keyCode === ESC_KEY_CODE) {
      this.props.onRequestClose();
    }
  };

  render() {
    return (
      <Layer>
        <HotkeyBehavior onKeyUp={this.handleKeyUp}>
          <TetherBehavior
            target={this.props.target}
            attachment={this.props.attachment}
            targetAttachment={this.props.targetAttachment}
          >
            <OutsideBehavior onClick={this.props.onRequestClose}>
              {this.props.children}
            </OutsideBehavior>
          </TetherBehavior>
        </HotkeyBehavior>
      </Layer>
    );
  }
}

import CaptureMouseBehavior from './CaptureMouseBehavior';
import ContainFocusBehavior from './ContainFocusBehavior';
import HotkeyBehavior from './HotkeyBehavior';
import Layer from './Layer';
import NoScrollBehavior from './NoScrollBehavior';
import OutsideBehavior from './OutsideBehavior';
import PropTypes from 'prop-types';
import React from 'react';
import RestoreFocusBehavior from './RestoreFocusBehavior';
import emptyfunction from 'emptyfunction';

const ESCAPE = 27;

const OUTER = {
  position: 'fixed', //'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  WebkitAlignItems: 'center',
  justifyContent: 'center',
  WebkitJustifyContent: 'center',
};

function DefaultBackdrop(props) {
  return <div style={OUTER}>{props.children}</div>;
}

DefaultBackdrop.propTypes = {
  children: PropTypes.node,
};

export default class ModalLayer extends React.Component {
  static defaultProps = {
    onRequestClose: emptyfunction,
    backdrop: DefaultBackdrop,
  };

  static propTypes = {
    onRequestClose: PropTypes.func,
    children: PropTypes.node,
    style: PropTypes.object,
  };

  handleKeyUp = event => {
    if (event.keyCode === ESCAPE) {
      this.props.onRequestClose();
    }
  };

  render() {
    return (
      <Layer>
        <NoScrollBehavior>
          <CaptureMouseBehavior>
            <ContainFocusBehavior>
              <RestoreFocusBehavior>
                <HotkeyBehavior onKeyUp={this.handleKeyUp}>
                  <this.props.backdrop
                    style={{
                      ...OUTER,
                      ...this.props.style,
                    }}
                  >
                    <OutsideBehavior onClick={this.props.onRequestClose}>
                      {this.props.children}
                    </OutsideBehavior>
                  </this.props.backdrop>
                </HotkeyBehavior>
              </RestoreFocusBehavior>
            </ContainFocusBehavior>
          </CaptureMouseBehavior>
        </NoScrollBehavior>
      </Layer>
    );
  }
}

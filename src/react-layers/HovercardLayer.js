import DocumentEventListener from './DocumentEventListener';
import Empty from './Empty';
import EventEmitter from 'eventemitter3';
import HotkeyBehavior from './HotkeyBehavior';
import Layer from './Layer';
import LayerStackBehavior from './LayerStackBehavior';
import OutsideBehavior from './OutsideBehavior';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import TetherBehavior from './TetherBehavior';
import canUseDOM from './canUseDOM';

const INTERVAL = 50;
const ESC_KEY_CODE = 27;
const RECENT_MOUSE_MOVE_FACTOR = 2;

const emitter = new EventEmitter();
let lastMouseMove = Date.now();
let lastMouseMoveEventCoords = null;

if (canUseDOM) {
  window.setInterval(emitter.emit.bind(emitter, 'tick'), INTERVAL);
  DocumentEventListener.addEventListener('mousemove', event => {
    lastMouseMove = Date.now();
    lastMouseMoveEventCoords = {
      clientX: event.clientX,
      clientY: event.clientY,
    };
  });
}

function hitTest(element, eventCoords) {
  const rect = element.getBoundingClientRect();
  const isInHorizontalBounds =
    eventCoords.clientX >= rect.left && eventCoords.clientX <= rect.right;
  const isInVerticalBounds =
    eventCoords.clientY >= rect.top && eventCoords.clientY <= rect.bottom;
  return isInHorizontalBounds && isInVerticalBounds;
}

export default class HovercardLayer extends React.Component {
  static defaultProps = { closeDelay: 500 };

  static propTypes = {
    target: PropTypes.object.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    closeDelay: PropTypes.number.isRequired,
    targetAttachment: PropTypes.string.isRequired,
  };

  componentWillMount() {
    this.lastSeenIn = Date.now();
    this.lastSeenOut = Date.now();
  }

  componentDidMount() {
    emitter.addListener('tick', this.handleTick);
  }

  componentWillUnmount() {
    emitter.removeListener('tick', this.handleTick);
  }

  handleClickOutside = e => {
    if (hitTest(this.props.target, e)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.props.onRequestClose();
  };

  handleIsTop = () => {
    // If it closed due to a recent mouse event, perform the hit test.
    if (
      Date.now() - lastMouseMove <=
      this.props.closeDelay * RECENT_MOUSE_MOVE_FACTOR
    ) {
      if (
        !hitTest(
          ReactDOM.findDOMNode(this.refs.content),
          lastMouseMoveEventCoords
        ) &&
        !hitTest(this.props.target, lastMouseMoveEventCoords)
      ) {
        this.props.onRequestClose();
      }
    }
  };

  handleKeyUp = event => {
    if (event.keyCode === ESC_KEY_CODE) {
      // TODO: these two lines are in the Smyte implementation, but cause a bug
      // and can be safely be removed.
      //event.preventDefault();
      //event.stopPropagation();
      this.props.onRequestClose();
    }
  };

  handleMouseMoveIn = () => {
    this.lastSeenIn = Date.now();
  };

  handleMouseMoveOut = e => {
    if (hitTest(this.props.target, e)) {
      this.handleMouseMoveIn();
      return;
    }

    this.lastSeenOut = Date.now();
  };

  handleTick = () => {
    if (
      this.lastSeenOut > this.lastSeenIn &&
      Date.now() - this.lastSeenIn > this.props.closeDelay
    ) {
      this.props.onRequestClose();
    }
  };

  render() {
    return (
      <Layer>
        <LayerStackBehavior onIsTop={this.handleIsTop}>
          <HotkeyBehavior onKeyUp={this.handleKeyUp}>
            <TetherBehavior
              constraints={[{ pin: ['left', 'right'], to: 'window' }]}
              target={this.props.target}
              attachment={this.props.attachment}
              targetAttachment={this.props.targetAttachment}
            >
              <OutsideBehavior
                onClick={this.handleClickOutside}
                onMouseMove={this.handleMouseMoveOut}
              >
                <Empty onMouseMove={this.handleMouseMoveIn} ref="content">
                  {this.props.children}
                </Empty>
              </OutsideBehavior>
            </TetherBehavior>
          </HotkeyBehavior>
        </LayerStackBehavior>
      </Layer>
    );
  }
}

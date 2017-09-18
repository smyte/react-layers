import ClickTrigger from './ClickTrigger';
import FlyoutLayer from './FlyoutLayer';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

export default class FlyoutClickTrigger extends React.Component {
  static propTypes = {
    attachment: PropTypes.string.isRequired,
    targetAttachment: PropTypes.string.isRequired,
    children: PropTypes.node,
    flyout: PropTypes.node,
    style: PropTypes.object,
    isOpen: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  };

  state = { domNode: null };

  componentDidMount() {
    this.setState({ domNode: ReactDOM.findDOMNode(this) });
  }

  render() {
    const {
      attachment,
      targetAttachment,
      flyout,
      children,
      isOpen,
      onClick,
      onRequestClose,
      style, // TODO: jsxstyle-ify
    } = this.props;

    let contextualLayer = null;

    if (flyout && isOpen && this.state.domNode) {
      contextualLayer = (
        <FlyoutLayer
          target={this.state.domNode}
          attachment={attachment}
          targetAttachment={targetAttachment}
          onRequestClose={onRequestClose}
        >
          {flyout}
        </FlyoutLayer>
      );
    }

    return (
      <ClickTrigger style={style} onClick={onClick}>
        {children}
        {contextualLayer}
      </ClickTrigger>
    );
  }
}

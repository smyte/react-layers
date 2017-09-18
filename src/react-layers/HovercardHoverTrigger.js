import HovercardLayer from './HovercardLayer';
import HoverTrigger from './HoverTrigger';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

export default class HovercardHoverTrigger extends React.Component {
  static defaultProps = {
    delay: 200,
    attachment: 'top left',
    targetAttachment: 'bottom left',
  };

  static propTypes = {
    onHoverChange: PropTypes.func,
    attachment: PropTypes.string,
    targetAttachment: PropTypes.string,
    hovercard: PropTypes.node.isRequired,
    delay: PropTypes.number.isRequired,
    closeDelay: PropTypes.number,
    children: PropTypes.node,
    targetRef: PropTypes.object,
  };

  state = { hovered: false, domNode: null };

  componentDidMount() {
    const target = this.props.targetRef ? this.props.targetRef : this;
    // eslint-disable-next-line react/no-did-mount-set-state, react/no-find-dom-node
    this.setState({ domNode: ReactDOM.findDOMNode(target) });
  }

  handleClose = () => {
    this.updateHover(false);
  };

  handleHoverChange = hovered => {
    if (hovered) {
      this.updateHover(true);
    }
  };

  updateHover = hovered => {
    if (this.state.domNode) {
      this.setState({ hovered });
    }

    if (this.props.onHoverChange) {
      this.props.onHoverChange(hovered);
    }
  };

  render() {
    let contextualLayer = null;
    if (this.state.hovered && this.state.domNode && this.props.hovercard) {
      contextualLayer = (
        <HovercardLayer
          closeDelay={this.props.closeDelay}
          target={this.state.domNode}
          attachment={this.props.attachment}
          targetAttachment={this.props.targetAttachment}
          onRequestClose={this.handleClose}
        >
          {this.props.hovercard}
        </HovercardLayer>
      );
    }

    return (
      <HoverTrigger
        onHoverChange={this.handleHoverChange}
        delay={this.props.delay}
        style={this.props.style}
        className={this.props.className}
      >
        {this.props.children}
        {contextualLayer}
      </HoverTrigger>
    );
  }
}

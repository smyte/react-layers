import FlyoutLayer from './FlyoutLayer';
import HoverTrigger from './HoverTrigger';
import React from 'react';
import ReactDOM from 'react-dom';

export default class FlyoutHoverTrigger extends React.Component {
  state = { hovered: false, domNode: null };

  componentDidMount() {
    this.setState({ domNode: ReactDOM.findDOMNode(this) });
  }

  handleClose = () => {
    this.setState({ hovered: false });
  };

  handleHoverChange = hovered => {
    if (hovered) {
      this.setState({ hovered: true });
    }
  };

  render() {
    let contextualLayer = null;
    if (this.state.hovered && this.state.domNode) {
      contextualLayer = (
        <FlyoutLayer
          target={this.state.domNode}
          attachment={this.props.attachment}
          onRequestClose={this.handleClose}
        >
          {this.props.flyout}
        </FlyoutLayer>
      );
    }

    return (
      <HoverTrigger onHoverChange={this.handleHoverChange}>
        {this.props.children}
        {contextualLayer}
      </HoverTrigger>
    );
  }
}

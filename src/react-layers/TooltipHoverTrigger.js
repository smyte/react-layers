import HoverTrigger from './HoverTrigger';
import React from 'react';
import ReactDOM from 'react-dom';
import TooltipLayer from './TooltipLayer';

export default class TooltipHoverTrigger extends React.Component {
  state = { hovered: false, domNode: null };

  componentDidMount() {
    this.setState({ domNode: ReactDOM.findDOMNode(this) });
  }

  handleHoverChange = hovered => {
    this.setState({ hovered });
  };

  render() {
    let contextualLayer = null;
    const { children, style, tooltip, ...props } = this.props;

    if (this.state.hovered && this.state.domNode && tooltip) {
      contextualLayer = (
        <TooltipLayer
          {...props}
          target={this.state.domNode}
          targetAttachment={this.props.attachment}
        >
          {tooltip}
        </TooltipLayer>
      );
    }

    return (
      <HoverTrigger onHoverChange={this.handleHoverChange} style={style}>
        {children}
        {contextualLayer}
      </HoverTrigger>
    );
  }
}

import ClickTrigger from './ClickTrigger';
import ModalLayer from './ModalLayer';
import React from 'react';
import ReactDOM from 'react-dom';

export default class ModalClickTrigger extends React.Component {
  state = { open: false, domNode: null };

  componentDidMount() {
    this.setState({ domNode: ReactDOM.findDOMNode(this) });
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let contextualLayer = null;
    if (this.state.open && this.state.domNode) {
      contextualLayer = (
        <ModalLayer onRequestClose={this.handleClose} backdrop={this.props.backdrop}>
          {this.props.modal}
        </ModalLayer>
      );
    }

    return (
      <ClickTrigger onClick={this.handleClick}>
        {this.props.children}
        {contextualLayer}
      </ClickTrigger>
    );
  }
}

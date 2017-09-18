import EventEmitter from 'eventemitter3';
import LayerRoot from './LayerRoot';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

export default class Layer extends React.Component {
  static contextTypes = {
    layer: PropTypes.object,
  };

  componentWillMount() {
    this._layerDOMNode = null;
    this._isTop = true;
    this._emitter = new EventEmitter();

    if (this.context.layer) {
      this.context.layer._setIsTop(false);
    }
  }

  componentDidMount() {
    this._layerDOMNode = document.createElement('div');
    document.body.appendChild(this._layerDOMNode);
    this._updateLayer();
  }

  componentDidUpdate() {
    this._updateLayer();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this._layerDOMNode);
    document.body.removeChild(this._layerDOMNode);
    this._layerDOMNode = null;

    if (this.context.layer) {
      this.context.layer._setIsTop(true);
    }
  }

  getLayerDOMNode = () => {
    return this._layerDOMNode;
  };

  _setIsTop = isTop => {
    this._isTop = isTop;
    if (isTop) {
      this._emitter.emit('isTop');
    }
  };

  _updateLayer = () => {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <LayerRoot style={this.props.style} layer={this}>
        {this.props.children}
      </LayerRoot>,
      this._layerDOMNode
    );
  };

  addListener = (eventName, cb) => {
    this._emitter.addListener(eventName, cb);
  };

  isTop = () => {
    return this._isTop;
  };

  removeListener = (eventName, cb) => {
    this._emitter.removeListener(eventName, cb);
  };

  render() {
    return null;
  }
}

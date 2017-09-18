import Empty from './Empty';
import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import WithLayerMixin from './WithLayerMixin';

const layerObjects = {};

// this is basically pseudocode

const UniqueBehavior = createReactClass({
  displayName: 'UniqueBehavior',
  mixins: [WithLayerMixin],

  propTypes: {
    style: PropTypes.object,
    children: PropTypes.node,
    identity: PropTypes.string.isRequired,
  },

  getInitialState() {
    return {
      top: true,
    };
  },

  onRequestClose() {
    this.setState({ top: false });
  },

  componentWillMount() {
    const previousLayer = layerObjects[this.props.identity];
    if (
      typeof previousLayer === 'object' &&
      previousLayer !== null &&
      typeof previousLayer.onRequestClose === 'function'
    ) {
      previousLayer.onRequestClose();
    }
    layerObjects[this.props.identity] = this;
  },

  render() {
    // kill the layer at render level? hmmm...
    if (!this.state.top) {
      return null;
    }

    return <Empty style={this.props.style}>{this.props.children}</Empty>;
  },
});

export default UniqueBehavior;

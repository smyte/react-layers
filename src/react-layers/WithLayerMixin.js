import PropTypes from 'prop-types';
import invariant from 'invariant';

const WithLayerMixin = {
  contextTypes: {
    layer: PropTypes.object,
  },

  isLayerTop() {
    invariant(
      !!this.context.layer,
      'Cannot call isTop() as this component is not in a Layer'
    );
    return this.context.layer.isTop();
  },

  addLayerListener(eventName, cb) {
    this.context.layer.addListener(eventName, cb);
  },

  removeLayerListener(eventName, cb) {
    this.context.layer.removeListener(eventName, cb);
  },

  getLayer() {
    return this.context.layer;
  },
};

export default WithLayerMixin;

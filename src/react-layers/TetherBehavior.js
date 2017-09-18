import LayerRoot from './LayerRoot';
import PropTypes from 'prop-types';
import React from 'react';
import createReactClass from 'create-react-class';
import ReactDOM from 'react-dom';
import Tether from 'tether';
import WithLayerMixin from './WithLayerMixin';
import shallowEquals from 'shallow-equals';

const TetherBehavior = createReactClass({
  displayName: 'TetherBehavior',

  propTypes: {
    children: PropTypes.node,

    // tether props
    element: PropTypes.object,
    target: PropTypes.object.isRequired,
    attachment: PropTypes.string.isRequired,
    targetAttachment: PropTypes.string.isRequired,
    offset: PropTypes.string,
    targetOffset: PropTypes.string,
    enabled: PropTypes.bool,
    classes: PropTypes.objectOf({
      'tether-element': PropTypes.string,
      'tether-target': PropTypes.string,
      'tether-enabled': PropTypes.string,
      'tether-element-attached-left': PropTypes.string,
      'tether-element-attached-right': PropTypes.string,
      'tether-element-attached-top': PropTypes.string,
      'tether-element-attached-bottom': PropTypes.string,
      'tether-element-attached-middle': PropTypes.string,
      'tether-element-attached-center': PropTypes.string,
      'tether-target-attached-left': PropTypes.string,
      'tether-target-attached-right': PropTypes.string,
      'tether-target-attached-top': PropTypes.string,
      'tether-target-attached-bottom': PropTypes.string,
      'tether-target-attached-middle': PropTypes.string,
      'tether-target-attached-center': PropTypes.string,
      'out-of-bounds': PropTypes.string,
      element: PropTypes.string,
    }),
    classPrefix: PropTypes.string,
    optimizations: PropTypes.object,
    constraints: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.string.isRequired,
        attachment: PropTypes.string,
        pin: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.arrayOf(
            PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
          ),
        ]),
        outOfBoundsClass: PropTypes.string,
        pinnedClass: PropTypes.string,
      })
    ),
  },

  mixins: [WithLayerMixin],

  componentDidMount() {
    // Note: Tether kind of sucks and moves our layer around in the DOM which confuses React.
    // We wrap it in its own mini-"layer" here to compensate.
    this.domNode = document.createElement('div');
    document.body.appendChild(this.domNode);
    this._update();
    this.tether = this.getTether();
    this.tether.position();
  },

  componentDidUpdate(prevProps) {
    if (!shallowEquals(this.props, prevProps)) {
      this.tether.destroy();
      this.tether = this.getTether();
      this.tether.position();
    }
    this._update();
  },

  componentWillUnmount() {
    this.tether.destroy();
    ReactDOM.unmountComponentAtNode(this.domNode);
    document.body.removeChild(this.domNode);
    this.domNode = null;
  },

  getTether() {
    return new Tether(
      Object.assign(
        {
          element: this.domNode,
        },
        this.props
      )
    );
  },

  _update() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <LayerRoot layer={this.getLayer()}>{this.props.children}</LayerRoot>,
      this.domNode
    );
  },

  render() {
    return null;
  },
});

export default TetherBehavior;

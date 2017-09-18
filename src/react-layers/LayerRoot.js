import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import WithNoopRender from './WithNoopRender';

const LayerRoot = createReactClass({
  displayName: 'LayerRoot',
  mixins: [WithNoopRender],

  childContextTypes: {
    layer: PropTypes.object,
  },

  getChildContext() {
    return { layer: this.props.layer };
  },
});

export default LayerRoot;

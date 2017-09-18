import createReactClass from 'create-react-class';
import WithLayerMixin from './WithLayerMixin';
import WithNoopRender from './WithNoopRender';
import emptyfunction from 'emptyfunction';

const LayerStackBehavior = createReactClass({
  displayName: 'LayerStackBehavior',
  mixins: [WithLayerMixin, WithNoopRender],

  getDefaultProps() {
    return {
      onIsTop: emptyfunction,
    };
  },

  componentWillMount() {
    this.addLayerListener('isTop', this.handleIsTop);
  },

  componentWillUnmount() {
    this.removeLayerListener('isTop', this.handleIsTop);
  },

  handleIsTop() {
    this.props.onIsTop();
  },
});

export default LayerStackBehavior;

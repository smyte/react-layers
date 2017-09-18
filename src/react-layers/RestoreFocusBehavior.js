import createReactClass from 'create-react-class';
import WithLayerMixin from './WithLayerMixin';
import WithNoopRender from './WithNoopRender';
import canUseDOM from './canUseDOM';

const RestoreFocusBehavior = createReactClass({
  displayName: 'RestoreFocusBehavior',
  mixins: [WithLayerMixin, WithNoopRender],

  componentWillMount() {
    if (canUseDOM) {
      this.previouslyFocusedElement = document.activeElement;
    }
  },

  componentWillUnmount() {
    this.previouslyFocusedElement.focus();
  },
});

export default RestoreFocusBehavior;

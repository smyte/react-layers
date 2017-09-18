import DocumentEventListener from './DocumentEventListener';
import createReactClass from 'create-react-class';
import WithLayerMixin from './WithLayerMixin';
import WithNoopRender from './WithNoopRender';

const EVENT_NAMES = {
  keydown: 'onKeyDown',
  keyup: 'onKeyUp',
};

const HotkeyBehavior = createReactClass({
  displayName: 'HotkeyBehavior',
  mixins: [WithLayerMixin, WithNoopRender],

  handleKeyEvent(event) {
    if (!this.isLayerTop()) {
      return;
    }

    const callbackName = EVENT_NAMES[event.type];

    if (callbackName) {
      const callback = this.props[callbackName];
      if (callback) {
        callback(event);
      }
    }
  },

  componentDidMount() {
    for (const eventName in EVENT_NAMES) {
      DocumentEventListener.addEventListener(eventName, this.handleKeyEvent);
    }
  },

  componentWillUnmount() {
    for (const eventName in EVENT_NAMES) {
      DocumentEventListener.removeEventListener(eventName, this.handleKeyEvent);
    }
  },
});

export default HotkeyBehavior;

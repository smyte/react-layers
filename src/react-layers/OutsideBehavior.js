import DocumentEventListener from './DocumentEventListener';
import createReactClass from 'create-react-class';
import ReactDOM from 'react-dom';
import WithLayerMixin from './WithLayerMixin';
import WithNoopRender from './WithNoopRender';

const EVENTS = {
  click: 'onClick',
  mousemove: 'onMouseMove',
};

const OutsideBehavior = createReactClass({
  displayName: 'OutsideBehavior',
  mixins: [WithLayerMixin, WithNoopRender],

  componentDidMount() {
    for (const eventName in EVENTS) {
      DocumentEventListener.addEventListener(eventName, this.handleEvent);
    }
  },

  componentWillUnmount() {
    for (const eventName in EVENTS) {
      DocumentEventListener.removeEventListener(eventName, this.handleEvent);
    }
  },

  handleEvent(event) {
    if (!this.isLayerTop()) {
      return;
    }

    const propName = EVENTS[event.type];
    if (!propName) {
      return;
    }
    const callback = this.props[propName];
    if (!callback) {
      return;
    }

    if (ReactDOM.findDOMNode(this).contains(event.target)) {
      return;
    }

    callback(event);
  },
});

export default OutsideBehavior;

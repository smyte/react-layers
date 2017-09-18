import DocumentEventListener from './DocumentEventListener';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import ReactDOM from 'react-dom';
import WithLayerMixin from './WithLayerMixin';
import WithNoopRender from './WithNoopRender';
import tabbable from 'tabbable';

const ContainFocusBehavior = createReactClass({
  displayName: 'ContainFocusBehavior',
  mixins: [WithLayerMixin, WithNoopRender],

  propTypes: {
    focusOnMount: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      focusOnMount: true,
    };
  },

  _getFirstFocusableElement() {
    const domNode = ReactDOM.findDOMNode(this);
    return tabbable(domNode)[0] || domNode;
  },

  componentDidMount() {
    if (this.props.focusOnMount) {
      // TODO: this is really bad... need to coordinate better with TetherBehavior.
      process.nextTick(() => {
        this._getFirstFocusableElement().focus();
      });
    }
    DocumentEventListener.addEventListener('focus', this.handleFocus);
  },

  componentWillUnmount() {
    DocumentEventListener.removeEventListener('focus', this.handleFocus);
  },

  handleFocus(event) {
    if (!this.isLayerTop()) {
      return;
    }

    if (!ReactDOM.findDOMNode(this).contains(event.target)) {
      event.stopPropagation();
      event.preventDefault();
      this._getFirstFocusableElement().focus();
    }
  },
});

export default ContainFocusBehavior;

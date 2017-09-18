import Empty from './Empty';
import PropTypes from 'prop-types';

// const HoverRegion = require('./HoverRegion');
import React from 'react';

import createReactClass from 'create-react-class';
import ReactDOM from 'react-dom';
import TimerMixin from 'react-timer-mixin';
import emptyfunction from 'emptyfunction';

const SPACE_KEY_CODE = 32;

const HoverTrigger = createReactClass({
  displayName: 'HoverTrigger',
  mixins: [TimerMixin],

  propTypes: {
    onHoverChange: PropTypes.func,
    delay: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
  },

  getDefaultProps() {
    return {
      onHoverChange: emptyfunction,
      delay: 0,
      style: { width: 'auto', maxWidth: '100%' },
    };
  },

  handleIn() {
    if (this.props.delay > 0 && !this.timeout) {
      this.timeout = this.setTimeout(() => {
        this.props.onHoverChange(true);
      }, this.props.delay);
    } else {
      this.props.onHoverChange(true);
    }
  },

  handleOut() {
    if (this.props.delay > 0) {
      if (this.timeout) {
        this.clearTimeout(this.timeout);
        this.timeout = null;
        this.props.onHoverChange(false);
      }
    } else {
      this.props.onHoverChange(false);
    }
  },

  handleKeyUp(e) {
    if (
      e.keyCode === SPACE_KEY_CODE &&
      e.target === ReactDOM.findDOMNode(this)
    ) {
      this.handleIn();
    }
  },

  render() {
    // TODO: the keyboard accessibility is kinda cheesy...
    return (
      <Empty
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleOut}
        onMouseEnter={this.handleIn}
        onMouseLeave={this.handleOut}
        style={this.props.style}
        className={this.props.className}
        tabIndex={0}
      >
        {this.props.children}
      </Empty>
    );
  },
});

export default HoverTrigger;

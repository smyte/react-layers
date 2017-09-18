import PropTypes from 'prop-types';
import React from 'react';

export default class NoScrollBehavior extends React.Component {
  static propTypes = {
    children: PropTypes.element,
  };

  componentDidMount() {
    this.prevOverflow = document.body.style.overflow;

    // Hide scrollbars.
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = this.prevOverflow;
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

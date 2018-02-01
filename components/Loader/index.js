import React, {Component } from 'react';
import {connect} from 'react-redux';
require('./loader.scss');

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: (props.show ? "loader-container" :  "hidden")
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({className: (nextProps.show) ? "loader-container" :  "hidden"});
  }
  render() {
    
    return (
      <div className={this.state.className}>
          <div className="loader">
              <svg viewBox="0 0 32 32" width="32" height="32">
                <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
              </svg>
          </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    show: state.app.loader
  };
}

export default connect(mapStateToProps)(Loader);
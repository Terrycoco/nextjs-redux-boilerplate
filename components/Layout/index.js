import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { setDim } from 'actions/appActions';

import stylesheet from './layout.scss';


class Page extends Component {
  getInitialProps() {
    
  }
  constructor(props) {
    super(props);
    this.state = {
      isAbsolute:  props.isAbsolute | false
    };
    this.bound_onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    this.bound_onResize();
    window.addEventListener('resize', this.bound_onResize);
  }


  componentWillUnmount() {
    window.removeEventListener("resize", this.bound_onResize);
  }


  onResize() {
    //set current dimensions in store 
    this.props.setDim({height: window.innerHeight || document.documentElement.clientHeight, width: window.innerWidth || document.documentElement.clientWidth});
  }

  render() {
    let classname = (this.state.isAbsolute ? "PAGE-ABSOLUTE" : 'PAGE');
    return (
    <div className="APP">
      <div id="page" ref="page" className={classname} style={{height: this.props.height, width: this.props.width, overflowY: 'hidden'}} >
       {this.props.children}
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    </div>
    );
  }
}

function mapDispatchToProps(dispatch)  {
  return {
    setDim: bindActionCreators(setDim, dispatch)
  }
}

function mapStoreToProps(store) {
  return {
    height: store.app.height,
    width: store.app.width
  };
}

export default connect(mapStoreToProps, mapDispatchToProps)(Page);
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import registerSW from 'offline/registerSW';
import { setDim } from 'actions/appActions';
import { initStorage, syncStorage, ageStore } from 'actions/storageActions';
import stylesheet from './layout.scss';


class Shell extends Component {
  getInitialProps() {
    
  }
  constructor(props) {
    super(props);
    this.state = {
      isAbsolute:  props.isAbsolute | false
    };
    this.bound_onResize = this.onResize.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    if (process.env.NODE_ENV ==='production') {
      registerSW();
    }
    this.props.initStorage();
    this.props.syncStorage();
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
      <style dangerouslySetInnerHTML={{__html: stylesheet}}></style>
      <div id="page" ref="page" className={classname} style={{height: this.props.height, width: this.props.width, overflowY: 'hidden'}} >
       {this.props.children}
      </div>
     
    </div>
    );
  }
}

function mapDispatchToProps(dispatch)  {
  return {
    setDim: bindActionCreators(setDim, dispatch),
    initStorage: bindActionCreators(initStorage, dispatch),
    syncStorage: bindActionCreators(syncStorage, dispatch)
  }
}

function mapStoreToProps(store) {
  return {
    height: store.app.height,
    width: store.app.width
  };
}

export default connect(mapStoreToProps, mapDispatchToProps)(Shell);
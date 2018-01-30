import React, {Component} from 'react';
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import withRedux from 'next-redux-wrapper';
import withMui from '../components/withMui';
import { bindActionCreators } from 'redux';
import makeStore from '../store';
import * as appActions from '../actions/appActions';


class App extends Component {
   componentDidMount() {
     this.props.setDim({height: this.props.browser.height, width: this.props.browser.width});
   }

   render() {
    return (
    <div>
      <Head title="Home" />
      <Nav />
      Hello Nextjs-Redux!!
    </div>
    );
   }
}

function mapStateToProps(state) {
  return {
    browser: state.browser,
    height: state.app.height,
    width: state.app.width
  };
}

export default withRedux(makeStore, mapStateToProps, appActions)(withMui(App));

import React, {Component} from 'react';
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import withRedux from 'next-redux-wrapper';
import withMui from '../components/withMui';
import { bindActionCreators } from 'redux';
import makeStore from '../store';

class App extends Component {


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

export default withRedux(makeStore, mapStateToProps, null)(withMui(Walk));

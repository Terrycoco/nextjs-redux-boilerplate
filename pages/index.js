import React, {Component} from 'react';
import Link from 'next/link'
import Head from 'components/head'
import Nav from 'components/nav'
import withRedux from 'next-redux-wrapper';
import withMui from 'components/hocs/withMui';
import { bindActionCreators } from 'redux';
import makeStore from '../store';
import * as appActions from 'actions/appActions';
import Layout from 'components/Layout';

class App extends Component {
   componentDidMount()  {
     if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register('sw.js')
      .then((registration) => {
        console.log("Service worker registered  with scope ", registration.scope);
      })
      .catch(err => {
        console.error("Service worker registration failed", err);
      })
     } else {
      console.log('Service worker not supported');
     }
   }

   render() {
    return (
    <Layout>
      <Head title="Home" />
      <Nav />
     <p>Hello Nextjs-Redux!!</p>
     <p>{`Your screen dimensions are: 
           ${this.props.height} x ${this.props.width}
           and that is ${this.props.browser.mediaType}
           `}</p>
    </Layout>
    );
   }
}

function mapStateToProps(state) {
  console.log('Store: ', state);
  return {
    browser: state.browser,
    height: state.app.height,
    width: state.app.width
  };
}

export default withRedux(makeStore, mapStateToProps, appActions)(withMui(App));

import React, {Component} from 'react';
import Link from 'next/link';
import Head from 'components/Head';
import Nav from 'components/Nav';
import withRedux from 'next-redux-wrapper';
import withMui from 'components/hocs/withMui';
import { bindActionCreators } from 'redux';
import makeStore from '../store';
import * as appActions from 'actions/appActions';
import Layout from 'components/Layout';
import registerSW from 'offline/registerSW';
import Loader from 'components/Loader';

class App extends Component {
  getInitialProps() {
  }
  
  componentDidMount()  {
    registerSW();
  }

   render() {
    return (
    <Layout>
      <Head title="Home">
      </Head>
      <Nav />

     <Loader />

    </Layout>
    );
   }
}

function mapStateToProps(state) {
 // console.log('Store: ', state);
  return {
    browser: state.browser,
    height: state.app.height,
    width: state.app.width
  };
}

export default withRedux(makeStore, mapStateToProps, appActions)(withMui(App));

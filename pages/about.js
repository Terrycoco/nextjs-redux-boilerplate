import React, {Component} from 'react';
import Head from 'components/Head';
import Nav from 'components/Nav';
import withRedux from 'next-redux-wrapper';
import withMui from 'components/hocs/withMui';
import { bindActionCreators } from 'redux';
import initStore from 'root/store';
import Layout from 'components/Layout';
import registerSW from 'offline/registerSW';
import Loader from 'components/Loader';
import TextField from 'material-ui/TextField';
import {initStorage, syncStorage} from 'actions/storageActions';

class About extends Component {
  static async getInitialProps() {
  }
  
  componentDidMount()  {
    if (process.env.NODE_ENV ==='production') {
      registerSW();
    }
    this.props.syncStorage();
   }

  componentWillMount() {
    this.props.initStorage();
  }

  render() {
    return (
    <Layout>
      <Head title="About">
      </Head>
      <Nav />
      <p>Here is the value:</p> 
      {this.props.textValue}
     <Loader />

    </Layout>
    );
   }
}

function mapStateToProps(state) {
  return {
    browser: state.browser,
    height: state.app.height,
    width: state.app.width,
    textValue: state.app.textValue
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initStorage: bindActionCreators(initStorage, dispatch),
    syncStorage: bindActionCreators(syncStorage, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(withMui(About));

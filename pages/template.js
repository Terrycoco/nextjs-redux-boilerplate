import React, {Component} from 'react';
import Head from 'components/Head';
import Nav from 'components/Nav';
import withRedux from 'next-redux-wrapper';
import withMui from 'components/hocs/withMui';
import { bindActionCreators } from 'redux';
import initStore from 'root/store';
import Layout from 'components/Layout';
import registerSW from 'offline/registerSW';
 //use SyncStorage if you want whatever user does on this page to persist
import { initStorage, syncStorage} from 'actions/storageActions'; 

class NEWPAGE extends Component {
  static async getInitialProps() {
  }
  componentWillMount() {
    this.props.initStorage();
  }
  componentDidMount()  {
    if (process.env.NODE_ENV ==='production') {
      registerSW();
      this.props.syncStorage();
    }
  }


  render() {
    return (
    <Layout>
      <Head title="NEWPAGE" />
      <Nav />
       Use this as a template to add new pages

    </Layout>
    );
   }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initStorage: bindActionCreators(initStorage, dispatch),
    syncStorage: bindActionCreators(syncStorage, dispatch)
  }
}
export default withRedux(initStore, mapStateToProps = null, mapDispatchToProps )(withMui(NEWPAGE));

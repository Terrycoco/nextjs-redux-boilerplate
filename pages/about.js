import React, {Component} from 'react';
import Head from 'components/Head';
import Nav from 'components/Nav';
import withRedux from 'next-redux-wrapper';
import initStore from 'root/store';
import withMui from 'components/hocs/withMui';
import { bindActionCreators } from 'redux';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class About extends Component {
  static async getInitialProps(ctx) {
    const {req} = ctx;
    const {store} = ctx;
    const {isServer} = ctx;
    const id = ctx.query.id;
    const response = await axios.get(`https://api.sharewalks.com/walk/${id}`);
    const walk = response.data;
   // store.dispatch(setWalk(walk));
    return { id: id, walk: walk }
  }
  
  componentDidMount()  {
   }

  componentWillMount() {
  }

  render() {
    return (
    <Layout>
      <Head title="About">
      </Head>
      <Nav />
      <p>{"ID: " + this.props.id + ' ' + this.props.walk.title}</p>
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

  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(withMui(About));

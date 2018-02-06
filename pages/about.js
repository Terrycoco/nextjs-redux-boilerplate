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


class About extends Component {
  static async getInitialProps() {
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

import React, {Component} from 'react';
import Head from 'components/Head';
import Nav from 'components/Nav';
import withRedux from 'next-redux-wrapper';
import withMui from 'components/hocs/withMui';
import { bindActionCreators } from 'redux';
import initStore from 'root/store';
import {setDim, setText} from 'actions/appActions';
import Layout from 'components/Layout';
import registerSW from 'offline/registerSW';
import Loader from 'components/Loader';
import TextField from 'material-ui/TextField';

class App extends Component {
  getInitialProps({ store, isServer}) {
    return {isServer}
  }
  
  componentDidMount()  {
    if (process.env.NODE_ENV === 'production') {
      registerSW();
    }
  
   }

  handleChange = (event) => {
    this.props.setText(event.target.value);
    event.preventDefault();
  }

   render() {
    return (
    <Layout>
      <Head title="Home">
      </Head>
      <Nav />
      <TextField
         type="text"
         id="text-field-controlled"
         floatingLabelText="Store will persist! Type a value:"
         value={this.props.textValue}
         onChange={this.handleChange} />
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
    setDim: bindActionCreators(setDim, dispatch),
    setText: bindActionCreators(setText, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(withMui(App));

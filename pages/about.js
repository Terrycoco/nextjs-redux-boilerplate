import React, {Component} from 'react';
import Head from 'components/Head';
import Nav from 'components/Nav';
import withRedux from 'next-redux-wrapper';
import initStore from 'root/store';
import withMui from 'components/hocs/withMui';
import { bindActionCreators } from 'redux';
import Shell from 'components/Shell';
import axios from 'axios';

class About extends Component {
  static async getInitialProps(ctx) {
    const {req} = ctx;
    const {store} = ctx;
    const {isServer} = ctx;
    const id = ctx.query.id;
    return { id: id }
  }
  
  componentDidMount()  {
   }

  componentWillMount() {
  }

  render() {
    return (
    <Shell>
      <Head title="About">
      </Head>
      <Nav />
      <p>{"ID: " + this.props.id }</p>
      <p>Here is the value:</p> 
      {this.props.textValue}

    </Shell>
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

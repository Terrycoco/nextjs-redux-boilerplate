import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducers from 'reducers';
import reduxThunk from 'redux-thunk';
import { responsiveStoreEnhancer } from 'redux-responsive';


const composeEnhancers = composeWithDevTools({});


/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (if any)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/
const makeStore = (initialState, options) => {
  return createStore(
    reducers,
    initialState,
    composeEnhancers(
      responsiveStoreEnhancer,
      applyMiddleware(reduxThunk)
    )
  );
}

export default makeStore;


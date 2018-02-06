import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive';
import appReducer from 'reducers/appReducer';
import storageReducer from 'reducers/storageReducer';

//add your reducers here
const rootReducer = combineReducers({
  browser: responsiveStateReducer,
  app: appReducer,
  storage: storageReducer
});

export default rootReducer;


import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive';
import appReducer from 'reducers/appReducer';

//add your reducers here
const rootReducer = combineReducers({
  browser: responsiveStateReducer,
  app: appReducer,
});

export default rootReducer;


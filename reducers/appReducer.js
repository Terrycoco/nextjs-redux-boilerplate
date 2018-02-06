var a = require('actions/types').app;
var s = require('actions/types').storage;

/*updated value here is used for syncStorage
set its value to Date.now() any time you want the value 
to be persisted into local storage
and hold its value between browser refreshes */

const INITIAL_STATE = {
  updated: null, 
  height: 600,
  width: 400
};


export default function(state=INITIAL_STATE, action) {
  let newstate = state;
  switch(action.type) {
    //updates whole store -- put in every reducer with name of reducer
    case s.SET_STORE: 
      return action.payload.app;
    case a.SET_UPDATED:
      return Object.assign({}, state, {updated: action.payload});

    case a.SET_DIM:
      return Object.assign({}, state, {height: action.payload.height, width: action.payload.width});

    case a.SET_TEXT:
      return Object.assign({}, state, {textValue: action.payload, updated: Date.now()}); //update any time you want value persisted

  }

  return state;
}
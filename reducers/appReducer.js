var a = require('actions/types').app;
var s = require('actions/types').storage;

const INITIAL_STATE = {
  height: 600,
  width: 400,
  updated: null
};


export default function(state=INITIAL_STATE, action) {
  let newstate = state;
  switch(action.type) {
    case a.SET_DIM:
      return Object.assign({}, state, {height: action.payload.height, width: action.payload.width});
    case s.SET_STORE: 
      return action.payload.app;
    case a.SET_TEXT:
      return Object.assign({}, state, {textValue: action.payload, updated: Date.now()});
    case a.SET_UPDATED:
      return Object.assign({}, state, {updated: action.payload});
  }

  return state;
}
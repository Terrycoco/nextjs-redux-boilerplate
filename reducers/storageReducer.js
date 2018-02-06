var a = require('actions/types').app;
var s = require('actions/types').storage;

const INITIAL_STATE = {
 updated: null
};


export default function(state=INITIAL_STATE, action) {
  let newstate;
  switch(action.type) {
    case s.SET_STORE: 
      return action.payload.storage;
  }
  return state;
}


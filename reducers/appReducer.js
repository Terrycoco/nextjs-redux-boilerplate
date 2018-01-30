var a = require('actions/types').app;

const INITIAL_STATE = {
  height: null,
  width: null
};


export default function(state=INITIAL_STATE, action) {
  let newstate;
  switch(action.type) {
    case a.SET_DIM:
      return Object.assign({}, state, {height: action.payload.height, width: action.payload.width});
  }
  return state;
}
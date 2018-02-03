var a = require('actions/types').app;

const INITIAL_STATE = {
  height: 600,
  width: 400
};


export default function(state=INITIAL_STATE, action) {
  let newstate;
  switch(action.type) {
    case a.SET_DIM:
      return Object.assign({}, state, {height: action.payload.height, width: action.payload.width});
    case a.SET_TEXT:
      return Object.assign({}, state, {textValue: action.payload});

  }
  return state;
}
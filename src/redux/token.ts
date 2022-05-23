import { EnumWriteAnAnswer } from "./actionTypes";

const initValue = {
  token: null,
};

const token = (state = initValue, action: any) => {
  switch (action.type) {
    case EnumWriteAnAnswer.SET_TOKEN: 
    return {
      ...state,
      token: action.token
    }
    case EnumWriteAnAnswer.DELETE_TOKEN: 
    return {
      ...state,
      token: null,
    }
    default:
      return state;
  }
};

export default token;

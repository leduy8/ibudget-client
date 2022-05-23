import { EnumWriteAnAnswer } from "./actionTypes";

const initValue = {
    user: null,
};

const user = (state = initValue, action: any) => {
  switch (action.type) {
    case EnumWriteAnAnswer.SET_USER: 
    return {
      ...state,
      user: action.user
    }
    case EnumWriteAnAnswer.DELETE_USER: 
    return {
      ...state,
      user: null,
    }
    default:
      return state;
  }
};

export default user;

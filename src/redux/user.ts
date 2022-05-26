import { EnumActionType } from "./actionTypes";

const initValue = {
    user: null,
};

const user = (state = initValue, action: any) => {
  switch (action.type) {
    case EnumActionType.SET_USER: 
    return {
      ...state,
      user: action.user
    }
    case EnumActionType.DELETE_USER: 
    return {
      ...state,
      user: null,
    }
    default:
      return state;
  }
};

export default user;

import { EnumActionType } from "./actionTypes";

const initValue = {
  focusTransaction: {},
};

const focusTransaction = (state = initValue, action: any) => {
  switch (action.type) {
    case EnumActionType.SET_FOCUS_TRANSACTION:
    return {
      ...state,
      focusTransaction: action.focusTransaction
    }
    default:
      return state;
  }
};

export default focusTransaction;

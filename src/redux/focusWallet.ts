import { EnumActionType } from "./actionTypes";

const initValue = {
  focusWallet: null,
};

const focusWallet = (state = initValue, action: any) => {
  switch (action.type) {
    case EnumActionType.SET_FOCUS_WALLET: 
    return {
      ...state,
      focusWallet: action.focusWallet
    }
    default:
      return state;
  }
};

export default focusWallet;

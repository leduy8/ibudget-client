import { EnumActionType } from "./actionTypes";
import { textContent } from './../configs/textContent';

const initValue = {
  focusWallet: {"name": textContent.TRANSACTIONS.CASH, "balance": 0},
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

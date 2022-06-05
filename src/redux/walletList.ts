import { EnumActionType } from "./actionTypes";

const initValue = {
  walletList: {},
};

const walletList = (state = initValue, action: any) => {
  switch (action.type) {
    case EnumActionType.SET_WALLET_LIST:
    return {
      ...state,
      walletList: action.walletList
    }
    default:
      return state;
  }
};

export default walletList;

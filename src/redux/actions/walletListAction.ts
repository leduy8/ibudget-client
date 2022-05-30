import { EnumActionType } from "../actionTypes";
import createActions from "../createActions";
import { store } from "../reducer";

export const setWalletList = (walletList: object) => {
    const set = createActions(EnumActionType.SET_WALLET_LIST, {
        walletList
      });
      store.dispatch(set);
}
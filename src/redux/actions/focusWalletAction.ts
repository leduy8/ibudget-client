import { EnumActionType } from "../actionTypes";
import createActions from "../createActions";
import { store } from "../reducer";

export const setFocusWallet = (focusWallet: object) => {
    const set = createActions(EnumActionType.SET_FOCUS_WALLET, {
        focusWallet
      });
      store.dispatch(set);
}
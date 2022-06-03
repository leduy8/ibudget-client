import { EnumActionType } from "../actionTypes";
import createActions from "../createActions";
import { store } from "../reducer";

export const setFocusTransaction = (focusTransaction: object) => {
    const set = createActions(EnumActionType.SET_FOCUS_TRANSACTION, {
        focusTransaction
      });
      store.dispatch(set);
}
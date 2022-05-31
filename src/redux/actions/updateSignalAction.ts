import { EnumActionType } from "../actionTypes";
import createActions from "../createActions";
import { store } from "../reducer";

export const setUpdateSignal = (updateSignal: boolean) => {
    const set = createActions(EnumActionType.SET_UPDATE_SIGNAL, {
        updateSignal
      });
      store.dispatch(set);
}
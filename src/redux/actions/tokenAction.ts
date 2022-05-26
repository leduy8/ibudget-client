import { EnumActionType } from "../actionTypes";
import createActions from "../createActions";
import { store } from "../reducer";

export const setToken = (token: string) => {
    const set = createActions(EnumActionType.SET_TOKEN, {
        token
      });
      store.dispatch(set);
}

export const deleteToken = () => {
    const remove = createActions(EnumActionType.DELETE_TOKEN, null);
      store.dispatch(remove);
}
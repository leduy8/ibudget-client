import { EnumActionType } from "../actionTypes";
import createActions from "../createActions";
import { store } from "../reducer";

export const setUser = (user: string) => {
    const set = createActions(EnumActionType.SET_USER, {
        user
      });
      store.dispatch(set);
}

export const deleteUser = () => {
    const remove = createActions(EnumActionType.DELETE_USER, null);
      store.dispatch(remove);
}
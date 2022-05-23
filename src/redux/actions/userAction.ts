import { EnumWriteAnAnswer } from "../actionTypes";
import createActions from "../createActions";
import { store } from "../reducer";

export const setUser = (user: string) => {
    const set = createActions(EnumWriteAnAnswer.SET_USER, {
        user
      });
      store.dispatch(set);
}

export const deleteUser = () => {
    const remove = createActions(EnumWriteAnAnswer.DELETE_USER, null);
      store.dispatch(remove);
}
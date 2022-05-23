import { EnumWriteAnAnswer } from "../actionTypes";
import createActions from "../createActions";
import { store } from "../reducer";

export const setToken = (token: string) => {
    const set = createActions(EnumWriteAnAnswer.SET_TOKEN, {
        token
      });
      store.dispatch(set);
}

export const deleteToken = () => {
    const remove = createActions(EnumWriteAnAnswer.DELETE_TOKEN, null);
      store.dispatch(remove);
}
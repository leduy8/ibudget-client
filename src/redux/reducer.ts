import { combineReducers, createStore } from "redux";
import tokenState from "./token";
import userState from "./user";
const rootReducer = combineReducers({
  tokenState,
  userState
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

export const store = createStore(rootReducer);

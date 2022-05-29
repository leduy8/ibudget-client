import { combineReducers, createStore } from "redux";
import tokenState from "./token";
import userState from "./user";
import dateRangeState from "./dateRange";

const rootReducer = combineReducers({
  tokenState,
  userState,
  dateRangeState,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

export const store = createStore(rootReducer);

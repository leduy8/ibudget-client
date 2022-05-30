import { combineReducers, createStore } from "redux";
import tokenState from "./token";
import userState from "./user";
import dateRangeState from "./dateRange";
import focusWalletState from './focusWallet';
import walletListState from './walletList';

const rootReducer = combineReducers({
  tokenState,
  userState,
  dateRangeState,
  focusWalletState,
  walletListState,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

export const store = createStore(rootReducer);

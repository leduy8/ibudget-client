import { combineReducers, createStore } from "redux";
import tokenState from "./token";
import userState from "./user";
import dateRangeState from "./dateRange";
import focusWalletState from './focusWallet';
import walletListState from './walletList';
import updateSignalState from './updateSignal';
import focusTransactionState from './focusTransaction';

const rootReducer = combineReducers({
  tokenState,
  userState,
  dateRangeState,
  focusWalletState,
  focusTransactionState,
  walletListState,
  updateSignalState,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

export const store = createStore(rootReducer);

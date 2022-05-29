import { EnumActionType } from "../actionTypes";
import createActions from "../createActions";
import { store } from "../reducer";

export const setDateRange = (dateRange: object) => {
    const set = createActions(EnumActionType.SET_DATE_RANGE, {
        dateRange
      });
      store.dispatch(set);
}
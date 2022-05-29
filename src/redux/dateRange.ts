import { EnumActionType } from "./actionTypes";
import { getMonthsAndNBefore } from "../ultils/date";

const initValue = {
  dateRange: getMonthsAndNBefore(4),
};

const dateRange = (state = initValue, action: any) => {
  switch (action.type) {
    case EnumActionType.SET_DATE_RANGE: 
    return {
      ...state,
      dateRange: action.dateRange
    }
    default:
      return state;
  }
};

export default dateRange;

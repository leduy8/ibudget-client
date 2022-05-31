import { EnumActionType } from "./actionTypes";

const initValue = {
  updateSignal: false,
};

const updateSignal = (state = initValue, action: any) => {
  switch (action.type) {
    case EnumActionType.SET_UPDATE_SIGNAL: 
    return {
      ...state,
      updateSignal: action.updateSignal
    }
    default:
      return state;
  }
};

export default updateSignal;

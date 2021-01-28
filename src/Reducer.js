export const initialState = {
  login: null,
};
export const stateawal = {
  STATE_AWAL: "STATE_AWAL",
};
export const reducer = (state, action) => {
  switch (action.type) {
    case stateawal.STATE_AWAL:
      return { ...state, login: action.login };
    default:
      return state;
  }
};

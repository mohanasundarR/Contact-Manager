const initialState = {
  appDrawerOpen: false,
};
const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "APP_DRAWER_TOGGLE":
      return { ...state, ...{ appDrawerOpen: action.data } };
    default:
      return state;
  }
};
export default CommonReducer;

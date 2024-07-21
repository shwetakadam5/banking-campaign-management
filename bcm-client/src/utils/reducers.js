import { TOGGLE_THEME } from "./actions";

//  dispatch({ type: TOGGLE_THEME, payload: state.darkTheme })
export const reducer = (state, action) => {
  console.log(action.payload);
  console.log(state);
  const newDarkTheme = !action.payload;
  switch (action.type) {
    case TOGGLE_THEME: {
      return {
        ...state,
        darkTheme: newDarkTheme,
      };
    }
    default:
      return state;
  }
};

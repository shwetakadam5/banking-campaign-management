import { TOGGLE_THEME, SET_USER } from "./actions";

//  dispatch({ type: TOGGLE_THEME, payload: state.darkTheme })
export const reducer = (state, action) => {
  console.log({ ...action.payload });
  console.log(state);

  const newDarkTheme = !action.payload;
  switch (action.type) {
    case TOGGLE_THEME: {
      return {
        ...state,
        darkTheme: newDarkTheme,
      };
    }
    case SET_USER: {
      // Sets the auth user details in global context after login
      return {
        ...state,
        authAppUserDetail: {
          appUserEmail: action.payload.appUserEmail,
          appUserRole: action.payload.appUserRole,
          appUserFullName: action.payload.appUserFullName,
          // ...action.payload,//updates all the user details
        },
      };
    }
    default:
      return state;
  }
};

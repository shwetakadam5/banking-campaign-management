import { createContext, useReducer, useContext } from "react";
// Import our reducer
import { reducer } from "./reducers";

//Initilized a new context for the App.
const GlobalAppContext = createContext();

//Created a custom hook to provide immediate use of the the globalappcontext in other components.
export const useGlobalAppContext = () => useContext(GlobalAppContext);

//GlobalAppProvider is a function that will return a provider component that makes global state available.
export const GlobalAppProvider = (props) => {
  const darkTheme = true;

  // Set up our useReducer hook. Accepts two arguments - the reducer and an initial state
  const [state, dispatch] = useReducer(reducer, { darkTheme });

  return <GlobalAppContext.Provider value={[state, dispatch]} {...props} />;
};

// export default GlobalAppProvider;

import HomeReducer from "./HomeReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  homeText: null,
  isFetching: false,
  error: false,
};

export const HomeContext = createContext(INITIAL_STATE);

export const HomeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HomeReducer, INITIAL_STATE);

  return (
    <HomeContext.Provider
      value={{
        homeText: state.homeText,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
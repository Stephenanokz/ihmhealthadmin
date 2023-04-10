import ServiceReducer from "./ServiceReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  services: [],
  isFetching: false,
  error: false,
};

export const ServiceContext = createContext(INITIAL_STATE);

export const ServiceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ServiceReducer, INITIAL_STATE);

  return (
    <ServiceContext.Provider
      value={{
        services: state.services,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
import React, { useEffect, useReducer, useContext, createContext } from "react";
import reducer from "../store/reducers";
import { setUserDocuments } from "../store/actions";
import { INITIAL_STATE } from "../store/state";
import { useAuth } from "../utils/auth";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const userState = useProvideUserState();
  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};

export const useUserState = () => {
  return useContext(UserContext);
};

const useProvideUserState = () => {
  const { user } = useAuth();
  const [documentState, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (user) {
      dispatch(setUserDocuments(user.documents));
    }
  }, []);

  return { documentState, dispatch };
};

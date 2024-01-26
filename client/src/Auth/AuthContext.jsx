import { createContext, useContext, useReducer } from 'react';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, isAuthenticated: true, userId: action.payload };
    case 'logout':
      return { ...state, isAuthenticated: false, userId: null };
    default:
      return state;
  }
};

export  const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    userId: null,
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

export const login = (userId) => {
    return {
      type: 'LOGIN',
      payload: userId,
    };
  };
  
 
  export const logout = () => {
    return {
      type: 'LOGOUT',
    };
  };
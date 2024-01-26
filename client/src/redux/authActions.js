export const login = (userId) => {
    localStorage.setItem('userId', userId);
    return {
      type: 'LOGIN',
      payload: userId,
    };
  };
  
  export const logout = () => {
    localStorage.removeItem('userId');
    return {
      type: 'LOGOUT',
    };
  };
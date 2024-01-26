const initialState = {
    isAuthenticated: false,
    userId: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, isAuthenticated: true, userId: action.payload };
      case 'LOGOUT':
        return { ...state, isAuthenticated: false, userId: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
  
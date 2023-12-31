export const setAuthenticated = (isAuthenticated) => {
    return {
      type: 'SET_AUTHENTICATED',
      payload: isAuthenticated,
    };
  };
export   const removeAuthentication = () => {
    return {
      type: 'REMOVE_AUTHENTICATION',
    };
  };
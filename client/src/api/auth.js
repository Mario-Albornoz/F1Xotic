
// Store token in localStorage 
export const storeToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Get token 
  export const getToken = () => {
    const token = localStorage.getItem('token');
    console.log("Retrieved Token:", token); 
    return token
  };
  
  // Remove token 
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  // Check if token exists or expired
  export const isTokenValid = () => {
    const token = getToken();
    if (!token) return false;
  
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode token payload
      const expirationTime = decoded.exp * 1000; // Token expiration in milliseconds
      return Date.now() < expirationTime; // Check if token is expired
    } catch (error) {
      return false; // Invalid token or decoding error
    }
  };
  
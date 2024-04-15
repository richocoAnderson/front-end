// authService.js
export const login = async (email, password) => {
    const apiUrl = 'http://localhost:8080/login';
    const apiKey = 'sayaLaparBang123';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({ email, password })
      });
  
      if (response.ok) {
        const data = await response.json();
        const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours
        localStorage.setItem('token', data.token);
        localStorage.setItem('expirationTime', expirationTime);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };
  
  export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');
    return token !== null && expirationTime !== null && new Date().getTime() < parseInt(expirationTime);
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
  };
  
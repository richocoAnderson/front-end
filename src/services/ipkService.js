const fetchIPKs = async () => {
    try {
      const apiKey = 'sayaLaparBang123'; // Ganti dengan API key Anda
      const response = await fetch('http://localhost:8080/getAllIPK', {
        method: 'GET',
        headers: {
          'x-api-key': apiKey // Gunakan API key sebagai header x-api-key
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching IPK data:', error);
      throw new Error('Failed to fetch IPK data');
    }
  };

  const fetchIPKByNIM = async (nim) => {
    try {
      const apiKey = 'sayaLaparBang123'; // Ganti dengan API key Anda
      const response = await fetch(`http://localhost:8080/getIPK/${nim}`, {
        method: 'GET',
        headers: {
          'x-api-key': apiKey // Gunakan API key sebagai header x-api-key
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch IPK data by NIM');
      }
  
      return data;
    } catch (error) {
      console.error('Error fetching IPK data by NIM:', error);
      throw new Error(error.message || 'Failed to fetch IPK data by NIM');
    }
  };  
  
  export { fetchIPKs, fetchIPKByNIM  }; // Mengekspor fetchIPKs secara eksplisit
  


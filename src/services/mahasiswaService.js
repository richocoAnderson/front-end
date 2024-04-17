const addMahasiswa = async (nim, nama, jurusan, jenisKelamin) => {
    try {
      const apiKey = 'sayaLaparBang123'; // Ganti dengan API key Anda
      const mahasiswaData = {
        nim,
        nama,
        jurusan,
        jenisKelamin
      };
  
      const response = await fetch('https://pengujianperangkatlunak2024-chcivh4gzq-et.a.run.app/addMahasiswa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey // Gunakan API key sebagai header x-api-key
        },
        body: JSON.stringify(mahasiswaData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding mahasiswa:', error);
      throw new Error('Failed to add mahasiswa');
    }
  };

  const DisplayMahasiswa = async () => {
    try {
      const apiKey = 'sayaLaparBang123'; // Ganti dengan API key Anda
      const response = await fetch('http://localhost:8080/displayAllMahasiswa', {
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


  export {addMahasiswa, DisplayMahasiswa};
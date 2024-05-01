const addMatakuliah = async (mataKuliah, sks, jenisMk, semesterMk) => {
    try {
      const apiKey = 'sayaLaparBang123'; // Ganti dengan API key Anda
      const matakuliahData = {
        mataKuliah,
        sks,
        jenisMk,
        semesterMk
      };
  
      const response = await fetch('https://asia-southeast2-pengujianperangkatlunak2024.cloudfunctions.net/api-backend/ipk/mata-kuliah', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey // Gunakan API key sebagai header x-api-key
        },
        body: JSON.stringify(matakuliahData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding matakuliah:', error);
      throw new Error('Failed to add matakuliah');
    }
  };

const DisplayMatkul = async () => {
    try {
      const apiKey = 'sayaLaparBang123'; // Ganti dengan API key Anda
      const response = await fetch('https://asia-southeast2-pengujianperangkatlunak2024.cloudfunctions.net/api-backend/ipk/liat-mata-kuliah', {
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
  
  export { addMatakuliah, DisplayMatkul };
  
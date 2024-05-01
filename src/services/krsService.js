const addKRS = async (kodeMk, semesterKRS, nim, nilai, sks) => {
    try {
      const apiKey = 'sayaLaparBang123'; // Ganti dengan API key Anda
      const krsData = {
        kodeMk,
        semesterKRS,
        nim,
        nilai:parseInt(nilai),
        sks
      };
  
      const response = await fetch('https://asia-southeast2-pengujianperangkatlunak2024.cloudfunctions.net/api-backend/krs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey // Gunakan API key sebagai header x-api-key
        },
        body: JSON.stringify(krsData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding KRS:', error);
      throw new Error('Failed to add KRS');
    }
  };
  
  export { addKRS };
  
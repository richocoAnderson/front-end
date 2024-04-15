import React, { useState } from 'react';
import { fetchIPKByNIM } from '../services/ipkService';
import LogoutButton from '../components/LogoutButton'; // Import LogoutButton dari file yang sesuai

const IPKPageByNIM = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setUserId(event.target.value);
  };

  const fetchData = async () => {
    try {
      const data = await fetchIPKByNIM(userId);
      setUserData(data);
      setError(null); // Bersihkan pesan kesalahan jika ada
    } catch (error) {
      setError(error.message); // Tangkap dan set pesan kesalahan
      setUserData(null); // Hapus data pengguna saat terjadi kesalahan
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div>
      <LogoutButton /> {/* Tambahkan tombol logout di sini */}
      <form onSubmit={handleSubmit}>
        <label>
          Masukkan NIM:
          <input type="text" value={userId} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {userData ? (
        <div>
          <h1>Data IPK</h1>
          <p>Nama: {userData[0].nama}</p>
          <p>IPK: {userData[0].ipk}</p>
        </div>
      ) : (
        <p>Input NIM dan tekan Submit untuk melihat data IPK.</p>
      )}
    </div>
  );
};

export default IPKPageByNIM;

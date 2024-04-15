import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { addMahasiswa } from '../services/mahasiswaService';
import Alert from '@mui/material/Alert';

const AddMahasiswaPage = () => {
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [jurusan, setJurusan] = useState('Teknologi Informasi');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false); // state tambahan untuk mengontrol visibilitas alert

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await addMahasiswa(nim, nama, jurusan, jenisKelamin);
      setSuccessMessage('Mahasiswa berhasil ditambahkan.');
      setError('');
      setIsAlertVisible(true); // tampilkan alert
      setTimeout(() => setIsAlertVisible(false), 7000); // atur timer untuk menyembunyikan alert setelah 7 detik
    } catch (error) {
      setError('Gagal menambahkan mahasiswa.');
      setSuccessMessage('');
      setIsAlertVisible(true);
      setTimeout(() => setIsAlertVisible(false), 7000);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
      }}
    >
      <Box
        component="form"
        sx={{
          textAlign: 'center',
          '& > *': {
            my: 5,
          },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1>Tambah Mahasiswa</h1>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="NIM"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              required
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Jurusan"
              value={jurusan}
              onChange={(e) => setJurusan(e.target.value)}
              required
              helperText="Select Jurusan"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="Sastra Mesin">Sastra Mesin</MenuItem>
              <MenuItem value="Ilmu Komputer">Ilmu Komputer</MenuItem>
              <MenuItem value="Teknik Informatika">Teknik Informatika</MenuItem>
              <MenuItem value="Teknologi Informasi">Teknologi Informasi</MenuItem>
              <MenuItem value="Sistem Informasi">Sistem Informasi</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              variant="outlined"
              fullWidth
            />
          </Grid>
    
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Jenis Kelamin</FormLabel>
              <RadioGroup
                aria-label="jenisKelamin"
                name="jenisKelamin"
                value={jenisKelamin}
                onChange={(e) => setJenisKelamin(e.target.value)}
                row
              >
                <FormControlLabel value="Laki-laki" control={<Radio />} label="Laki-laki" />
                <FormControlLabel value="Perempuan" control={<Radio />} label="Perempuan" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Tambah Mahasiswa
        </Button>

        {/* Alert component for success and error messages */}
        {isAlertVisible && (
          <Alert severity={successMessage ? 'success' : 'error'}>
            {successMessage || error}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default AddMahasiswaPage;

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { addKRS } from '../services/krsService';
import { DisplayMahasiswa } from '../services/mahasiswaService';
import { DisplayMatkul } from '../services/matkulService';

const AddKRSPage = () => {
  const [kodeMk, setKodeMk] = useState('');
  const [semesterKRS, setSemesterKRS] = useState('');
  const [nim, setNim] = useState('');
  const [nilai, setNilai] = useState('');
  const [sks, setSks] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [matkulOptions, setMatkulOptions] = useState([]);
  const [mahasiswaOptions, setMahasiswaOptions] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchMatkulOptions = async () => {
      try {
        const data = await DisplayMatkul();
        setMatkulOptions(data.map((matkul) => ({ kodeMk: matkul.kodeMk, nama: matkul.mataKuliah, sks: matkul.sks })));
      } catch (error) {
        console.error('Error fetching mata kuliah data:', error);
        // handle error
      }
    };

    fetchMatkulOptions();
  }, []);

  useEffect(() => {
    const fetchMahasiswaOptions = async () => {
      try {
        const data = await DisplayMahasiswa();
        setMahasiswaOptions(data.map((mahasiswa) => ({ nim: mahasiswa.nim, nama: mahasiswa.nama })));
      } catch (error) {
        console.error('Error fetching mahasiswa data:', error);
        // handle error
      }
    };

    fetchMahasiswaOptions();
  }, []);

  useEffect(() => {
    if (kodeMk) {
      const selectedMatkul = matkulOptions.find((matkul) => matkul.kodeMk === kodeMk);
      if (selectedMatkul) {
        setSks(selectedMatkul.sks);
      }
    }
  }, [kodeMk, matkulOptions]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await addKRS(kodeMk, semesterKRS, nim, nilai, sks);
      setSuccessMessage('KRS berhasil ditambahkan.');
      setError('');
      setIsAlertVisible(true);
      setTimeout(() => setIsAlertVisible(false), 7000);
    } catch (error) {
      setError('Gagal menambahkan KRS.');
      setSuccessMessage('');
      setIsAlertVisible(true);
      setTimeout(() => setIsAlertVisible(false), 7000);
    }
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const filteredMahasiswaOptions = mahasiswaOptions.filter(
    (mahasiswa) =>
      mahasiswa.nim.includes(searchKeyword) ||
      mahasiswa.nama.toLowerCase().includes(searchKeyword.toLowerCase())
  );

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
            my: 2,
          },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1>Tambah KRS</h1>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              select
              label="Kode MK"
              value={kodeMk}
              onChange={(e) => setKodeMk(e.target.value)}
              required
              variant="outlined"
              fullWidth
            >
              {matkulOptions.map((option) => (
                <MenuItem key={option.kodeMk} value={option.kodeMk}>
                  {`${option.kodeMk} - ${option.nama}`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Semester KRS"
              value={semesterKRS}
              onChange={(e) => setSemesterKRS(e.target.value)}
              required
              variant="outlined"
              fullWidth
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={13}>13</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              {/* Tambahkan item menu untuk semester KRS lainnya */}
            </TextField>
          </Grid>
          <Grid item xs={6}>

            <TextField
              select
              label="NIM"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              required
              variant="outlined"
              fullWidth
            >
              {filteredMahasiswaOptions.map((mahasiswa) => (
                <MenuItem key={mahasiswa.nim} value={mahasiswa.nim}>
                  {`${mahasiswa.nim} - ${mahasiswa.nama}`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Nilai"
              value={nilai}
              onChange={(e) => {
                // Mengambil nilai yang dimasukkan
                const inputValue = e.target.value;

                // Memastikan nilai yang dimasukkan adalah angka antara 1 hingga 100
                if (inputValue === '' || (inputValue >= 1 && inputValue <= 100)) {
                  setNilai(inputValue);
                }
              }}
              required
              variant="outlined"
              fullWidth
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min: 1,  // Nilai minimum
                max: 100,  // Nilai maksimum
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="SKS"
              value={sks}
              onChange={(e) => setSks(e.target.value)}
              required
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Tambah KRS
        </Button>

        {isAlertVisible && (
          <Alert severity={successMessage ? 'success' : 'error'}>
            {successMessage || error}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default AddKRSPage;

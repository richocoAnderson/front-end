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
import { addMatakuliah } from '../services/matkulService'; // Import addMatakuliah from your service
import Alert from '@mui/material/Alert';

const AddMatakuliahPage = () => {
  const [mataKuliah, setMataKuliah] = useState('');
  const [sks, setSks] = useState('');
  const [jenisMk, setJenisMk] = useState('Wajib'); // Default value Wajib
  const [semesterMk, setSemesterMk] = useState('1'); // Default value 1
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await addMatakuliah(mataKuliah, sks, jenisMk, semesterMk);
      setSuccessMessage('Mata kuliah berhasil ditambahkan.');
      setError('');
      setIsAlertVisible(true);
      setTimeout(() => setIsAlertVisible(false), 7000);
    } catch (error) {
      setError('Gagal menambahkan mata kuliah.');
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
        <h1>Tambah Mata Kuliah</h1>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Mata Kuliah"
              value={mataKuliah}
              onChange={(e) => setMataKuliah(e.target.value)}
              required
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="SKS"
              value={sks}
              onChange={(e) => setSks(e.target.value)}
              required
              helperText="Select SKS"
              variant="outlined"
              fullWidth
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Jenis MK</FormLabel>
              <RadioGroup
                aria-label="jenisMk"
                name="jenisMk"
                value={jenisMk}
                onChange={(e) => setJenisMk(e.target.value)}
                row
              >
                <FormControlLabel value="Wajib" control={<Radio />} label="Wajib" />
                <FormControlLabel value="Pilihan" control={<Radio />} label="Pilihan" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Semester MK"
              value={semesterMk}
              onChange={(e) => setSemesterMk(e.target.value)}
              required
              helperText="Select Semester MK"
              variant="outlined"
              fullWidth
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              {/* Add more semesters as needed */}
            </TextField>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Tambah Mata Kuliah
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

export default AddMatakuliahPage;

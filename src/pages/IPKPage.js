import React, { useEffect, useState } from 'react';
import { fetchIPKs } from '../services/ipkService';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const IPKPages = () => {
  const [ipkList, setIpkList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getIPKs = async () => {
      try {
        const data = await fetchIPKs();
        setIpkList(data);
      } catch (error) {
        // Handle error
      }
    };

    getIPKs();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  
  // Filtering data based on search term
  const filteredIpkList = ipkList.filter((ipk) =>
    ipk.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Daftar IPK Mahasiswa</h1>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />
      <CustomizedTables
        ipkList={filteredIpkList}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

function CustomizedTables({
  ipkList,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    maxHeight: '80vh', // Set maximum height of modal content
    overflowY: 'auto', // Enable vertical scroll if content exceeds modal height
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState(null);

  const handleOpen = (data) => {
    setSelectedData(data);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DialogTitle id="modal-modal-title">Detail Mahasiswa</DialogTitle>
          <DialogContent dividers>
            {selectedData && (
              <>
                <DialogContentText id="modal-modal-description">
                  NIM: {selectedData.nim}
                </DialogContentText>
                <DialogContentText id="modal-modal-description">
                  Nama: {selectedData.nama}
                </DialogContentText>
                <DialogContentText id="modal-modal-description">
                  Jurusan: {selectedData.jurusan}
                </DialogContentText>
                <DialogContentText id="modal-modal-description">
                  IPK: {selectedData.ipk}
                </DialogContentText>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Mata Kuliah Diambil:
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Kode MK</TableCell>
                        <TableCell>Mata Kuliah</TableCell>
                        <TableCell>Jenis MK</TableCell>
                        <TableCell>SKS MK</TableCell>
                        <TableCell>Nilai Bobot</TableCell>
                        <TableCell>Nilai</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedData.matkulDiambil.map((matkul, index) => (
                        <TableRow key={index}>
                          <TableCell>{matkul.kodeMk}</TableCell>
                          <TableCell>{matkul.matkul}</TableCell>
                          <TableCell>{matkul.jenisMk}</TableCell>
                          <TableCell>{matkul.sksMk}</TableCell>
                          <TableCell>{matkul.nilaBobot}</TableCell>
                          <TableCell>{matkul.nilai}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </DialogContent>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>NIM</StyledTableCell>
              <StyledTableCell>Nama</StyledTableCell>
              <StyledTableCell>Jurusan</StyledTableCell>
              <StyledTableCell>IPK</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ipkList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ipk, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {(page * rowsPerPage) + index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{ipk.nim}</StyledTableCell>
                  <StyledTableCell>{ipk.nama}</StyledTableCell>
                  <StyledTableCell>{ipk.jurusan}</StyledTableCell>
                  <StyledTableCell>{ipk.ipk ? ipk.ipk : "0"}</StyledTableCell>
                  <StyledTableCell>
                  <Button onClick={() => handleOpen(ipk)}>
                      <OpenInNewIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={ipkList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}



export default IPKPages;

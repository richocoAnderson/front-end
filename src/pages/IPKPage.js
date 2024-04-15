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
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>NIM</StyledTableCell>
              <StyledTableCell>Nama</StyledTableCell>
              <StyledTableCell>Jurusan</StyledTableCell>
              <StyledTableCell>IPK</StyledTableCell>
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
                  <StyledTableCell>{ipk.ipk}</StyledTableCell>
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

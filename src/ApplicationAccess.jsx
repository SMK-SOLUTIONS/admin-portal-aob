import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import data from './mockApplications.json';

const ApplicationAccess = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    setApplications(data);
  }, []);

  const filterByDate = (dateStr) => {
    const date = new Date(dateStr);
    return (!startDate || date >= new Date(startDate)) &&
           (!endDate || date <= new Date(endDate));
  };

  const filteredApps = applications.filter(app =>
    (app.appNo.toLowerCase().includes(search.toLowerCase()) ||
     app.partner.toLowerCase().includes(search.toLowerCase())) &&
    filterByDate(app.dateSubmitted)
  );

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredApps);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Applications');
    XLSX.writeFile(wb, 'ApplicationList.xlsx');
  };

  const getCellStyle = (date) => ({
    backgroundColor: date ? '#eaf3fc' : '#fdecea',
    padding: '8px',
    border: '1px solid #ccc',
  });

  return (
    <Box p={4} sx={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Typography variant="h5" mb={3}>
        Application Access
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search by App No or Partner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        onClick={exportToExcel}
        sx={{ backgroundColor: '#034ea2', mb: 3 }}
      >
        Export to Excel
      </Button>

      <Paper sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#eaf3fc' }}>
            <TableRow>
              {[
                'App No', 'Partner', 'Submitted',
                'CH', 'BH', 'Finance', 'Channel', 'Legal',
                'Partner E-sign', 'Legal Head E-sign', 'SAP', 'Code'
              ].map(col => (
                <TableCell key={col}><strong>{col}</strong></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApps.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.appNo}</TableCell>
                <TableCell>{row.partner}</TableCell>
                <TableCell>{row.dateSubmitted}</TableCell>
                <TableCell sx={getCellStyle(row.chApproval)}>{row.chApproval || '-'}</TableCell>
                <TableCell sx={getCellStyle(row.bhApproval)}>{row.bhApproval || '-'}</TableCell>
                <TableCell sx={getCellStyle(row.finance)}>{row.finance || '-'}</TableCell>
                <TableCell sx={getCellStyle(row.channel)}>{row.channel || '-'}</TableCell>
                <TableCell sx={getCellStyle(row.legal)}>{row.legal || '-'}</TableCell>
                <TableCell sx={getCellStyle(row.partnerEsign)}>{row.partnerEsign || '-'}</TableCell>
                <TableCell sx={getCellStyle(row.legalHeadEsign)}>{row.legalHeadEsign || '-'}</TableCell>
                <TableCell sx={getCellStyle(row.sap)}>{row.sap || '-'}</TableCell>
                <TableCell sx={getCellStyle(row.codeCreation)}>{row.codeCreation || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ApplicationAccess;

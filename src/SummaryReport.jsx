import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { useState } from 'react';
import * as XLSX from 'xlsx';

const initialData = [
  {
    region: 'North 1',
    chName: 'ABC',
    logins: 12,
    ch: 10,
    bh: 10,
    finance: 8,
    channel: 7,
    legal: 5,
    partnerEsign: 3,
    legalHeadEsign: 3,
    sap: 2,
    codeCreation: 2,
    month: '2025-05'
  },
  {
    region: 'North 1',
    chName: 'DEF',
    logins: 8,
    ch: 5,
    bh: 4,
    finance: 4,
    channel: 3,
    legal: 2,
    partnerEsign: 1,
    legalHeadEsign: 0,
    sap: 0,
    codeCreation: 0,
    month: '2025-05'
  }
];

const SummaryReport = () => {
  const [data, setData] = useState(initialData);
  const [filterMonth, setFilterMonth] = useState('');

  const filteredData = filterMonth
    ? data.filter(d => d.month === filterMonth)
    : data;

  const totals = filteredData.reduce((acc, row) => {
    Object.keys(row).forEach(key => {
      if (typeof row[key] === 'number') {
        acc[key] = (acc[key] || 0) + row[key];
      }
    });
    return acc;
  }, {});

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Summary');
    XLSX.writeFile(wb, 'SummaryReport.xlsx');
  };

  return (
    <Box p={4} sx={{ bgcolor: '#f9fafb', minHeight: '100vh' }}>
      <Typography variant="h5" mb={3}>
        Monthly Region-wise Application Approval Summary
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <TextField
          label="Filter by Month"
          type="month"
          size="small"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: '#034ea2' }}
          onClick={exportToExcel}
        >
          Export to Excel
        </Button>
      </Box>

      <Paper sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#eaf3fc' }}>
            <TableRow>
              {[
                'Region', 'CH Name', 'Logins', 'CH', 'BH', 'Finance',
                'Channel', 'Legal', 'Partner E-sign', 'Legal Head E-sign', 'SAP', 'Code'
              ].map(col => (
                <TableCell key={col}><strong>{col}</strong></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.region}</TableCell>
                <TableCell>{row.chName}</TableCell>
                <TableCell>{row.logins}</TableCell>
                <TableCell>{row.ch}</TableCell>
                <TableCell>{row.bh}</TableCell>
                <TableCell>{row.finance}</TableCell>
                <TableCell>{row.channel}</TableCell>
                <TableCell>{row.legal}</TableCell>
                <TableCell>{row.partnerEsign}</TableCell>
                <TableCell>{row.legalHeadEsign}</TableCell>
                <TableCell>{row.sap}</TableCell>
                <TableCell>{row.codeCreation}</TableCell>
              </TableRow>
            ))}

            {filteredData.length > 0 && (
              <TableRow sx={{ backgroundColor: '#eaf3fc', fontWeight: 'bold' }}>
                <TableCell colSpan={2}><strong>Total</strong></TableCell>
                <TableCell>{totals.logins || 0}</TableCell>
                <TableCell>{totals.ch || 0}</TableCell>
                <TableCell>{totals.bh || 0}</TableCell>
                <TableCell>{totals.finance || 0}</TableCell>
                <TableCell>{totals.channel || 0}</TableCell>
                <TableCell>{totals.legal || 0}</TableCell>
                <TableCell>{totals.partnerEsign || 0}</TableCell>
                <TableCell>{totals.legalHeadEsign || 0}</TableCell>
                <TableCell>{totals.sap || 0}</TableCell>
                <TableCell>{totals.codeCreation || 0}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default SummaryReport;

import { useState } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const rawData = [
  {
    appNo: 'ABC0001',
    partner: 'ABC',
    submitted: '2025-05-02',
    approvals: ['2025-05-03', '2025-05-03', '2025-05-04', '2025-05-06', '2025-05-09', '2025-05-12', '2025-05-12', '2025-05-14', '2025-05-14']
  },
  {
    appNo: 'ABC0002',
    partner: 'DEF',
    submitted: '2025-05-03',
    approvals: ['2025-05-03', '2025-05-04', '2025-05-06', '2025-05-09', '2025-05-12', '2025-05-12', '2025-05-14', '2025-05-15', '2025-05-15']
  }
];

const headers = ['App No', 'Partner', 'Submitted', 'CH', 'BH', 'Fin', 'Channel', 'Legal', 'PE-sign', 'LH-esign', 'SAP', 'Code'];

const DetailedApplicationReport = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [partnerFilter, setPartnerFilter] = useState('');

  const filteredData = rawData.filter(row => {
    const date = new Date(row.submitted);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    return (
      (!partnerFilter || row.partner.toLowerCase().includes(partnerFilter.toLowerCase())) &&
      (!from || date >= from) &&
      (!to || date <= to)
    );
  });

  return (
    <div className="p-6">
      <Typography variant="h5" mb={3}>
        Detailed Application Report
      </Typography>

      <Grid container spacing={2} className="mb-4">
        <Grid item xs={12} sm={3}>
          <TextField
            label="From Date"
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="To Date"
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Partner Name"
            value={partnerFilter}
            onChange={e => setPartnerFilter(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper} className="shadow">
        <Table size="small">
          <TableHead>
            <TableRow className="bg-[#eaf3fc]">
              {headers.map((h, idx) => (
                <TableCell key={idx}>
                  <strong>{h}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.appNo}</TableCell>
                <TableCell>{row.partner}</TableCell>
                <TableCell>{row.submitted}</TableCell>
                {row.approvals.map((date, i) => (
                  <TableCell key={i}>{date}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetailedApplicationReport;

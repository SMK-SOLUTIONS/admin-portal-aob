import { useState } from 'react';
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  Grid
} from '@mui/material';

const rawStampData = [
  {
    number: 'STP123456',
    partnerName: 'ABC',
    partnerCode: 'PC001',
    procured: '2025-05-01',
    eSigned: '2025-05-05'
  },
  {
    number: 'STP123457',
    partnerName: 'DEF',
    partnerCode: 'PC002',
    procured: '2025-05-02',
    eSigned: '2025-05-06'
  }
];

const StampPaperReport = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [partnerFilter, setPartnerFilter] = useState('');

  const filtered = rawStampData.filter(row => {
    const date = new Date(row.procured);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    return (
      (!partnerFilter || row.partnerName.toLowerCase().includes(partnerFilter.toLowerCase())) &&
      (!from || date >= from) &&
      (!to || date <= to)
    );
  });

  return (
    <div className="p-6">
      <Typography variant="h5" mb={3}>
        Stamp Paper Consumption Report
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
              <TableCell><strong>Stamp No</strong></TableCell>
              <TableCell><strong>Partner Name</strong></TableCell>
              <TableCell><strong>Partner Code</strong></TableCell>
              <TableCell><strong>Procurement Date</strong></TableCell>
              <TableCell><strong>E-sign Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.number}</TableCell>
                <TableCell>{row.partnerName}</TableCell>
                <TableCell>{row.partnerCode}</TableCell>
                <TableCell>{row.procured}</TableCell>
                <TableCell>{row.eSigned}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StampPaperReport;

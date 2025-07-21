import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

const chData = [
  { bde: 'BDE1', logins: 5, ch: 4, bh: 4, fin: 3, channel: 2, legal: 2, peSign: 1, lhEsign: 1, sap: 1, code: 1 },
  { bde: 'BDE2', logins: 3, ch: 3, bh: 2, fin: 2, channel: 1, legal: 1, peSign: 0, lhEsign: 0, sap: 0, code: 0 }
];

const headers = ['BDE', 'Logins', 'CH', 'BH', 'Fin', 'Channel', 'Legal', 'PE-sign', 'LH-esign', 'SAP', 'Code'];

const CHDashboard = () => {
  return (
    <div className="p-6">
      <Typography variant="h5" mb={3}>
        CH Dashboard - BDE Summary
      </Typography>

      <TableContainer component={Paper} className="shadow">
        <Table size="small">
          <TableHead>
            <TableRow className="bg-[#eaf3fc]">
              {headers.map((h, i) => (
                <TableCell key={i}>
                  <strong>{h}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {chData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.bde}</TableCell>
                <TableCell>{row.logins}</TableCell>
                <TableCell>{row.ch}</TableCell>
                <TableCell>{row.bh}</TableCell>
                <TableCell>{row.fin}</TableCell>
                <TableCell>{row.channel}</TableCell>
                <TableCell>{row.legal}</TableCell>
                <TableCell>{row.peSign}</TableCell>
                <TableCell>{row.lhEsign}</TableCell>
                <TableCell>{row.sap}</TableCell>
                <TableCell>{row.code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CHDashboard;

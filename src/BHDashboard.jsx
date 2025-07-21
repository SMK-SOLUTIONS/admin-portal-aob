import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const bhData = [
  { ch: 'CH1', logins: 8, chApp: 7, bh: 6, fin: 6, channel: 4, legal: 3, peSign: 3, lhEsign: 2, sap: 2, code: 2 },
  { ch: 'CH2', logins: 6, chApp: 5, bh: 5, fin: 3, channel: 2, legal: 1, peSign: 1, lhEsign: 1, sap: 0, code: 0 }
];

const headers = ['CH', 'Logins', 'CH App', 'BH', 'Fin', 'Channel', 'Legal', 'PE-sign', 'LH-esign', 'SAP', 'Code'];

const BHDashboard = () => {
  return (
    <div className="p-6">
      <Typography variant="h5" mb={3}>
        BH Dashboard - CH Summary
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
            {bhData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.ch}</TableCell>
                <TableCell>{row.logins}</TableCell>
                <TableCell>{row.chApp}</TableCell>
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

export default BHDashboard;

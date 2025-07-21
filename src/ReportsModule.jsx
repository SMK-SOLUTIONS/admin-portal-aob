
import { useState } from 'react';

const originalData = [
  { region: 'North 1', chName: 'ABC', logins: 12, ch: 10, bh: 10, fin: 8, channel: 7, legal: 5, peSign: 3, lhEsign: 3, sap: 2, code: 2 },
  { region: 'North 1', chName: 'DEF', logins: 8, ch: 5, bh: 4, fin: 4, channel: 3, legal: 2, peSign: 1, lhEsign: 0, sap: 0, code: 0 },
  { region: 'South', chName: 'XYZ', logins: 6, ch: 4, bh: 3, fin: 3, channel: 2, legal: 1, peSign: 1, lhEsign: 1, sap: 1, code: 1 }
];

const HeadersList = ['Region', 'CH Name', 'Logins', 'CH', 'BH', 'Fin', 'Channel', 'Legal', 'PE-sign', 'LH-esign', 'SAP', 'Code']

const ReportsModule = () => {
  const [regionFilter, setRegionFilter] = useState('');

  const filteredData = originalData.filter(row => {
    return (!regionFilter || row.region === regionFilter);
  });

  const exportToExcel = () => {
    const rows = [
      HeadersList,
      ...filteredData.map(row => [
        row.region, row.chName, row.logins, row.ch, row.bh, row.fin,
        row.channel, row.legal, row.peSign, row.lhEsign, row.sap, row.code
      ])
    ];
    const csvContent = rows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'report_summary_filtered.csv';
    link.click();
  };

  const uniqueRegions = [...new Set(originalData.map(r => r.region))];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Region-wise Application Summary</h2>

      <div className="flex gap-4 mb-4">
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Regions</option>
          {uniqueRegions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <table className="w-full border text-sm mb-4">
        <thead>
          <tr className="bg-[#eaf3fc]">
            {HeadersList.map((h) => (
              <th key={h} className="border p-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={`${row.region}-${row.chName}`}>
              <td className="border p-2">{row.region}</td>
              <td className="border p-2">{row.chName}</td>
              <td className="border p-2">{row.logins}</td>
              <td className="border p-2">{row.ch}</td>
              <td className="border p-2">{row.bh}</td>
              <td className="border p-2">{row.fin}</td>
              <td className="border p-2">{row.channel}</td>
              <td className="border p-2">{row.legal}</td>
              <td className="border p-2">{row.peSign}</td>
              <td className="border p-2">{row.lhEsign}</td>
              <td className="border p-2">{row.sap}</td>
              <td className="border p-2">{row.code}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={exportToExcel} className="bg-[#eaf3fc] text-white px-4 py-2 rounded">Export Filtered to Excel</button>
    </div>
  );
};

export default ReportsModule;

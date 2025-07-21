
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
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
      <h1 className="text-2xl font-semibold mb-4">Monthly Region-wise Application Approval Summary</h1>

      <div className="flex items-center space-x-4 mb-4">
        <label className="text-sm font-medium">Filter by Month:</label>
        <input
          type="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button onClick={exportToExcel} className="bg-[#034ea2] text-white px-4 py-2 rounded hover:bg-[#034da296]">Export to Excel</button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-[#eaf3fc]">
            <tr>
              {['Region', 'CH Name', 'Logins', 'CH', 'BH', 'Finance', 'Channel', 'Legal', 'Partner E-sign', 'Legal Head E-sign', 'SAP', 'Code'].map(col => (
                <th key={col} className="border p-2 text-left">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i} className="bg-white border-t">
                <td className="border p-2">{row.region}</td>
                <td className="border p-2">{row.chName}</td>
                <td className="border p-2">{row.logins}</td>
                <td className="border p-2">{row.ch}</td>
                <td className="border p-2">{row.bh}</td>
                <td className="border p-2">{row.finance}</td>
                <td className="border p-2">{row.channel}</td>
                <td className="border p-2">{row.legal}</td>
                <td className="border p-2">{row.partnerEsign}</td>
                <td className="border p-2">{row.legalHeadEsign}</td>
                <td className="border p-2">{row.sap}</td>
                <td className="border p-2">{row.codeCreation}</td>
              </tr>
            ))}
            {filteredData.length > 0 && (
              <tr className="bg-[#eaf3fc] font-semibold">
                <td className="border p-2" colSpan={2}>Total</td>
                <td className="border p-2">{totals.logins}</td>
                <td className="border p-2">{totals.ch}</td>
                <td className="border p-2">{totals.bh}</td>
                <td className="border p-2">{totals.finance}</td>
                <td className="border p-2">{totals.channel}</td>
                <td className="border p-2">{totals.legal}</td>
                <td className="border p-2">{totals.partnerEsign}</td>
                <td className="border p-2">{totals.legalHeadEsign}</td>
                <td className="border p-2">{totals.sap}</td>
                <td className="border p-2">{totals.codeCreation}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryReport;

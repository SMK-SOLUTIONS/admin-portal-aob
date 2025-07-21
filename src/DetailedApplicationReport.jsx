
import { useState } from 'react';

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

  const headers = ['App No', 'Partner', 'Submitted', 'CH', 'BH', 'Fin', 'Channel', 'Legal', 'PE-sign', 'LH-esign', 'SAP', 'Code'];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Detailed Application Report</h2>

      <div className="flex gap-4 mb-4">
        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="border px-2 py-1 rounded" />
        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="border px-2 py-1 rounded" />
        <input type="text" placeholder="Partner Name" value={partnerFilter} onChange={e => setPartnerFilter(e.target.value)} className="border px-2 py-1 rounded" />
      </div>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-[#eaf3fc]">{headers.map((h, idx) => <th key={idx} className="border p-2">{h}</th>)}</tr>
        </thead>
        <tbody>
          {filteredData.map((row, idx) => (
            <tr key={idx}>
              <td className="border p-2">{row.appNo}</td>
              <td className="border p-2">{row.partner}</td>
              <td className="border p-2">{row.submitted}</td>
              {row.approvals.map((date, i) => <td key={i} className="border p-2">{date}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailedApplicationReport;

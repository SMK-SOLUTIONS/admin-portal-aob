
import { useState } from 'react';

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
      <h2 className="text-xl font-bold mb-4">Stamp Paper Consumption Report</h2>

      <div className="flex gap-4 mb-4">
        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="border px-2 py-1 rounded" />
        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="border px-2 py-1 rounded" />
        <input type="text" placeholder="Partner Name" value={partnerFilter} onChange={e => setPartnerFilter(e.target.value)} className="border px-2 py-1 rounded" />
      </div>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-[#eaf3fc]">
            <th className="border p-2">Stamp No</th>
            <th className="border p-2">Partner Name</th>
            <th className="border p-2">Partner Code</th>
            <th className="border p-2">Procurement Date</th>
            <th className="border p-2">E-sign Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((row, idx) => (
            <tr key={idx}>
              <td className="border p-2">{row.number}</td>
              <td className="border p-2">{row.partnerName}</td>
              <td className="border p-2">{row.partnerCode}</td>
              <td className="border p-2">{row.procured}</td>
              <td className="border p-2">{row.eSigned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StampPaperReport;

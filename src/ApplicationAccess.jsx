
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
    return (!startDate || date >= new Date(startDate)) && (!endDate || date <= new Date(endDate));
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

  const highlightClass = (date) => {
    return date ? "bg-[#eaf3fc]" : "bg-red-100";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
      <h1 className="text-2xl font-semibold mb-4">Application Access</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Application No or Partner"
          className="p-2 border border-gray-300 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="date"
          className="p-2 border border-gray-300 rounded w-full"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="p-2 border border-gray-300 rounded w-full"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button onClick={exportToExcel} className="mb-4 bg-[#034ea2] text-white px-4 py-2 rounded hover:bg-[#034da296]">
        Export to Excel
      </button>

      <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-[#eaf3fc]">
            <tr>
              {['App No', 'Partner', 'Submitted', 'CH', 'BH', 'Finance', 'Channel', 'Legal', 'Partner E-sign', 'Legal Head E-sign', 'SAP', 'Code'].map(col => (
                <th key={col} className="border p-2 text-left">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((row, i) => (
              <tr key={i} className="bg-white border-t">
                <td className="border p-2">{row.appNo}</td>
                <td className="border p-2">{row.partner}</td>
                <td className="border p-2">{row.dateSubmitted}</td>
                <td className={"border p-2 " + highlightClass(row.chApproval)}>{row.chApproval || '-'}</td>
                <td className={"border p-2 " + highlightClass(row.bhApproval)}>{row.bhApproval || '-'}</td>
                <td className={"border p-2 " + highlightClass(row.finance)}>{row.finance || '-'}</td>
                <td className={"border p-2 " + highlightClass(row.channel)}>{row.channel || '-'}</td>
                <td className={"border p-2 " + highlightClass(row.legal)}>{row.legal || '-'}</td>
                <td className={"border p-2 " + highlightClass(row.partnerEsign)}>{row.partnerEsign || '-'}</td>
                <td className={"border p-2 " + highlightClass(row.legalHeadEsign)}>{row.legalHeadEsign || '-'}</td>
                <td className={"border p-2 " + highlightClass(row.sap)}>{row.sap || '-'}</td>
                <td className={"border p-2 " + highlightClass(row.codeCreation)}>{row.codeCreation || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationAccess;

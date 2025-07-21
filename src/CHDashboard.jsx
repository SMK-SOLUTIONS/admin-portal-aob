


const chData = [
  { bde: 'BDE1', logins: 5, ch: 4, bh: 4, fin: 3, channel: 2, legal: 2, peSign: 1, lhEsign: 1, sap: 1, code: 1 },
  { bde: 'BDE2', logins: 3, ch: 3, bh: 2, fin: 2, channel: 1, legal: 1, peSign: 0, lhEsign: 0, sap: 0, code: 0 }
];

const CHDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">CH Dashboard - BDE Summary</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-[#eaf3fc]">
            {['BDE', 'Logins', 'CH', 'BH', 'Fin', 'Channel', 'Legal', 'PE-sign', 'LH-esign', 'SAP', 'Code'].map((h, i) => (
              <th key={i} className="border p-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chData.map((row, idx) => (
            <tr key={idx}>
              <td className="border p-2">{row.bde}</td>
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
    </div>
  );
};

export default CHDashboard;

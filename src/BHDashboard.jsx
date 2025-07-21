


const bhData = [
  { ch: 'CH1', logins: 8, chApp: 7, bh: 6, fin: 6, channel: 4, legal: 3, peSign: 3, lhEsign: 2, sap: 2, code: 2 },
  { ch: 'CH2', logins: 6, chApp: 5, bh: 5, fin: 3, channel: 2, legal: 1, peSign: 1, lhEsign: 1, sap: 0, code: 0 }
];

const BHDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">BH Dashboard - CH Summary</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-[#eaf3fc]">
            {['CH', 'Logins', 'CH App', 'BH', 'Fin', 'Channel', 'Legal', 'PE-sign', 'LH-esign', 'SAP', 'Code'].map((h, i) => (
              <th key={i} className="border p-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bhData.map((row, idx) => (
            <tr key={idx}>
              <td className="border p-2">{row.ch}</td>
              <td className="border p-2">{row.logins}</td>
              <td className="border p-2">{row.chApp}</td>
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

export default BHDashboard;

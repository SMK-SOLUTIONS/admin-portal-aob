import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as XLSX from 'xlsx';

const StampPaperDashboard = () => {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [filteredData, setFilteredData] = useState([]);
  const [mockData, setMockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { region: 'North', used: 20, available: 45, date: '2025-07-10' },
        { region: 'South', used: 15, available: 30, date: '2025-07-12' },
        { region: 'East', used: 10, available: 20, date: '2025-07-13' },
        { region: 'West', used: 25, available: 50, date: '2025-07-14' },
        { region: 'Central', used: 18, available: 35, date: '2025-07-15' },
      ];
      setMockData(data);
      setFilteredData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      const filtered = mockData.filter((entry) => {
        const d = new Date(entry.date);
        return d >= new Date(dateRange.from) && d <= new Date(dateRange.to);
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(mockData);
    }
  }, [dateRange, mockData]);

  const regions = filteredData.map((item) => item.region);
  const usedData = filteredData.map((item) => item.used);
  const availableData = filteredData.map((item) => item.available);

  const chartOptions = {
    chart: { type: 'column', height: 300 },
    title: { text: 'Real-Time Stamp Paper Usage & Availability by Region' },
    xAxis: { categories: regions, title: { text: 'Region' } },
    yAxis: { min: 0, title: { text: 'Count' } },
    series: [
      { name: 'Used', data: usedData, color: '#eaf3fc' },
      { name: 'Available', data: availableData, color: '#034ea2' },
    ],
    legend: { align: 'center', verticalAlign: 'bottom' },
    credits: { enabled: false },
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'StampPaperData');
    XLSX.writeFile(workbook, 'StampPaperSummary.xlsx');
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-[#034ea2]">Stamp Paper Dashboard</h2>

      <div className="mb-4 flex gap-4 flex-wrap">
        <div>
          <label className="block text-sm font-medium">From</label>
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">To</label>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <div className="self-end">
          <button
            onClick={downloadExcel}
            className="bg-[#034ea2] text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download Excel
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
};

export default StampPaperDashboard;

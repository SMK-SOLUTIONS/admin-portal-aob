import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as XLSX from 'xlsx';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper
} from '@mui/material';

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
    <Paper className="p-6 shadow rounded">
      <Typography variant="h5" mb={3}>
        Stamp Paper Dashboard
      </Typography>

      <Grid container spacing={2} className="mb-4">
        <Grid item xs={12} sm={3}>
          <TextField
            label="From"
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            InputLabelProps={{ shrink: true }}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="To"
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            InputLabelProps={{ shrink: true }}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} className="flex items-end justify-end">
          <Button
            variant="contained"
            onClick={downloadExcel}
            sx={{
              bgcolor: '#034ea2',
              '&:hover': { bgcolor: '#023b7e' },
            }}
          >
            Download Excel
          </Button>
        </Grid>
      </Grid>

      <div className="overflow-x-auto">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </Paper>
  );
};

export default StampPaperDashboard;

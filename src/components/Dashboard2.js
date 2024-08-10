// src/components/Dashboard2.js
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../styles/Dashboard2.css'; // Dashboard2 styles
import { fetchSalesComparison } from '../api/api.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const Dashboard2 = () => {
  const [data, setData] = useState({ products: [], categories: [] });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (startDate && endDate) {
      fetchSalesComparison(startDate, endDate).then(data => setData(data));
    }
  }, [startDate, endDate]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };

  const productComparisonData = {
    labels: data.products.map(p => p.name),
    datasets: [
      {
        label: `Sales Amount on ${startDate}`,
        data: data.products.map(p => p.date1SalesAmount),
        backgroundColor: 'rgba(75,192,192,0.5)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2
      },
      {
        label: `Sales Amount on ${endDate}`,
        data: data.products.map(p => p.date2SalesAmount),
        backgroundColor: 'rgba(153,102,255,0.5)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 2
      }
    ]
  };

  const categoryComparisonData = {
    labels: data.categories.map(c => c.category),
    datasets: [
      {
        label: `Total Sales on ${startDate}`,
        data: data.categories.map(c => c.date1TotalSales),
        backgroundColor: 'rgba(255,99,132,0.5)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2
      },
      {
        label: `Total Sales on ${endDate}`,
        data: data.categories.map(c => c.date2TotalSales),
        backgroundColor: 'rgba(54,162,235,0.5)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 2
      }
    ]
  };

  const comparisonTableData = data.products.map(p => ({
    productName: p.name,
    category: p.category,
    date1SalesAmount: p.date1SalesAmount,
    date2SalesAmount: p.date2SalesAmount,
    difference: p.date2SalesAmount - p.date1SalesAmount
  }));

  const columnDefs = [
    { headerName: 'Product Name', field: 'productName' },
    { headerName: 'Category', field: 'category' },
    { headerName: `Sales Amount on ${startDate}`, field: 'date1SalesAmount' },
    { headerName: `Sales Amount on ${endDate}`, field: 'date2SalesAmount' },
    { headerName: 'Difference', field: 'difference' }
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Sales Comparison Between Two Dates</h1>
      <div className="date-picker-container">
        <label className="date-picker-label">
          Start Date:
          <input type="date" name="startDate" value={startDate} onChange={handleDateChange} className="date-picker-input" />
        </label>
        <label className="date-picker-label">
          End Date:
          <input type="date" name="endDate" value={endDate} onChange={handleDateChange} className="date-picker-input" />
        </label>
      </div>
      <div className="chart-container">
        <div className="chart-box">
          <h2 className="chart-title">Product-Level Comparison</h2>
          <Bar data={productComparisonData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (context) => `$${context.raw}` } } } }} />
        </div>
        <div className="chart-box">
          <h2 className="chart-title">Category-Level Comparison</h2>
          <Line data={categoryComparisonData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (context) => `$${context.raw}` } } } }} />
        </div>
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={comparisonTableData}
          columnDefs={columnDefs}
          pagination={true}
          sortable={true}
          filter={true}
        />
      </div>
    </div>
  );
};

export default Dashboard2;

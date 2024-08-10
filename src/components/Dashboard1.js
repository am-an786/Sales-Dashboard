// src/components/Dashboard1.js
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../styles/Dashboard1.css'; // Dashboard1 styles
import { fetchTodaySales } from '../api/api.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard1 = () => {
  const [data, setData] = useState({ products: [], categories: [] });

  useEffect(() => {
    fetchTodaySales().then(data => setData(data));
  }, []);

  const productData = {
    labels: data.products.map(p => p.name),
    datasets: [{
      label: 'Sales Amount',
      data: data.products.map(p => p.salesAmount),
      backgroundColor: 'rgba(75,192,192,0.5)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2
    }]
  };

  const categoryData = {
    labels: data.categories.map(c => c.category),
    datasets: [{
      label: 'Total Sales',
      data: data.categories.map(c => c.totalSales),
      backgroundColor: 'rgba(153,102,255,0.5)',
      borderColor: 'rgba(153,102,255,1)',
      borderWidth: 2
    }]
  };

  const tableData = data.products.map(p => ({
    productName: p.name,
    category: p.category,
    quantitySold: p.quantitySold,
    salesAmount: p.salesAmount
  }));

  const columnDefs = [
    { headerName: 'Product Name', field: 'productName' },
    { headerName: 'Category', field: 'category' },
    { headerName: 'Quantity Sold', field: 'quantitySold' },
    { headerName: 'Sales Amount', field: 'salesAmount' }
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Today's Sales</h1>
      <div className="chart-container">
        <div className="chart-box">
          <h2 className="chart-title">Product-Level Sales</h2>
          <Bar data={productData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (context) => `$${context.raw}` } } } }} />
        </div>
        <div className="chart-box">
          <h2 className="chart-title">Category-Level Sales</h2>
          <Pie data={categoryData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (context) => `$${context.raw}` } } } }} />
        </div>
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={tableData}
          columnDefs={columnDefs}
          pagination={true}
          sortable={true}
          filter={true}
        />
      </div>
    </div>
  );
};

export default Dashboard1;

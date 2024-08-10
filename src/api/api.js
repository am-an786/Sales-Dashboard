// src/api/api.js
export const fetchTodaySales = async () => {
    // Mock API call
    return {
      products: [
        { name: 'Product A', category: 'Category 1', quantitySold: 150, salesAmount: 1500 },
        { name: 'Product B', category: 'Category 2', quantitySold: 200, salesAmount: 2000 }
      ],
      categories: [
        { category: 'Category 1', totalSales: 1500 },
        { category: 'Category 2', totalSales: 2000 }
      ]
    };
  };
  
  export const fetchSalesComparison = async (startDate, endDate) => {
    // Mock API call
    return {
      products: [
        { name: 'Product A', category: 'Category 1', date1SalesAmount: 1200, date2SalesAmount: 1300 },
        { name: 'Product B', category: 'Category 2', date1SalesAmount: 1800, date2SalesAmount: 2000 }
      ],
      categories: [
        { category: 'Category 1', date1TotalSales: 1200, date2TotalSales: 1300 },
        { category: 'Category 2', date1TotalSales: 1800, date2TotalSales: 2000 }
      ]
    };
  };
  
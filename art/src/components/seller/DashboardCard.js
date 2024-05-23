import React, { useState, useEffect } from 'react';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';

function StatCard({ icon: Icon, bgColor, title, value }) {
  return (
    <div className="flex p-4 rounded-lg shadow-md bg-white">
      <div className={`rounded-full h-12 w-12 flex items-center justify-center ${bgColor}`}>
        <Icon className="text-2xl text-white" />
      </div>
      <div className="pl-4">
        <span className="text-sm text-gray-500 font-light">{title}</span>
        <div className="flex items-center">
          <strong className="text-xl text-gray-700 font-semibold">{value}</strong>
        </div>
      </div>
    </div>
  );
}

export default function DashboardStatsGrid() {
  const [data, setData] = useState({
    totalSales: 'Loading...',
    totalOrders: 'Loading...',
    totalBuyers: 'Loading...'
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');  // Retrieve the token from local storage

      if (!token) {
        console.error('Authentication error: No token found');
        setData({
          totalSales: 'Unauthorized',
          totalOrders: 'Unauthorized',
          totalBuyers: 'Unauthorized'
        });
        return;  // Early return if no token
      }

      try {
        const response = await fetch('http://localhost:3001/api/orders/seller/orders', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Set the Authorization header
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        const result = await response.json();
        setData({
          totalSales: `$${result.totalSales}`,
          totalOrders: result.totalOrders.toString(),
          totalBuyers: result.totalBuyers.toString()
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setData({
          totalSales: 'Error',
          totalOrders: 'Error',
          totalBuyers: 'Error'
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <StatCard icon={IoBagHandle} bgColor="bg-sky-500" title="Total Sales" value={data.totalSales} />
      <StatCard icon={IoPieChart} bgColor="bg-orange-600" title="Total Expenses" value="$3,423" />
      <StatCard icon={IoPeople} bgColor="bg-yellow-400" title="Total Customers" value={data.totalBuyers} />
      <StatCard icon={IoCart} bgColor="bg-green-600" title="Total Orders" value={data.totalOrders} />
    </div>
  );
}

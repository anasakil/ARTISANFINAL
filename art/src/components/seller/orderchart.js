import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DailyOrdersChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3001/api/orders/seller/orders', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                const { orders } = await response.json();
                processChartData(orders);
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const processChartData = (orders) => {
        const orderCounts = orders.reduce((acc, order) => {
            const date = new Date(order.createdAt).toLocaleDateString(); // Convert to local date string
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        setChartData({
            labels: Object.keys(orderCounts),
            datasets: [{
                label: 'Daily Orders',
                data: Object.values(orderCounts),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }]
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Daily Orders Chart</h2>
            <Bar data={chartData} options={{
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
            }} />
        </div>
    );
};

export default DailyOrdersChart;

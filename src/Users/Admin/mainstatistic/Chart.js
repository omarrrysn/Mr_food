import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './file.css';
import { statisticsGraph } from '../../../constants/API';

const Chart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(statisticsGraph);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Transform the data to rename the key
        const transformedData = data.map(item => ({
          ...item,
          most_popular: item.total_quantity
        }));
        
        setChartData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='charts'>
      <div className="chart-container">
        <ResponsiveContainer width="300%" height={300} style={{marginRight:"300px"}}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Name" angle={-45} textAnchor="end" interval={0} />
            <YAxis domain={[0, 20]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="most_popular" fill="#8884d8"  />
          </BarChart>
        </ResponsiveContainer>
        <div style={{height:"100px"}}></div>
        
        <div className="chart-container">
          <ResponsiveContainer width="300%" height={400} style={{marginRight:"200px"}}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Name" type="category" angle={-45} interval={0} textAnchor="end" />
              <YAxis domain={[0, 20]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="most_popular" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Chart;

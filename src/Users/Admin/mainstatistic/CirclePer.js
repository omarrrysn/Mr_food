import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { statisticsPercantage } from '../../../constants/API';

const CirclePer = () => {
  const [percentage, setPercentage] = useState(null);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(statisticsPercantage);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPercentage(data.percentage);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (percentage !== null) {
      let start = 0;
      const duration = 3000; // 3 seconds
      const increment = percentage / (duration / 50); // Update every 50ms

      const interval = setInterval(() => {
        start += increment;
        if (start >= percentage) {
          clearInterval(interval);
          setDisplayPercentage(percentage);
        } else {
          setDisplayPercentage(start);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [percentage]);

  return (
    <div className='PerCircle'>
      {percentage !== null ? (
        <CircularProgressbar
          value={displayPercentage}
          text={`${displayPercentage.toFixed(2)}%`}
          styles={{
            // Customize the root svg element
            root: {},
            // Customize the path, i.e. the "completed progress"
            path: {
              // Path color
              stroke: `rgba(62, 152, 199, ${displayPercentage / 100})`,
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'butt',
              // Customize transition animation
              transition: 'stroke-dashoffset 0.5s ease 0s',
              // Rotate the path
              transform: 'rotate(0.25turn)',
              transformOrigin: 'center center',
            },
            // Customize the circle behind the path, i.e. the "total progress"
            trail: {
              // Trail color
              stroke: '#d6d6d6',
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'butt',
              // Rotate the trail
              transform: 'rotate(0.25turn)',
              transformOrigin: 'center center',
            },
            // Customize the text
            text: {
              // Text color
              fill: '#f88',
              // Text size
              fontSize: '16px',
            },
            // Customize background - only used when the `background` prop is true
            background: {
              fill: '#3e98c7',
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CirclePer;

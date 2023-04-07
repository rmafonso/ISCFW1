import React, { useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
} from 'chart.js';
import {app, database} from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { getDatabase, ref, onValue} from 'firebase/database';
import Chart from "chart.js/auto"

const DataChart = () => {
  const canvasRefs = {
    x: useRef(null),
    y: useRef(null),
    z: useRef(null),
  };
  const chartRefs = {
    x: useRef(null),
    y: useRef(null),
    z: useRef(null),
  };
  const [chartData, setChartData] = useState({
    timestamp: [],
    x: [],
    y: [],
    z: [],
  });
  const [updateInterval, setUpdateInterval] = useState(1000);
  const [newUpdateInterval, setNewUpdateInterval] = useState(0);
  const [donefetchingData, setDoneFetchingData] = useState(false);



  useEffect(() => {
    const fetchData = () => {
      setDoneFetchingData(true); // set state to indicate that data fetching is in progress
      console.log("fetchou data");
      const dataBase = getDatabase(app);
      const accRef = ref(dataBase, 'accel');
      onValue(accRef, (snapshot) => {
        const data = snapshot.val();
  
        const newChartData = {
          timestamp: [],
          x: [],
          y: [],
          z: [],
        };
  
        for (const key in data) {
          const { timestamp: timestampValue, x: xValue, y: yValue, z: zValue } = data[key].data;
          newChartData.timestamp.push(timestampValue);
          newChartData.x.push(xValue);
          newChartData.y.push(yValue);
          newChartData.z.push(zValue);
        }
  
        setChartData(newChartData);
      });
      
    };

    let intervalId;
    let currentInterval = updateInterval;

    

    intervalId = setInterval(() => {
      if (currentInterval !== updateInterval) {
        currentInterval = updateInterval;
        clearInterval(intervalId);
        intervalId = setInterval(fetchData, currentInterval);
      }
      fetchData();
      
    }, currentInterval);

    return () => clearInterval(intervalId);
  }, [updateInterval]);

  useEffect(() => { 
    if(donefetchingData==true)
    {
      ['x', 'y', 'z'].forEach((axis) => {
        
        const canvasRef = canvasRefs[axis].current;
        const chartRef = chartRefs[axis].current;
        const color = axis === 'x' ? 'black' : axis === 'y' ? 'red' : 'blue';
        
      
        const chartConfig = {
          type: 'line',
          data: {
            labels: chartData.timestamp,
            datasets: [
              {
                label: axis.toUpperCase(),
                data: chartData[axis],
                borderColor: color,
              },
            ],
          },
          options: {
            animation: {
              duration: 0,
            },
          },
        };
        
        if (!chartRef) {
          chartRefs[axis].current = new Chart(canvasRef, chartConfig);
        } else {
          chartRef.data.labels = chartData.timestamp;
          chartRef.data.datasets[0].data = chartData[axis];
          chartRef.update();
          console.log("updatou");
        }
      
      });
      setDoneFetchingData(false); // set state to indicate that data fetching is complete

    }
  
  }, [updateInterval,chartData.timestamp, chartData.x, chartData.y, chartData.z, canvasRefs, chartRefs, ]);

  return (
    <div>
      <canvas ref={canvasRefs.x}></canvas>
      <canvas ref={canvasRefs.y}></canvas>
      <canvas ref={canvasRefs.z}></canvas> 
      <input type="number" value={newUpdateInterval} onChange={(e) => setNewUpdateInterval(parseInt(e.target.value))} />
      <button onClick={() => (setUpdateInterval(newUpdateInterval))}>Update Interval</button>
</div>
);
};

export default DataChart;
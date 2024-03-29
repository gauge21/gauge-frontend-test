import { useState } from 'react';
import { Line, Bar } from "react-chartjs-2";

export default function Charts() {
    const [graphData, setGraphData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Emotion',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
          },
        ],
      });
    const [averageGraphData, setAverageGraphData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Emotion',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
          },
        ],
    });
    const [highestAverageGraph, setHighestAverageGraph] = useState({
        labels: [],
        datasets: [
          {
            label: 'Emotion',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [],
          },
        ],
    });

    return (
        <div>
            <h2> My Logbook </h2>
            <Line data={graphData} />
            <h2> Daily Average </h2>
            <Line data={averageGraphData} />
            <h2> Highest Average Emotion Over Past Month </h2>
            <Bar data={highestAverageGraph} />
        </div>
    )
}
import ConnectWebSocket from './ConnectWebSocket';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export function DrawSimpleBarChart({data}){
  const in_person = data?.calculation?.in_person_total_carbon_kg ?? 0;
  const online = data?.calculation?.online_total_carbon_kg ?? 0;
  const actual = data?.calculation?.actual_total_carbon_kg ?? 0;
  const saved =  in_person > 0? ((1 - actual / in_person) * 100): 100;
  const rawData = {datasets: [{
      data: [{x: "If everyone went in-person", y: in_person}, 
        {x: "If everyone connected online", y: online},
        {x: "Actual emissions", y: actual},
      ],
      backgroundColor: [
        "#f00", "#0f0", "#00f", 
      ],
      yAxisID: 'y',
      stack: "0"
    },
    {
      data: [
        {x: "Saved by those joining online", y: saved}
      ],
      backgroundColor: [
        "#777"
      ],
      yAxisID: 'y1',
      stack: "0"
    }
  ]}

  const options = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: false,
      datalabels: {
        backgroundColor: function(context) {
          return context.dataset.backgroundColor;
        },
        borderRadius: 4,
        color: 'white',
        font: {
          weight: 'bold'
        },
        formatter: (value, context)=>{
          console.log("Value", value);
          console.log("Context", context);
          return value?.y.toFixed(1) + (context?.dataset?.yAxisID == "y1"? "%" : " kg CO2eq");
        },
        padding: 6
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    }
  };

  return (<>
    <Bar options={options} data={rawData} />
    </>
  );
  }


export default function SimpleBarChart({event_id, participant_id}){
  return ConnectWebSocket(event_id, participant_id, DrawSimpleBarChart);
}

import React, { useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea } from 'recharts';
import { createSnapshot } from '../snapshot-generating/snapshot-generating';

const AbnormalValues = ({ data, anomalies }) => {
  const chartRef = useRef(null);

  const list = [...new Set(data)];

  const notAnomalies = list.filter((el) => {
    return !anomalies.includes(el);
  })

  const floor = notAnomalies[0];
  const ceil = notAnomalies[notAnomalies.length - 1];

  const chartData = list.map((el, index) => ({index, value: el}));

  const maxY = Math.max(...list);
  const maxX = list.length;

  return (
    <>
      <div ref={chartRef} >
        <LineChart width={800} height={400} data={chartData}>
          <XAxis type='number' dataKey="index" domain={[0, maxX]} />
          <YAxis type='number' domain={[0, maxY]} />
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="value" stroke="#8884d8" />

          <ReferenceArea y1={floor} y2={ceil} fill="green" stroke='orange' strokeWidth={1}/>
        
        </LineChart>
      </div>
      <button onClick={() => createSnapshot(chartRef, "abnormal-values.png")}>Chart Snapshot</button>
    </>
  )
}

export default AbnormalValues;
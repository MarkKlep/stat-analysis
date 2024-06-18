import { useRef } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useParams } from 'react-router-dom';
import { createSnapshot } from '../snapshot-generating/snapshot-generating';

const ECDF = () => {
  const { data } = useParams();
  const elements = JSON.parse(data);

  const ECDFRef = useRef(null);

  const ecdfValues = elements.map((element) => {
    const count = elements.filter((e) => e <= element).length;
    return { x: element, y: count / elements.length };
  });

  return (
    <>
      <div style={{marginTop: '50px'}} ref={ECDFRef} >
        <b>F*{'\('}x{'\)'}</b>
        <LineChart width={700} height={400} data={ecdfValues} >
          <Line type="step" dataKey="y" stroke="#8884d8" dot={true} />
          <XAxis dataKey="x" type="number" domain={['dataMin', 'dataMax']} />
          <YAxis type="number"/>
          <Legend/>
          <Tooltip/>
          <CartesianGrid strokeDasharray="3 3"/>
        </LineChart>
      </div>
      <div>
        <button onClick={() => createSnapshot(ECDFRef, "ECDF.png")}>ECDF snapshot</button>
      </div>
    </>
  )
}

export default ECDF;
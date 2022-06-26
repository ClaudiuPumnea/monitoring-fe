import randomColor from 'randomcolor';
import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function LineChartByDate({ data, name }) {
  const [color] = useState(randomColor());
  useEffect(() => {}, [data]);
  return (
    <div>
      <LineChart
        className='chart'
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='value' name={name} stroke={color} />
      </LineChart>
    </div>
  );
}

export default LineChartByDate;

import randomColor from 'randomcolor';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

function LineChartByDate({ data, name }) {
  const [color] = useState(randomColor());
  console.log(data);
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
        <CartesianGrid strokeDasharray='3 3' stroke='#9ca2ad' />
        <XAxis
          dataKey='name'
          tick={{ fill: 'black' }}
          tickLine={{ stroke: 'black' }}
        />
        <YAxis tick={{ fill: 'black' }} tickLine={{ stroke: 'black' }} />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='value' name={name} stroke={color} />
      </LineChart>
    </div>
  );
}

export default LineChartByDate;

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datetime/css/react-datetime.css';
import './DateTimePicker.css';

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Datetime from 'react-datetime';

import LineChartByDate from './../pages/LineChartByDate';
import { getDataToPlot } from './../Utils/Common';

function DateAndTimePicker({ title, roomId }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());
  const [data, updateData] = useState(null);

  useEffect(() => {
    if (startDate != null)
      getDataToPlot(
        title,
        roomId,
        moment(startDate).format('YYYY-MM-DD HH:mm'),
        endDate
      ).then((res) => updateData(res));
  }, [roomId]);

  function handleStartDateChange(value) {
    setStartDate(value);
    const sentEndDate =
      typeof endDate == Date()
        ? moment().format('YYYY-MM-DD HH:mm')
        : moment(endDate._d).format('YYYY-MM-DD HH:mm');
    getDataToPlot(
      title,
      roomId,
      moment(value._d).format('YYYY-MM-DD HH:mm'),
      sentEndDate
    ).then((res) => updateData(res));
  }
  function handleEndDateChange(value) {
    setEndDate(value);
    if (startDate != null)
      getDataToPlot(
        title,
        roomId,
        startDate,
        moment(value._d).format('YYYY-MM-DD HH:mm')
      ).then((res) => updateData(res));
  }

  return (
    <div>
      <h1>{title}</h1>
      <div className='datePickersContainer'>
        <Datetime
          onChange={handleStartDateChange}
          timeFormat='HH:mm'
          maxDate={endDate}
        />
        <Datetime
          value={endDate}
          timeFormat='HH:mm'
          onChange={handleEndDateChange}
        />
      </div>
      <LineChartByDate data={data} name={title} />
    </div>
  );
}

export default DateAndTimePicker;

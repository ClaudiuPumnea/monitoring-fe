import './Switch.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';

const SwitchButton = ({ isOn, electricalRelayId }) => {
  const [status, setStatus] = useState(isOn);

  useEffect(() => {
    setStatus(isOn);
  }, [electricalRelayId]);

  function handleOnChange(value) {
    setStatus(value);
    updateRelayStatus(electricalRelayId);
    console.log(electricalRelayId);
    console.log(value);
  }

  function updateRelayStatus(electricalRelayId) {
    var config = {
      method: 'put',
      url: `http://localhost:3050/electricalRelay/${electricalRelayId}?isOn=${status}`,
      headers: {
        Authorization: 'Bearer null',
        'Content-Type': 'application/json',
      },
    };

    axios(config);
  }

  return (
    <div>
      <Switch
        className='react-switch'
        checked={status}
        onChange={handleOnChange}
        onColor='#86d3ff'
        handleDiameter={30}
        boxShadow='0px 1px 5px rgba(0,0,0,0.6)'
        activeBoxShadow='0px 0px 1px 10px rgba(0,0,0,0.2)'
        height={20}
        width={48}
      />
    </div>
  );
};

export default SwitchButton;

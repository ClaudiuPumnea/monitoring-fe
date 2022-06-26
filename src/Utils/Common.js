import axios from 'axios';
import { Navigate } from 'react-router';

export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
};
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
};

export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('data');
  return <Navigate to={'/login'} />;
};

export function checkTokenAndUser() {
  if (sessionStorage.getItem('token') && sessionStorage.getItem('user'))
    return true;
  return false;
}

export async function getDataToPlot(valueName, roomId, startDate, endDate) {
  var config = {
    method: 'get',
    url: `http://localhost:3050/roomInputs/getDataToPlot?valueName=${valueName}&roomId=${roomId}&startDate=${startDate}&endDate=${endDate}`,
    headers: {
      Authorization: 'Bearer null',
      'Content-Type': 'application/json',
    },
  };
  const data = await (await axios(config)).data;
  return data;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(':')
  );
}

export async function getRelaysStatus(roomId) {
  var config = {
    method: 'get',
    url: `http://localhost:3050/electricalRelay/${roomId}`,
    headers: {
      Authorization: 'Bearer null',
      'Content-Type': 'application/json',
    },
  };
  const data = await (await axios(config)).data;
  return data;
}

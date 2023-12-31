import React from 'react';
import sunrise from '../assests/images/Sunrise.png';
import sunset from '../assests/images/Sunset.png';
import { useSelector } from 'react-redux';
import mintemp from '../assests/images/mintemp.png'
import maxtemp from '../assests/images/maxtemp.png'
import feelslike from '../assests/images/feelslike.png'

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`.slice(-2); // Ensure two digits for minutes
  return `${hours}:${minutes}`;
}

function MoreDetails() {
  const weatherState = useSelector((state) => state.weather);

  let sunriseTime = 0;
  let sunsetTime = 0;
  let tempMin = 0;
  let tempMax = 0;
  let feelsLike = 0;

  if (weatherState.data) {
    const { sunrise, sunset } = weatherState.data.sys;
    const { temp_min, temp_max, feels_like } = weatherState.data.main;

    sunriseTime = formatTime(sunrise);
    sunsetTime = formatTime(sunset);
    tempMin = temp_min;
    tempMax = temp_max;
    feelsLike = feels_like;
  }

  return (
    <div className="flex flex-wrap border-solid m-4  justify-center items-center flex-row " >

      <div className="m-2 p-4 flex justify-center items-center shadow flex-column bg-white">
        <p className="text-blue-500 font-cursive text-2xl">Sunrise</p>
        <img src={sunrise} alt="Sunrise" className="h-10 " />
        <p className="text-2xl font-bold">{sunriseTime}</p>
      </div>

      <div className="m-2 p-4 rounded-md shadow-md flex justify-center items-center flex-column bg-white">
        <p className="text-blue-500 font-cursive text-2xl">Sunset</p>
        <img src={sunset} alt="Sunset" className="h-10" />
        <p className="text-2xl font-bold">{sunsetTime}</p>
      </div>

      <div className="m-2 p-4 rounded-md shadow-md flex justify-center items-center flex-column bg-white">
        <p className="text-blue-500 font-cursive text-2xl">Temp Min</p>
        <img src={mintemp} alt="Sunset" className="h-10" />

        <p className="text-2xl font-bold">{tempMin}</p>
      </div>

      <div className="m-2 p-4 rounded-md shadow-md flex justify-center items-center flex-column bg-white">
        <p className="text-blue-500 font-cursive text-2xl">Temp Max</p>
        <img src={maxtemp} alt="Sunset" className="h-10" />

        <p className="text-2xl font-bold">{tempMax}</p>
      </div>

      <div className="m-2 p-4 rounded-md shadow-md flex-column flex justify-center items-center bg-white">
        <p className="text-blue-500 font-cursive text-2xl">Feels Like</p>
        <img src={feelslike} alt="Sunset" className="h-10" />

        <p className="text-2xl font-bold">{feelsLike}</p>
      </div>
    </div>
  );
}

export default MoreDetails;

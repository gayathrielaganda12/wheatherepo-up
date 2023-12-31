import React from 'react';
import HumidityIcon from '../assests/images/HumidityIcon.png'
import WeatherImg from '../assests/images/WeatherImg.png'
import WindIcon from '../assests/images/Wind.png'
import TemperatureGraph from './TemperatureGraph';
import { useSelector } from 'react-redux';
import PressureIcon from '../assests/images/Pressure.png'

function MainReport() {
  const weatherState = useSelector((state) => state.weather);

  const currentDate = new Date();
  const details = 'font-bold text-lg';
  const detailsVal = 'text-navy font-medium text-xl my-2';

  const formattedDate = currentDate.toLocaleDateString();

  return (
    <div className='container mx-auto p-4 ' >
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-1/2 bg-gradient-to-t from-blue-300 to-blue-700 rounded '>
          <div className='flex flex-col justify-start items-start pl-10 pt-2'>
            <p className='text-lg'>{formattedDate}</p>
            {weatherState.data ? (
              <h1 className='text-3xl text-white'>{weatherState.data.name}</h1>
            ) : (
              <h1 className='text-lg'>Search weather report</h1>
            )}
          </div>

          <div className='flex flex-col justify-center items-center'>
            <p className='text-3xl'>
              {weatherState.data ? (
                <span className='text-yellow-300 text-4xl font-bold'>
                  {Math.floor(weatherState.data.main.temp - 273)} <sup>0</sup>
                </span>
              ) : (
                '0'
              )}
            </p>
            <img src={WeatherImg} className='h-24 w-24 my-4' alt='Weather Icon' />
          </div>

          <div className='flex justify-center items-center space-x-4'>
            <div className='flex flex-col justify-center items-center'>
              <p className={details}>Humidity</p>
              <img
                src={HumidityIcon}
                className='h-8 w-8 rounded-full'
                alt='Humidity Icon'
              />
              <p className={detailsVal}>
                {weatherState.data ? weatherState.data.main.humidity : 0}
              </p>
            </div>

            <div className='flex flex-col justify-center items-center'>
              <p className={details}>Wind</p>
              <img src={WindIcon} className='h-8 w-8 rounded-full' alt='Wind Icon' />
              <p className={detailsVal}>
                {weatherState.data ? weatherState.data.wind.speed : 0}
              </p>
            </div>

            <div className='flex flex-col justify-center items-center'>
              <p className={details}>Pressure</p>
              <img
                src={PressureIcon}
                className='h-8 w-8 rounded-full'
                alt='Pressure Icon'
              />
              <p className={detailsVal}>
                {weatherState.data ? weatherState.data.main.pressure : 0}
              </p>
            </div>
          </div>
        </div>

        <div className='md:w-1/2 mt-4 md:mt-0' style={{margin:'auto'}}>
          <TemperatureGraph />
        </div>
      </div>
    </div>
  );
}

export default MainReport;

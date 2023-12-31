// WeatherChart.js
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const WeatherChart = ({ latitude, longitude, apiKey }) => {
  const chartContainer = useRef(null);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const startDate = new Date(currentYear, currentMonth, 1);
        const endDate = new Date(currentYear, currentMonth + 1, 0);

        const startTimestamp = Math.round(startDate.getTime() / 1000);
        const endTimestamp = Math.round(endDate.getTime() / 1000);

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&start=${startTimestamp}&end=${endTimestamp}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeatherData(data.hourly);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [latitude, longitude, apiKey]);

  useEffect(() => {
    if (weatherData.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartContainer.current);

    const xScale = d3
      .scaleTime()
      .domain([new Date(weatherData[0].dt * 1000), new Date(weatherData[23].dt * 1000)])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(weatherData, (d) => d.temp)])
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => xScale(new Date(d.dt * 1000)))
      .y((d) => yScale(d.temp));

    svg.selectAll('*').remove();

    svg
      .append('path')
      .data([weatherData])
      .attr('class', 'line-temperature')
      .attr('d', line);

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(d3.timeDay.every(1)).tickFormat(d3.timeFormat('%d-%b')));

    svg
      .append('g')
      .call(d3.axisLeft(yScale).ticks(5).tickFormat((d) => `${d}°C`))
      .attr('class', 'y-axis-temperature');
  }, [weatherData]);

  return <div ref={chartContainer}></div>;
};

export default WeatherChart;

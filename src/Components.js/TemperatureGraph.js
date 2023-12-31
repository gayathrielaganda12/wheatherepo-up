import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

// Import your temperature icon and rising temperature images
import risingTemperatureIcon from '../assests/images/risingTemperatureIcon.png';
import temperatureIcon from '../assests/images/temperatureIcon.png'

const TemperatureGraph = () => {
  const [temperature, setTemperature] = useState("");
  const [city,setCity] = useState("")
  const weatherState = useSelector((state) => state.weather);


  useEffect(() => {
    if (weatherState.data != null) {
      setCity(weatherState.data.name);
    }
  }, [weatherState.data]);





  useEffect(() => {

   
    const fetchData = async () => {
      
      
     try {
        // Replace 'your_api_key' with your actual OpenWeatherMap API key
        const api_key = 'dc05c0bc0ca2bbd9f0c413cae8c22828';
        const city_name =  city || "Hyderabad"
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${api_key}`;

        const response = await axios.get(url);
        const data = response.data;

        // Extract temperature values for the next 15 time slots and convert to Celsius
        const temperatureValues = data.list.slice(0, 15).map(entry => entry.main.temp - 273.15);
        console.log(temperatureValues);

        // Update state with the temperature values in Celsius
        setTemperature(temperatureValues);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [city]); 

  useEffect(() => {
    // Draw the temperature graph using d3.js
    const svg = d3.select('.temperature-chart');

    // Clear existing chart
    svg.selectAll('*').remove();

    // Set up chart dimensions
    const width = 300;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    // Create scales
    const xScale = d3.scaleBand().domain(Array.from({ length: 15 }, (_, i) => (i + 1).toString())).range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().domain([Math.min(...temperature), Math.max(...temperature)]).range([height, 0]);

    // Append a group for the chart area
    const chartGroup = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Draw temperature icons
    chartGroup.selectAll('image.temperature-icon')
      .data(temperature)
      .enter()
      .append('image')
      .attr('x', (d, i) => xScale((i + 1).toString()) + xScale.bandwidth() / 2 - 20) // Center the image on the x-axis
      .attr('y', d => yScale(d) - 24) // Adjust the positioning
      .attr('width', 20)
      .attr('height', 20)
      .attr('href', temperatureIcon)
      .attr('rx', 30) // Set x-axis radius
      .attr('ry', 30); // Set y-axis radius

    // Draw rising temperature image near the y-axis
    svg.append('image')
      .attr('x', margin.left - 50) // Adjust the positioning
      .attr('y', margin.top)
      .attr('width', 40)
      .attr('height', 40)
      .attr('href', risingTemperatureIcon)
      .attr('rx', 30) // Set x-axis radius
      .attr('ry', 30); // Set y-axis radius

    // Draw axes and labels
    chartGroup.append('g').call(d3.axisLeft(yScale)).append('text').text('Temperature (°C)').attr('transform', 'rotate(-90)').attr('y', -40).attr('dy', '0.71em').attr('text-anchor', 'end');
    chartGroup.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale)).selectAll('text').attr('dy', '0.71em').attr('text-anchor', 'middle');

    // Display current month and year below the container
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();

    svg.append('text')
    .attr('x', width / 2)
    .attr('y', margin.top - 10)
    .style('text-anchor', 'middle')
    .style('font-size', '15px')
    
    .text('15 Days Temperature Report');

    svg.append('text')
    .attr('x', width / 2)
    .attr('y', height + margin.top + margin.bottom - 10)
    .style('text-anchor', 'middle')
    .text(`${currentMonth} ${currentYear}`);

  }, [temperature, city, weatherState]);

  return <svg className="temperature-chart" width="500" height="300">
    <h1>Graph</h1>
  </svg>;
};

export default TemperatureGraph;

import React, { useState, useEffect, useRef } from 'react';
import { scaleTime, scaleLinear, line, select, axisBottom, axisLeft } from 'd3';
import { timeFormat } from 'd3-time-format';

const WeatherForecastChart = ({ city }) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const chartContainer = useRef(null);
  const tooltip = useRef(null);

  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setForecastData(data.list);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  useEffect(() => {
    if (!forecastData) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = select(chartContainer.current).select('svg');
    svg.selectAll('*').remove();

    const xScale = scaleTime()
      .domain(d3.extent(forecastData, (d) => new Date(d.dt * 1000)))
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, d3.max(forecastData, (d) => d.main.temp)])
      .range([height, 0]);

    const lineGenerator = line()
      .x((d) => xScale(new Date(d.dt * 1000)))
      .y((d) => yScale(d.main.temp));

    svg.append('path').data([forecastData]).attr('class', 'line').attr('d', lineGenerator);

    // Add circles as data points
    svg
      .selectAll('circle')
      .data(forecastData)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(new Date(d.dt * 1000)))
      .attr('cy', (d) => yScale(d.main.temp))
      .attr('r', 4)
      .attr('class', 'data-point')
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    // Add X-axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(axisBottom(xScale).ticks(5).tickFormat(timeFormat('%b %d')));

    // Add Y-axis
    svg.append('g').call(axisLeft(yScale));

    // Tooltip setup
    tooltip.current = select(chartContainer.current)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    function handleMouseOver(d) {
      select(this).attr('r', 6);
      tooltip.current.transition().duration(200).style('opacity', 0.9);
      tooltip.current
        .html(
          `<strong>${new Date(d.dt * 1000).toLocaleDateString()}</strong><br/>Temperature: ${d.main.temp}°C`
        )
        .style('left', event.pageX + 'px')
        .style('top', event.pageY - 28 + 'px');
    }

    function handleMouseOut() {
      select(this).attr('r', 4);
      tooltip.current.transition().duration(500).style('opacity', 0);
    }
  }, [forecastData]);

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <div ref={chartContainer}></div>;
};

export default WeatherForecastChart;

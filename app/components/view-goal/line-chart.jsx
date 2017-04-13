import React from 'react';
import  { Line, } from 'react-chartjs-2';
import { pepper, } from './icons.js';

const tickOptions = {
  beginAtZero: true,
  stepSize: 1,
  fontColor: '#fff',
  suggestedMin: -3,
  suggestedMax: 13,
};

const axesOptions = {
  display: false,
  ticks: tickOptions,
  gridLines: {
    color: '#fff',
  },
  barThickness: 10,
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [ axesOptions, ],
    xAxes: [ axesOptions, ],
  },
  legend: {
    display: false,
  },
};

const chartHeight = 300;
const chartWidth = 1000;

const getScores = arr => arr.map(rating => rating.score);
const compileData = arr => arr.length
  ? [0,].concat(getScores(arr)).concat(arr[arr.length - 1].score)
  : [];

const getStyles = (arr, avatar) =>
  ['circle',].concat(Array(arr.length).fill(avatar));

const getLabels = arr => Array(arr.length + 2).fill('');

const LineChart = React.createClass({

  render() {
    const latestRatings = this.props.ratings;
    const icon = new Image ();
    icon.src = pepper;

    const chartData = {
      labels: getLabels(latestRatings),
      datasets: [
        {
          data: compileData(latestRatings),
          lineTension: 0.3,
          borderColor: 'hotpink',
          fill: false,
          pointBorderColor: 'transparent',
          pointStyle: getStyles(latestRatings, icon),
          radius: 0,
        },
      ],
    };

    return <Line
      data={ chartData }
      options={ chartOptions }
      height={ chartHeight }
      width={ chartWidth }
    />;
  },
});

LineChart.propTypes = {
  ratings: React.PropTypes.array,
};

export default LineChart;

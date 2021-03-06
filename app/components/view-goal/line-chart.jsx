import React from 'react';
import PropTypes from 'prop-types';
import  { Line, } from 'react-chartjs-2';

/* icons for nodes on chart */
import icons from './../../avatars.js';

const getRatingFromIndex = (index, ratings) => ratings[index - 1].id;

const getScaleLabelOptions = (label) => ({
  display: true,
  labelString: label,
  fontColor: 'white',
  fontSize: 16,
});

const getAxesOptions = (axis, isChartPreview) => {

  const gridLineColors = Array(2).fill('transparent')
    .concat(Array(10).fill('#fff'));

  const tickOptions = {
    beginAtZero: true,
    stepSize: 1,
    suggestedMin: -1,
    suggestedMax: 12,
    display: false,
  };

  const defaultOptions = {
    display: false,
    ticks: tickOptions,
    barThickness: 5,
  };

  return isChartPreview
    ? defaultOptions
    : axis === 'x'
        ? {
          ...defaultOptions,
          scaleLabel: getScaleLabelOptions('Time'),
          display: true,
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent',
          },
        }
        : {
          ...defaultOptions,
          scaleLabel: getScaleLabelOptions('Ratings'),
          display: true,
          gridLines: {
            color: gridLineColors,
            lineWidth: 0.5,
            zeroLineColor: '#fff',
            zeroLineWidth: 2,
          },
        };
};

const getOptions = (isChartPreview, fn) => {

  return {
    responsive: true,
    maintainAspectRatio: false,
    onClick: isChartPreview
      ? null
      : fn,
    scales: {
      yAxes: isChartPreview
        ? [ getAxesOptions('y', true), ]
        : [ getAxesOptions('y', false), ],
      xAxes: isChartPreview
        ? [ getAxesOptions('x', true), ]
        : [ getAxesOptions('x', false), ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  };
};

const chartHeight = 260;
const chartWidth = 1000;

const getScores = arr => arr.map(rating => rating.score);

const compileData = arr => arr.length
  ? [ 0, ].concat(getScores(arr)).concat(arr[arr.length - 1].score)
  : [];

const getStyles = (arr, avatar) =>
  [ 'circle', ].concat(Array(arr.length).fill(avatar));

const getLabels = arr => Array(arr.length + 2).fill('');

const getIconSrc = (icons, avatar) =>
  icons.find(icon => icon.avatar === avatar).image;

const LineChart = React.createClass({

  render() {

    const avatar = this.props.avatar;
    const latestRatings = this.props.ratings;
    const icon = new Image ();
    icon.src = getIconSrc(icons, avatar);

    const clickFunction = (_, activePoints) => {
      const index = activePoints[0]._index;
      const rating = getRatingFromIndex(index, latestRatings);
      this.props.onSelectRating(rating);
    };

    const chartOptions = getOptions(this.props.isChartPreview, clickFunction);

    const chartData = {
      labels: getLabels(latestRatings),
      datasets: [
        {
          data: compileData(latestRatings),
          label: 'Ratings',
          lineTension: 0.3,
          borderColor: '#fff',
          fill: false,
          pointBorderColor: 'transparent',
          pointStyle: getStyles(latestRatings, icon),
          hitRadius: 25,
        },
      ],
    };

    return <Line
      data={ chartData }
      options={ chartOptions }
      width={ chartWidth }
      height={ chartHeight }
    />;
  },
});

LineChart.propTypes = {
  ratings: PropTypes.array,
  avatar: PropTypes.string,
  isChartPreview: PropTypes.boolean,
  onSelectRating: PropTypes.func,
};

export default LineChart;

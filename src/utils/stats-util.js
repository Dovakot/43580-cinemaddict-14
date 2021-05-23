import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ChartConfig = {
  TYPE: 'horizontalBar',
  START: 'start',
  BG_COLOR: '#ffe800',
  COLOR: '#ffffff',
  FONT_SIZE: 20,
  OFFSET: 40,
  BAR_THICKNESS: 24,
  TICKS_PADDING: 100,
};

const getStatsChart = (statisticCtx, genres, genresCount) => new Chart(statisticCtx, {
  plugins: [ChartDataLabels],
  type: ChartConfig.TYPE,
  data: {
    labels: genres,
    datasets: [{
      data: genresCount,
      backgroundColor: ChartConfig.BG_COLOR,
      hoverBackgroundColor: ChartConfig.BG_COLOR,
      anchor: ChartConfig.START,
    }],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: ChartConfig.FONT_SIZE,
        },
        color: ChartConfig.COLOR,
        anchor: ChartConfig.START,
        align: ChartConfig.START,
        offset: ChartConfig.OFFSET,
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: ChartConfig.COLOR,
          padding: ChartConfig.TICKS_PADDING,
          fontSize: ChartConfig.FONT_SIZE,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: ChartConfig.BAR_THICKNESS,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      }],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  },
});

export default getStatsChart;

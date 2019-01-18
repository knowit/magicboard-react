export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        display: true,
        ticks: {
          fontSize: 14,
          fontColor: 'white',
        },
      },
    ],
    yAxes: [
      {
        display: true,
        ticks: {
          fontSize: 20,
          fontColor: 'white',
        },
      },
    ],
  },
  legend: {
    labels: {
      // This more specific font property overrides the global property
      fontColor: 'white',
      fontSize: 18,
    },
  },
  layout: {
    padding: {
      left: 10,
      right: 90,
      top: 0,
      bottom: 15,
    },
  },
  elements: {
    line: {
      tension: 0.3, // bezier curves
    },
  },
  plugins: {
    datalabels: {
      display: false,
    },
  },
};

export const dataObject = {
  // label: ,
  // data: ,
  backgroundColor: 'rgba(65, 149, 165, 0.2)',
  borderColor: 'rgb(65, 149, 165)',
  borderWidth: 1,
  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
  hoverBorderColor: 'rgba(255,99,132,1)',
};

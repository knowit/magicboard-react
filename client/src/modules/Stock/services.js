// @flow
import type { StockItem } from './types';

const fetchStockPrice = async (stockItem: StockItem) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=${stockItem.type}&symbol=${
      stockItem.symbol
    }&apikey=${stockItem.apikey}`,
  );
  return response.json();
};

const generateStockData = async (stockItem: StockItem): Object => {
  const stocks = await fetchStockPrice(stockItem);

  const serie = stocks['Time Series (Daily)'];

  const x = [];
  const y = [];

  if (serie) {
    Object.entries(serie).forEach(([key: string, value: Object]) => {
      const index = '4. close';
      // $FlowFixMe
      x.unshift(value[index]);
      y.unshift(key);
    });

    // $FlowFixMe
    const slicedX = x.slice(stockItem.numberOfDatapoints);
    // $FlowFixMe
    const slicedY = y.slice(stockItem.numberOfDatapoints);

    return { x: slicedX, y: slicedY };
  }
  return {};
};

export const generateChartData = async (stockItem: StockItem) => {
  const stockData: {
    x: Array<string>,
    y: Array<string>,
  } = await generateStockData(stockItem);
  const data = {
    labels: stockData.y,
    datasets: [
      {
        label: stockItem.symbol,
        backgroundColor: 'rgba(65, 149, 165, 0.2)',
        borderColor: 'rgb(65, 149, 165)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: stockData.x,
      },
    ],
  };

  const options = {
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
    plugins: {
      datalabels: {
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 4,
        align: 'right',
        font: {
          weight: 'bold',
          size: 20,
        },
        formatter: (value: string) => parseFloat(value).toFixed(2),
        display: (context: Object) =>
          context.dataIndex === stockData.y.length - 1,
      },
    },
  };

  return { data, options };
};

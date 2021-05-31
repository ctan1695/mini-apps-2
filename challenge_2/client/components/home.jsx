import React from 'react';
import { Line } from 'react-chartjs-2';

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dateRange: [],
      data: []
    }

    this.getDateLabels = this.getDateLabels.bind(this);
  }

  componentDidMount() {
    let data = [];
    this.setState({
      dateRange: this.getDateLabels(new Date(2021, 0, 1), new Date(2021, 0, 31))
    });

    return fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=2021-01-01&end=2021-01-31')
      .then((res) => {
        return res.json();
      })
      .then((resJSON) => {
        console.log('resJSON: ', resJSON.bpi);

        for (let key in resJSON.bpi) {
          data.push(resJSON.bpi[key]);
        }

        this.setState({data: data});
      })


  }

  getDateLabels(begin, end) {
    let currentDate = begin;
    let result = [];
    let oneDay = 1000 * 60 * 60 * 24;
    let numberOfDays = Math.round(end - begin)/oneDay;

    while (numberOfDays >= 0) {
        result.push(new Date(currentDate).toDateString());
        currentDate.setDate(currentDate.getDate() + 1);
        numberOfDays--;
    }
    return result;
  }

  render() {
    const data = {
      labels: this.state.dateRange,
      datasets: [{
          fill: false,
          label: 'Closing Prices',
          data: this.state.data,
          borderColor: 'purple',
          backgroundColor: 'purple',
          lineTension: 0,
      }]
    }
    const options = {
      type: 'line',
      data: data,
      options: {
          fill: false,
          responsive: true,
          scales: {
              y: {
                  ticks: {
                      callback: (value, index, values) => {
                          return `${value} (BTC)`;
                      }
                  }
              }
          }
      }
    }

    return (
      <div>
        <h1>Cryptocurrency Charting Tool</h1>
        <span>Powered by </span>
        <a href="https://www.coindesk.com/price/bitcoin">CoinDesk</a>

        <Line data={data} options={options} />
      </div>
    )
  }
}

export default Home;
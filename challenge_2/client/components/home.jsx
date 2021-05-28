import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Cryptocurrency Charting Tool</h1>
        <span>Powered by </span>
        <a href="https://www.coindesk.com/price/bitcoin">CoinDesk</a>
      </div>
    )
  }
}

export default Home;
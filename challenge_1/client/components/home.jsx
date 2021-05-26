import React from 'react';
import SearchForm from './searchForm.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Historical Events Finder</h1>
        <SearchForm />
      </div>
    )
  }
}

export default Home;
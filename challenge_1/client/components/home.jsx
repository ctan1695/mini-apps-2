import React from 'react';
import axios from 'axios';
import SearchForm from './searchForm.jsx';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    };

    this.clickSearch = this.clickSearch.bind(this);
  }

  clickSearch(event) {
    event.preventDefault();

    let searchValue = event.target[0].value;

    axios.get(`http://localhost:3000/events?q=${searchValue}`)
      .then((res) => {
        this.setState({searchResults: res.data});
        console.log('res.data: ', res.data);
      })
      .catch((err) => {
        console.log(`Error calling GET for full-text search: ${err}`);
      })
  }

  render() {
    return (
      <div>
        <h1>Historical Events Finder</h1>
        <SearchForm handleSearch={this.clickSearch}/>
      </div>
    )
  }
}

export default Home;
import React from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import SearchForm from './searchForm.jsx';
import SearchResults from './searchResults.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      searchResults: [],
      totalPages: 0
    };

    this.buildURL = this.buildURL.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
    this.loadPage = this.loadPage.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  buildURL(query, page) {
    return `http://localhost:3000/events?q=${query}&&_page=${page}&_limit=10`;
  }

  clickSearch(event) {
    event.preventDefault();

    let searchValue = event.target[0].value;
    let currentPage = this.buildURL(searchValue, 1)

    axios.get(currentPage)
      .then((res) => {
        let parsedHeader = {};
        let splitHeaderLink = res.headers.link.split(',');
        let parseHelper = [];

        for (let i = 0; i < splitHeaderLink.length; i++) {
          let currLink = splitHeaderLink[i].split(';');
          let linkType = currLink[1].split('=').pop();

          if (linkType.indexOf("\"first\"") > -1) {
            linkType = 'first';
          } else if (linkType.indexOf("\"next\"") > -1) {
            linkType = 'next';
          } else if (linkType.indexOf("\"prev\"") > -1) {
            linkType = 'prev';
          } else if (linkType.indexOf("\"last\"") > -1) {
            linkType = 'last';

            let beginPagePosition = currLink[0].indexOf('page');
            let endPagePosition = currLink[0].indexOf('&', beginPagePosition);

            this.setState({totalPages: currLink[0].slice(beginPagePosition + 5, endPagePosition)});
          }

          parsedHeader[linkType] = currLink[0].trim();
        }

        this.setState({
          searchValue: searchValue,
          searchResults: res.data
        });
      })
      .catch((err) => {
        console.log(`Error calling GET for full-text search: ${err}`);
      })
  }

  loadPage(targetPage) {
    axios.get(targetPage)
      .then((res) => {
        this.setState({
          searchResults: res.data
        })
      })
      .catch((err) => {
        console.log(`Error accessing page ${targetPage}: ${err}`);
      })
  }

  handlePagination(data) {
    let selectedPage = data.selected + 1;
    let targetPage = this.buildURL(this.state.searchValue, selectedPage);

    this.loadPage(targetPage);
  }

  render() {
    return (
      <div>
        <h1>Historical Events Finder</h1>
        <SearchForm handleSearch={this.clickSearch}/>
        <SearchResults results={this.state.searchResults} />
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePagination}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    )
  }
}

export default Home;
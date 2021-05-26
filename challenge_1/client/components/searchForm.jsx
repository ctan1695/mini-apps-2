import React from 'react';

const SearchForm = (props) => {
  return (
    <form class="search-form" onSubmit={props.handleSearch}>
      <div class="search-query">
        <label for="searchInput">Search for historical events: </label>
        <input type="text" name="searchInput" id="search-input" required></input>
        <input type="submit" value="Search"></input>
      </div>
    </form>
  )
}

export default SearchForm;
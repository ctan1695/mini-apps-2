import React from 'react';

const SearchResults = (props) => {
  let display = props.results.map((result) => {
    return (
      <div>
        <div>{result.description}</div>
        <br></br>
      </div>
      )
  });

  return (
    <div>
      {display}
    </div>
  )
};

export default SearchResults;
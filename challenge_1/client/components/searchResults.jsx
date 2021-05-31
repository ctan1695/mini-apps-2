import React from 'react';

const SearchResults = (props) => {
  let display = props.results.map((result) => {
    let dateText = '';

    if (result.date < 0) {
      dateText = `In ${Math.abs(result.date)} B.C.: `;
    } else if (result.date.includes('/')) {
      dateText = `On ${result.date}: `;
    } else {
      dateText = `In the year ${result.date}: `;
    }

    return (
      <div>
        <span><b>{dateText}</b></span>
        <span>{result.description}</span>
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
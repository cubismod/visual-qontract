import React from 'react';
import { Gallery } from '@patternfly/react-core';
import SearchBar from './SearchBar';

function GridSearch({ data, filterText, changeFilterText, changeSelected, options, selected }) {
  return (
    <React.Fragment>
      <Gallery hasGutter>
        <SearchBar
          filterText={filterText}
          handleFilterTextChange={changeFilterText}
          handleSelect={changeSelected}
          options={options}
          selected={selected}
        />
        {data}
      </Gallery>
    </React.Fragment>
  );
}

export default GridSearch;

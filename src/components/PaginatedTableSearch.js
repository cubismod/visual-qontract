import React, { useState } from 'react';
import { Grid, GridItem } from '@patternfly/react-core';
import { Table, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

function PaginatedTableSearch({ filterText, changeFilterText, changeSelected, options, selected, columns, rows }) {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const paginatedRows = rows.slice((page - 1) * perPage, page * perPage);

  return (
    <React.Fragment>
      <Grid hasGutter>
        <GridItem span={8}>
          <SearchBar
            filterText={filterText}
            handleFilterTextChange={changeFilterText}
            handleSelect={changeSelected}
            options={options}
            selected={selected}
          />
        </GridItem>
        <GridItem span={4}>
          <Pagination
            itemCount={rows.length}
            perPage={perPage}
            page={page}
            onSetPage={setPage}
            onPerPageSelect={setPerPage}
          />
        </GridItem>
      </Grid>

      <Table aria-label="Paginated search results table" variant="compact">
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index}>{column.header.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {paginatedRows.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <Td key={colIndex}>
                  {column.cell && column.cell.formatters
                    ? column.cell.formatters.reduce(
                        (value, formatter) => formatter(value),
                        row[column.property]
                      )
                    : row[column.property]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </React.Fragment>
  );
}

export default PaginatedTableSearch;

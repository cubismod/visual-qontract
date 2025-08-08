import React from 'react';
import { Table, TableHeader, TableBody, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import SearchBar from './SearchBar';

function TableSearch({ filterText, changeFilterText, changeSelected, options, selected, columns, rows }) {
  return (
    <React.Fragment>
      <SearchBar
        filterText={filterText}
        handleFilterTextChange={changeFilterText}
        handleSelect={changeSelected}
        options={options}
        selected={selected}
      />
      <Table aria-label="Search results table" variant="compact">
        <Thead>
          <Tr>
            {columns.map((column, index) => (
              <Th key={index}>{column.header.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, rowIndex) => (
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

export default TableSearch;

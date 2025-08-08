import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import { sortByName } from './Utils';

function ServiceEndPoints({ endPoints }) {
  const headerFormat = value => value;
  const cellFormat = value => value;
  const linkFormat = url => value => <a href={`${url || ''}${value}`}>{value}</a>;

  return (
    <Table aria-label="Service endpoints table" variant="compact">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Description</Th>
          <Th>URL</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sortByName(endPoints).map((endPoint, index) => (
          <Tr key={endPoint.name || index}>
            <Td>{endPoint.name}</Td>
            <Td>{endPoint.description}</Td>
            <Td><a href={endPoint.url}>{endPoint.url}</a></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default ServiceEndPoints;

import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import { sortByName } from './Utils';

function CodeComponents({ components }) {
  const headerFormat = value => value;
  const cellFormat = value => value;
  const linkFormat = url => value => <a href={`${url || ''}${value}`}>{value}</a>;

  return (
    <Table aria-label="Code components table" variant="compact">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Resource</Th>
          <Th>URL</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sortByName(components).map((component, index) => (
          <Tr key={component.name || index}>
            <Td>{component.name}</Td>
            <Td>{component.resource}</Td>
            <Td><a href={component.url}>{component.url}</a></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default CodeComponents;

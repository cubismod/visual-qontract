import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import { sortByName } from './Utils';

function ServiceSLODocuments({ documents }) {
  const headerFormat = value => value;
  const cellFormat = value => value;
  const linkFormat = url => value => <a href={`${url || ''}${value}`}>{value}</a>;
  const elements = [];

  for (const document of documents) {
    const element = (
      <div>
        <h5>{document.name}</h5>
        <Table aria-label={`SLO table for ${document.name}`} variant="compact">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>SLI Type</Th>
              <Th>SLI Specification</Th>
              <Th>SLO Details</Th>
              <Th>SLO Target</Th>
              <Th>Dashboard</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortByName(document.slos).map((slo, index) => (
              <Tr key={slo.name || index}>
                <Td>{slo.name}</Td>
                <Td>{slo.SLIType}</Td>
                <Td>{slo.SLISpecification}</Td>
                <Td><a href={slo.SLODetails}>{slo.SLODetails}</a></Td>
                <Td>{slo.SLOTarget}</Td>
                <Td><a href={slo.dashboard}>{slo.dashboard}</a></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    );
    elements.push(element);
  }
  return <>{elements}</>;
}

export default ServiceSLODocuments;

import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import { Link } from 'react-router-dom';
import { sortByName } from '../../components/Utils';
import OnboardingStatus from '../../components/OnboardingStatus';

function Services({ services, omitParentApp }) {
  const headerFormat = value => value;
  const cellFormat = value => value;
  const onboardingStatusFormat = value => <OnboardingStatus state={value} />;

  services = sortByName(services.slice()).map(s => {
    s.name_path = [s.name, s.path];
    if (s.parentApp) {
      s.parentAppLink = <Link to={{ pathname: '/services', hash: s.parentApp.path }}>{s.parentApp.name}</Link>;
    }
    if (s.serviceOwners) {
      s.serviceOwnersItems = (
        <ul>
          {s.serviceOwners.map(so => (
            <li key={so.name}>{so.name}</li>
          ))}
        </ul>
      );
    }
    return s;
  });

  let columns = [
    {
      header: {
        label: 'Name',
        formatters: [headerFormat]
      },
      cell: {
        formatters: [
          value => (
            <Link
              to={{
                pathname: '/services',
                hash: value[1]
              }}
            >
              {value[0]}
            </Link>
          ),
          cellFormat
        ]
      },
      property: 'name_path'
    },
    {
      header: {
        label: 'Onboarding Status',
        formatters: [headerFormat]
      },
      cell: {
        formatters: [onboardingStatusFormat, cellFormat]
      },
      property: 'onboardingStatus'
    },
    {
      header: {
        label: 'Service Owners',
        formatters: [headerFormat]
      },
      cell: {
        formatters: [cellFormat]
      },
      property: 'serviceOwnersItems'
    },
    {
      header: {
        label: 'Parent App',
        formatters: [headerFormat]
      },
      cell: {
        formatters: [cellFormat]
      },
      property: 'parentAppLink'
    },
    {
      header: {
        label: 'Description',
        formatters: [headerFormat]
      },
      cell: {
        formatters: [cellFormat]
      },
      property: 'description'
    }
  ];

  if (omitParentApp) {
    columns = columns.filter((value, index, array) => value.property !== 'parentAppLink');
  }

  return (
    <Table aria-label="Services table" variant="compact">
      <Thead>
        <Tr>
          {columns.map((column, index) => (
            <Th key={index}>{column.header.label}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {sortByName(services).map((service, rowIndex) => (
          <Tr key={service.name || rowIndex}>
            {columns.map((column, colIndex) => (
              <Td key={colIndex}>
                {column.cell && column.cell.formatters
                  ? column.cell.formatters.reduce(
                      (value, formatter) => formatter(value),
                      service[column.property]
                    )
                  : service[column.property]}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default Services;

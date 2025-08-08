import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from '@patternfly/react-table';
import { sortByName } from '../../components/Utils';

function AppSREClustersTable({ clusters, apps }) {
  const appByName = appName => apps.find(a => a.name === appName);
  const headerFormat = value => value;
  const cellFormat = value => value;
  const workloadsFormat = workloadsList => (
    <ul>
      {workloadsList.map(w => (
        <li>{w}</li>
      ))}
    </ul>
  );
  const appsFormat = appsList =>
    appsList.map(appName => (
      <span className="service_badge" key={appName}>
        <Link to={{ pathname: '/services', hash: appByName(appName).path }}>{appName}</Link>
      </span>
    ));

  return (
    <Table aria-label="AppSRE clusters table" variant="compact">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Description</Th>
          <Th>Services</Th>
          <Th>Version</Th>
          <Th>Hypershift</Th>
          <Th>Channel</Th>
          <Th>Upgrade workloads</Th>
          <Th>Upgrade schedule</Th>
          <Th>Upgrade soak days</Th>
          <Th>ID</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sortByName(clusters).map((cluster, index) => (
          <Tr key={cluster.name || index}>
            <Td>
              <Link
                to={{
                  pathname: '/clusters',
                  hash: cluster.path
                }}
              >
                {cluster.name}
              </Link>
              &nbsp;&nbsp;
              <a href={cluster.consoleUrl} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-desktop" />
              </a>
            </Td>
            <Td>{cluster.description}</Td>
            <Td>{appsFormat(cluster.apps)}</Td>
            <Td>{cluster.version}</Td>
            <Td>{cluster.hypershift}</Td>
            <Td>{cluster.channel}</Td>
            <Td>{workloadsFormat(cluster.upgrade_workloads)}</Td>
            <Td>{cluster.upgrade_schedule}</Td>
            <Td>{cluster.upgrade_soak_days}</Td>
            <Td>{cluster.id}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

function ExternalClustersTable({ clusters }) {
  const headerFormat = value => value;
  const cellFormat = value => value;
  return (
    <Table aria-label="External clusters table" variant="compact">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sortByName(clusters).map((cluster, index) => (
          <Tr key={cluster.name || index}>
            <Td>
              <Link
                to={{
                  pathname: '/clusters',
                  hash: cluster.path
                }}
              >
                {cluster.name}
              </Link>
              &nbsp;&nbsp;
              <a href={cluster.consoleUrl}>
                <i className="fa fa-desktop" />
              </a>
            </Td>
            <Td>{cluster.description}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

function Clusters({ clusters, apps }) {
  const clustersData = clusters.map(c => {
    c.name_path = [c.name, c.path, c.consoleUrl];

    if (c.spec) {
      c.version = c.spec.version;
      c.channel = c.spec.channel;
      c.id = c.spec.id;
      c.external_id = c.spec.external_id;
      c.hypershift = String(c.spec.hypershift === true);
    }

    c.upgrade_workloads = [];
    if (c.upgradePolicy) {
      c.upgrade_schedule = `${c.upgradePolicy.schedule}`;
      if (c.upgradePolicy.workloads) {
        c.upgrade_workloads = c.upgradePolicy.workloads;
      }
      if (c.upgradePolicy.conditions && c.upgradePolicy.conditions.soakDays != null) {
        c.upgrade_soak_days = c.upgradePolicy.conditions.soakDays;
      }
    }

    return c;
  });

  const appsreClusters = clustersData.filter(c => c.spec);
  const externalClusters = clustersData.filter(c => !c.spec);

  return (
    <>
      <h2>AppSRE Clusters</h2>
      <AppSREClustersTable clusters={appsreClusters} apps={apps} />

      <h2>External Clusters</h2>
      <ExternalClustersTable clusters={externalClusters} />
    </>
  );
}

export default Clusters;

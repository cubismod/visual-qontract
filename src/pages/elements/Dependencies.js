import React, { useState } from 'react';
import { Grid, GridItem, Card, CardHeader, CardBody, CardFooter, CardTitle } from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import { chunk } from 'lodash';
import GridSearch from '../../components/GridSearch';
import { sortByName } from '../../components/Utils';

function Dependencies({ dependencies }) {
  // cardsWidth * cardsPerRow must be <= 12 (bootstrap grid)
  const cardWidth = 4;
  const cardsPerRow = 3;
  const [selected, changeSelected] = useState('Name');
  const [filterText, changeFilterText] = useState('');
  const lcFilter = filterText.toLowerCase();
  function matches(c) {
    return selected === 'Name' && c.name.toLowerCase().includes(lcFilter);
  }
  const matchedData = dependencies.filter(matches);
  const rows = chunk(sortByName(matchedData), cardsPerRow).map(c => (
    <Grid key={c[0].path} hasGutter>
      {c.map(s => (
        <GridItem span={cardWidth} key={s.path}>
          <Card>
            <CardHeader>
              <CardTitle>{s.name}</CardTitle>
            </CardHeader>
            <CardBody>
              <p>{s.description}</p>
            </CardBody>
            <CardFooter>
              <p>
                <Link
                  to={{
                    pathname: '/dependencies',
                    hash: s.path
                  }}
                >
                  Details
                </Link>
              </p>
            </CardFooter>
          </Card>
        </GridItem>
      ))}
    </Grid>
  ));

  return (
    <GridSearch
      data={rows}
      filterText={filterText}
      changeFilterText={changeFilterText}
      changeSelected={changeSelected}
      selected={selected}
    />
  );
}

export default Dependencies;

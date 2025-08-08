import React from 'react';
import { Link } from 'react-router-dom';
import { chunk } from 'lodash';
import { Gallery, Grid, GridItem, Card, CardHeader, CardBody, CardFooter, CardTitle } from '@patternfly/react-core';
import { sortByName } from '../../components/Utils';

function AWSAccounts({ awsaccounts }) {
  // cardsWidth * cardsPerRow must be <= 12 (bootstrap grid)
  const cardWidth = 4;
  const cardsPerRow = 3;
  const rows = chunk(sortByName(awsaccounts), cardsPerRow).map(c => (
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
                    pathname: '/awsaccounts',
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

  return <Gallery hasGutter>{rows}</Gallery>;
}

export default AWSAccounts;

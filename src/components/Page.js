import React from 'react';
import { Grid, GridItem, Button, PageSection } from '@patternfly/react-core';
import { Link } from 'react-router-dom';

function Page({ title, body, path, create }) {
  return (
    <PageSection>
      <Grid>
        <GridItem span={12}>
          <div className="page-header">
            <h1>
              {title}
              {path && (
                <span className="edit-button">
                  <Button 
                    component="a" 
                    href={`${window.DATA_DIR_URL}${path}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Edit
                  </Button>
                </span>
              )}
              {create && (
                <span className="edit-button">
                  <Button 
                    component={(props) => <Link {...props} to={{ pathname: create.path, hash: create.hash }} />}
                  >
                    {create.label}
                  </Button>
                </span>
              )}
            </h1>
          </div>
        </GridItem>
      </Grid>
      {body}
    </PageSection>
  );
}

export default Page;

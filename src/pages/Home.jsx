import * as React from 'react';
import { 
  Grid, 
  GridItem, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardBody,
  Button,
  Gallery,
  GalleryItem,
  Text,
  TextContent,
  TextVariants,
  Divider,
  List,
  ListItem,
  Icon
} from '@patternfly/react-core';
import { 
  ExternalLinkAltIcon,
  ServerIcon,
  UsersIcon,
  CogIcon,
  ChartAreaIcon,
  BellIcon
} from '@patternfly/react-icons';

function HomePage({ history }) {
  const navigateToPage = (path) => {
    if (history) {
      history.push(path);
    }
  };

  const quickActions = [
    {
      title: 'Services',
      description: 'Manage and view all services in your infrastructure',
      icon: <ServerIcon size="lg" />,
      path: '/services',
      color: 'blue'
    },
    {
      title: 'Clusters',
      description: 'Monitor and manage your Kubernetes clusters',
      icon: <ServerIcon size="lg" />,
      path: '/clusters',
      color: 'green'
    },
    {
      title: 'Users & Roles',
      description: 'Manage user access and role permissions',
      icon: <UsersIcon size="lg" />,
      path: '/users',
      color: 'purple'
    },
    {
      title: 'Reports',
      description: 'View system reports and analytics',
      icon: <ChartAreaIcon size="lg" />,
      path: '/reports',
      color: 'orange'
    },
    {
      title: 'Integrations',
      description: 'Configure external service integrations',
      icon: <CogIcon size="lg" />,
      path: '/integrations',
      color: 'cyan'
    },
    {
      title: 'Notifications',
      description: 'Manage alerts and notification settings',
      icon: <BellIcon size="lg" />,
      path: '/notifications',
      color: 'red'
    }
  ];

  const externalLinks = [
    { name: 'Data Repository', url: window.DATA_DIR_URL },
    { name: 'Documentation', url: window.DOCS_BASE_URL },
    { name: 'Schemas', url: window.SCHEMAS_DIR },
    { name: 'Grafana Dashboards', url: `${window.GF_ROOT_URL}/dashboards` },
    { name: 'Source Code', url: 'https://github.com/app-sre/visual-qontract' }
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Card style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <CardBody style={{ padding: '40px' }}>
          <TextContent>
            <Text component={TextVariants.h1} style={{ color: 'white', fontSize: '2.5rem', marginBottom: '16px' }}>
              Welcome to App-Interface
            </Text>
            <Text component={TextVariants.p} style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', maxWidth: '600px' }}>
              Your centralized platform for managing services, infrastructure, and configurations. 
              Navigate through your cloud resources, monitor deployments, and maintain system integrity.
            </Text>
          </TextContent>
        </CardBody>
      </Card>

      <Grid hasGutter>
        {/* Quick Actions Section */}
        <GridItem span={8}>
          <Card style={{ height: '100%' }}>
            <CardHeader>
              <CardTitle>
                <Text component={TextVariants.h2}>Quick Actions</Text>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Gallery hasGutter minWidths={{ default: '300px' }}>
                {quickActions.map((action, index) => (
                  <GalleryItem key={index}>
                    <Card 
                      isClickable 
                      onClick={() => navigateToPage(action.path)}
                      style={{ 
                        height: '160px', 
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        borderLeft: `4px solid var(--pf-global--palette--${action.color}-400)`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                      }}
                    >
                      <CardBody style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                          <div style={{ marginRight: '12px', color: `var(--pf-global--palette--${action.color}-400)` }}>
                            {action.icon}
                          </div>
                          <Text component={TextVariants.h3} style={{ margin: 0 }}>
                            {action.title}
                          </Text>
                        </div>
                        <Text component={TextVariants.p} style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                          {action.description}
                        </Text>
                      </CardBody>
                    </Card>
                  </GalleryItem>
                ))}
              </Gallery>
            </CardBody>
          </Card>
        </GridItem>

        {/* External Resources Section */}
        <GridItem span={4}>
          <Card style={{ height: '100%' }}>
            <CardHeader>
              <CardTitle>
                <Text component={TextVariants.h2}>External Resources</Text>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <TextContent style={{ marginBottom: '20px' }}>
                <Text component={TextVariants.p} style={{ color: '#6c757d' }}>
                  Quick access to external tools and documentation
                </Text>
              </TextContent>
              <List isPlain>
                {externalLinks.map((link, index) => (
                  <ListItem key={index} style={{ marginBottom: '12px' }}>
                    <Button
                      variant="link"
                      isInline
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        padding: '8px 12px', 
                        textAlign: 'left', 
                        width: '100%',
                        justifyContent: 'space-between',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <span>{link.name}</span>
                      <ExternalLinkAltIcon size="sm" />
                    </Button>
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>
        </GridItem>

        {/* System Overview Section */}
        <GridItem span={12} style={{ marginTop: '24px' }}>
          <Card>
            <CardHeader>
              <CardTitle>
                <Text component={TextVariants.h2}>About App-Interface</Text>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Grid hasGutter>
                <GridItem span={6}>
                  <TextContent>
                    <Text component={TextVariants.h3}>What is App-Interface?</Text>
                    <Text component={TextVariants.p}>
                      App-Interface is a centralized configuration and service management platform that provides 
                      a unified view of your infrastructure. It serves as the single source of truth for 
                      application configurations, deployment pipelines, and infrastructure resources.
                    </Text>
                  </TextContent>
                </GridItem>
                <GridItem span={6}>
                  <TextContent>
                    <Text component={TextVariants.h3}>Key Features</Text>
                    <List>
                      <ListItem>Service and application lifecycle management</ListItem>
                      <ListItem>Infrastructure resource monitoring</ListItem>
                      <ListItem>User access and permission control</ListItem>
                      <ListItem>Integration with external tools and services</ListItem>
                      <ListItem>Comprehensive reporting and analytics</ListItem>
                    </List>
                  </TextContent>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}

export default HomePage;

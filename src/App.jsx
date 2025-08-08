import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import { 
  Page, 
  Nav, 
  NavItem, 
  NavGroup, 
  Masthead, 
  MastheadToggle, 
  MastheadMain, 
  MastheadBrand, 
  PageSidebar, 
  PageSidebarBody 
} from '@patternfly/react-core';
import { routes } from './routes';
import './App.css';
import introspectionQueryResultData from './fragmentTypes.json';
import NotFoundPage from './pages/NotFoundPage';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
  cache,
  uri: window.GRAPHQL_URI || '/graphql'
});

class App extends React.Component {
  constructor() {
    super();

    this.menu = routes();
  }

  handleNavClick = event => {
    event.preventDefault();
    const target = event.currentTarget;
    const { history } = this.props;
    if (target.getAttribute) {
      const href = target.getAttribute('href');
      history.push(href);
    }
  };

  renderContent = () => {
    const allRoutes = [];
    this.menu.map((item, index) => {
      allRoutes.push(<Route key={index} exact path={item.to} component={item.component} />);
      return allRoutes;
    });

    return (
      <Switch>
        {allRoutes}
        <Route component={NotFoundPage} />
        <Redirect from="*" to="/" key="default-route" />
      </Switch>
    );
  };

  navigateTo = path => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { location } = this.props;
    
    const navItems = this.menu.map(item => {
      const active = location.pathname === item.to;
      const subItemActive = item.subItems && item.subItems.some(itemB => location.pathname === item.to);
      
      if (item.subItems) {
        return (
          <NavGroup key={item.to} title={item.title}>
            {item.subItems.map(secondaryItem => (
              <NavItem
                key={secondaryItem.to}
                isActive={secondaryItem.to === location.pathname}
                onClick={() => this.navigateTo(secondaryItem.to)}
              >
                {secondaryItem.title}
              </NavItem>
            ))}
          </NavGroup>
        );
      }
      
      return (
        <NavItem
          key={item.to}
          isActive={active}
          onClick={() => this.navigateTo(item.to)}
        >
          {item.title}
        </NavItem>
      );
    });

    const masthead = (
      <Masthead>
        <MastheadMain>
          <MastheadBrand>APP-INTERFACE</MastheadBrand>
        </MastheadMain>
      </Masthead>
    );

    const sidebar = (
      <PageSidebar>
        <PageSidebarBody>
          <Nav>
            {navItems}
          </Nav>
        </PageSidebarBody>
      </PageSidebar>
    );

    return (
      <ApolloProvider client={client}>
        <Page masthead={masthead} sidebar={sidebar}>
          {this.renderContent()}
        </Page>
      </ApolloProvider>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(App);

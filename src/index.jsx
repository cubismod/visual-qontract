import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { unregister } from './registerServiceWorker';
import AppWrapper from './AppWrapper';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Router>
    <AppWrapper />
  </Router>
);

// unregister service worker
unregister();

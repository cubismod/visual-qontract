import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import App from './App';

function AppWrapper() {
  const navigate = useNavigate();
  const location = useLocation();

  // Create a history-like object for backwards compatibility
  const history = {
    push: (path) => navigate(path),
    replace: (path) => navigate(path, { replace: true }),
    go: (n) => navigate(n),
    goBack: () => navigate(-1),
    goForward: () => navigate(1)
  };

  return <App history={history} location={location} />;
}

export default AppWrapper;
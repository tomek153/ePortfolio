import React from 'react';
import './App.css';
import './Css/animations.css';
import './Css/auth-header.css';
import './Css/auth.css';
import './Css/profile.css';
import './Css/start.css';

import ContentRoute from './Route/content-route';
import HeaderRoute from './Route/header-route';

function App() {
  return (
    <>
      <HeaderRoute />
      <ContentRoute />
    </>
  );
}

export default App;

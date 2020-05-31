import React from 'react';
import './App.css';
import './css/animations.css'

import ContentRoute from './route/content-route';
import HeaderRoute from './route/header-route';

function App() {
  return (
    <>
      <HeaderRoute />
      <ContentRoute />
    </>
  );
}

export default App;

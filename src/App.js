import React from 'react';
import Table from './components/Table';
import './App.css';
import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <Table />
    </PlanetProvider>
  );
}

export default App;

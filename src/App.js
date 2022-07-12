import React from 'react';
import Table from './components/Table';
import './App.css';
import PlanetProvider from './context/PlanetProvider';
import Filters from './components/Filters';

function App() {
  return (
    <PlanetProvider>
      <Filters />
      <Table />
    </PlanetProvider>
  );
}

export default App;

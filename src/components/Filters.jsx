import React, { useContext, useState } from 'react';
import contextPlanet from '../context/contextPlanet';

function Filters() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [number, setNumber] = useState(0);
  const state = useContext(contextPlanet);
  const { filterPlanet, filterByName, filter3Selectors } = state;
  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          value={ filterByName }
          name="planet"
          onChange={ filterPlanet }
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          onChange={ (event) => setColumnFilter(event.target.value) }
          value={ columnFilter }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (event) => setComparisonFilter(event.target.value) }
          value={ comparisonFilter }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ number }
          onChange={ (event) => setNumber(event.target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => filter3Selectors(columnFilter, comparisonFilter, number) }
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}

export default Filters;

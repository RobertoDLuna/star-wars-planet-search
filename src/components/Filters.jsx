import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

export default function FilterBar() {
  const { filter, setFilter, filteredByName, setData } = useContext(DataContext);

  const [compareFilter, setCompareFilter] = useState('maior que');
  const [numericFilter, setnumericFilter] = useState('0');
  const [tagFilter, setTagFilter] = useState('population');

  const handleClick = () => {
    setFilter({
      ...filter,
      FiltersValues: [
        { compareFilter, numericFilter, tagFilter }],
    });

    const FilterComparer = filteredByName.filter((elem) => {
      if (compareFilter === 'maior que') {
        return Number(elem[tagFilter]) > Number(numericFilter);
      }
      if (compareFilter === 'menor que') {
        return Number(elem[tagFilter]) < Number(numericFilter);
      }
      if (compareFilter === 'igual a') {
        return Number(elem[tagFilter]) === Number(numericFilter);
      }
      return null;
    });
    setData(FilterComparer);
  };

  return (
    <div className="filter-bar-father">
      <label htmlFor="tagFilter">
        <select
          name="tagFilter"
          id="tagFilter"
          value={ tagFilter }
          data-testid="column-filter"
          onChange={ ({ target: { value } }) => setTagFilter(value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
          <option value="diameter">diameter</option>
        </select>
      </label>
      <label htmlFor="compareFilter">
        <select
          name="compareFilter"
          id="compareFilter"
          value={ compareFilter }
          data-testid="comparison-filter"
          onChange={ ({ target: { value } }) => setCompareFilter(value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="numericFilter">
        <input
          name="numericFilter"
          id="numericFilter"
          type="text"
          data-testid="value-filter"
          value={ numericFilter }
          onChange={ ({ target: { value } }) => setnumericFilter(value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleClick() }
      >
        Filtrar
      </button>
    </div>
  );
}

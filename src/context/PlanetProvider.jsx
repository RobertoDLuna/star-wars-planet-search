/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import contextPlanet from './contextPlanet';

function PlanetProvider(props) {
  const [fetchAllPlanets, setFetchAllPlanets] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [lines, setLines] = useState([]);
  const { children } = props;

  const arrayData = (array) => {
    const topics = Object.keys(array[0]);
    const topicsFilter = topics.filter((topic) => topic !== 'residents');
    const title = topicsFilter.map((topic, index) => (
      <th key={ index }>{topic}</th>
    ));
    const row = array.map((result, index) => (
      <tr key={ index }>
        {
          Object.values(result).map((resp, i) => (
            <td key={ i }>{resp}</td>
          ))
        }
      </tr>
    ));
    setColumns(title);
    setLines(row);
  };

  useEffect(async () => {
    const fetchApi = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const fetchJson = await fetchApi.json();
    setFetchAllPlanets(fetchJson);
    arrayData(fetchJson.results);
  }, []);

  const filterPlanet = ({ target }) => {
    const { value } = target;
    setFilterByName(value);
    if (value.length === 0) {
      arrayData(fetchAllPlanets.results);
    } else {
      const filter = fetchAllPlanets.results.filter((resp) => resp.name.includes(value));
      arrayData(filter);
    }
  };

  const filter3Selectors = (columnFilter, comparisonFilter, number) => {
    const num = Number(number);
    const array = fetchAllPlanets.results.filter((p) => {
      const titles = Object.entries(p);
      const column = titles.filter((resp) => resp[0] === columnFilter);
      if (comparisonFilter === 'maior que') {
        if (Number((column[0][1])) > num) return p;
      } else if (comparisonFilter === 'menor que') {
        if (Number((column[0][1])) < num) return p;
      } else if (Number((column[0][1])) === num) return p;
      return null;
    });
    if (array.length === 0) {
      arrayData(fetchAllPlanets.results);
    } else {
      arrayData(array);
    }
  };

  return (
    <contextPlanet.Provider
      value={ {
        columns,
        lines,
        filterByName,
        filterPlanet,
        filter3Selectors,
      } }
    >
      {children}
    </contextPlanet.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PlanetProvider;

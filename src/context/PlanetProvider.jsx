import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import contextPlanet from './contextPlanet';

function PlanetProvider(props) {
  const [showTopics, setShowTopics] = useState([]);
  const [lines, setLines] = useState([]);
  const { children } = props;

  useEffect(async () => {
    const fetchApi = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const fetchJson = await fetchApi.json();
    const topics = Object.keys(fetchJson.results[0]);
    const topicsFilter = topics.filter((topic) => topic !== 'residents');
    const title = topicsFilter.map((topic, index) => (
      <th key={ index }>{topic}</th>
    ));
    const row = fetchJson.results.map((result, index) => (
      <tr key={ index }>
        {Object.values(result).map((resp, i) => (
          <td key={ i }>{resp}</td>
        ))}
      </tr>
    ));
    setShowTopics(title);
    setLines(row);
  }, []);

  return (
    <contextPlanet.Provider value={ { showTopics, lines } }>
      {children}
    </contextPlanet.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PlanetProvider;

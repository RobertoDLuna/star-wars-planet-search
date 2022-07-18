import React, { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import Header from './Header';
import Filters from './Filters';

function Table() {
  const { data, filter, filteredByName, setFilteredByName } = useContext(DataContext);

  useEffect(() => {
    const { name } = filter;
    const filterPlanetsName = data.filter((elem) => (
      elem.name.includes(name)
    ));
    setFilteredByName(filterPlanetsName);
  }, [filter, data, setFilteredByName]);

  return (
    data.length && (
      <div className="Table">
        <Header />
        <Filters />
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((e) => (
                <th key={ e }>{e}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredByName.map((planet, index) => (
              <tr key={ index }>
                {Object.values(planet).map((e, i) => <td key={ i }>{e}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

export default Table;

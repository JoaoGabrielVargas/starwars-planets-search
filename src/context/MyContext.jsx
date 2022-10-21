import React, { createContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import fetchData from '../services/api';

export const MyContext = createContext([]);

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const setPlanets = async () => {
      const json = await fetchData();
      const { results } = json;
      results.forEach((element) => {
        delete element.residents;
      });
      setData(results);
    };
    setPlanets();
  }, [setData]);

  const getDataByFilters = (planets, filters) => {
    const newPlanetList = planets.filter(
      (planet) => filters.some((filter) => {
        switch (filter.comparison) {
        case 'menor que':
          return planet[filter.column] < Number(filter.value);
        case 'igual a':
          return planet[filter.column] === filter.value;
        default:
          return planet[filter.column] > Number(filter.value);
        }
      }),
    );
    setFiltered(newPlanetList);
  };

  useEffect(() => {
    setFiltered(data);
  }, [data]);

  const [query, setQuery] = useState('');
  const [columns, setColumns] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const contextValue = useMemo(() => ({ data,
    setData,
    query,
    setQuery,
    columns,
    setColumns,
    filtered,
    setFiltered,
    getDataByFilters }), [data, query, columns, filtered]);
  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;

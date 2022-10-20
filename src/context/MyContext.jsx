import React, { createContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import fetchData from '../services/api';

export const MyContext = createContext([]);

function Provider({ children }) {
  const [data, setData] = useState([]);

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
  }, []);

  const [query, setQuery] = useState('');
  const [columns, setColumns] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  const contextValue = useMemo(() => ({ data,
    setData,
    query,
    setQuery,
    columns,
    setColumns }), [data, query, columns]);
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

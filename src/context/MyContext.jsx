import React, { createContext, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext([]);

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      results.forEach((element) => {
        delete element.residents;
      });
      setData(results);
    };
    fetchData();
  }, []);

  const [query, setQuery] = useState('');

  const contextValue = useMemo(() => ({ data, setData, query, setQuery }));
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

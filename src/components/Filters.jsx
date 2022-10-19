import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';

function Filters() {
  const { query, setQuery } = useContext(MyContext);
  const handleTextFilter = (event) => {
    setQuery(event.target.value);
  };

  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ handleTextFilter }
      value={ query }
    />
  );
}

export default Filters;

import React, { useContext, useState } from 'react';
import { MyContext } from '../context/MyContext';

function Filters() {
  const { query, setQuery, data, setData } = useContext(MyContext);
  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const handleTextFilter = (event) => {
    setQuery(event.target.value);
  };

  const handleFilters = ({ target: { value, name } }) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { column, comparison, value } = filters;
    console.log(column, comparison, value);
    const filterData = data.filter((e) => {
      console.log(e);
      switch (comparison) {
      case 'maior que':
        console.log(e[column]);
        console.log(Number(value));
        return Number(e[column]) > Number(value);
      case 'menor que':
        console.log(e[column]);
        return Number(e[column]) < Number(value);
      default:
        console.log('valor da coluna', e[column]);
        console.log('valor do numero', Number(value));
        return Number(e[column]) === Number(value);
      }
    });
    setData(filterData);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleTextFilter }
        value={ query }
      />
      <select
        data-testid="column-filter"
        defaultValue="population"
        onChange={ handleFilters }
        name="column"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ handleFilters }
        defaultValue="maior que"
        name="comparison"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ handleFilters }
        value={ filters.value }
        name="value"
      />
      <input type="submit" data-testid="button-filter" value="Filtrar" />
    </form>
  );
}

export default Filters;

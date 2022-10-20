import React, { useContext, useState } from 'react';
import { MyContext } from '../context/MyContext';

function Filters() {
  const { query, setQuery, data, setData, columns, setColumns } = useContext(MyContext);
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
    const excludeColumn = columns.filter((e) => e !== column);
    const filterData = data.filter((e) => {
      switch (comparison) {
      case 'maior que':
        return Number(e[column]) > Number(value);
      case 'menor que':
        return Number(e[column]) < Number(value);
      default:
        return Number(e[column]) === Number(value);
      }
    });
    setColumns(excludeColumn);
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
        { columns.map((e, index) => (
          <option value={ e } key={ index }>{ e }</option>)) }
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

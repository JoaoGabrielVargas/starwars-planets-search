import React, { useContext, useState } from 'react';
import { MyContext } from '../context/MyContext';

function Filters() {
  const { query,
    setQuery,
    data, columns, setColumns, filtered, setFiltered } = useContext(MyContext);
  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [order, setOrder] = useState({
    order: { column: 'population', sort: 'ASC' },
  });

  const [filtersToRender, setFiltersToRender] = useState([]);

  const handleTextFilter = (event) => {
    setQuery(event.target.value);
  };

  const filterPlanets = () => {
    const { column, value, comparison } = filters;
    const filteredPlanets = filtered.filter((planet) => {
      const columnValueToCompare = Number(planet[column]);
      const valueToCompare = Number(value);
      switch (comparison) {
      case 'maior que':
        return columnValueToCompare > valueToCompare;
      case 'menor que':
        return columnValueToCompare < valueToCompare;
      default:
        return columnValueToCompare === valueToCompare;
      }
    });
    setFiltered(filteredPlanets);
  };

  const handleChange = ({ target }) => {
    const { name: targetName, value: targetValue } = target;
    setFilters((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const checkFilterSize = () => {
    if (filtersToRender.length === 1) {
      setFiltered(data);
    } else {
      const filterAgain = data.filter(
        (planet) => filtersToRender.some((filter) => {
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
      setFiltered(filterAgain);
    }
  };

  const handleRemove = (column) => {
    const filterToDelete = filtersToRender.filter((e) => e.column !== column);
    setFiltersToRender(filterToDelete);
    setFilters(filterToDelete);
    checkFilterSize();
  };

  const handleRemoveAll = () => {
    setFiltersToRender([]);
    setFilters({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
    setFiltered(data);
  };

  // PARTE DE SORT ---------------

  const handleSort = ({ target }) => {
    const { name, value } = target;
    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const compareToSort = (a, b) => {
    const { column, sort } = order;
    const NEGATIVE = -1;
    const POSITIVE = 1;
    if (sort === 'ASC') {
      if (b[column] === 'unknown') { return NEGATIVE; }
      if (Number(a[column]) > Number(b[column])) {
        return POSITIVE;
      }
      if (Number(a[column]) < Number(b[column])) {
        return NEGATIVE;
      }
      return 0;
    }
    if (sort === 'DESC') {
      if (Number(a[column]) > Number(b[column])) {
        return NEGATIVE;
      }
      if (Number(a[column]) < Number(b[column])) {
        return POSITIVE;
      }
      return 0;
    }
  };

  const clickOrder = () => {
    setFiltered((prev) => [...prev].sort(compareToSort));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFiltersToRender((prevState) => ([
      ...prevState,
      filters,
    ]));
    const excludeColumn = columns.filter((e) => e !== filters.column);
    setColumns(excludeColumn);
    filterPlanets();
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleTextFilter }
        value={ query || '' }
      />
      <select
        data-testid="column-filter"
        value={ filters.column || '' }
        onChange={ handleChange }
        onClick={ handleChange }
        name="column"
      >
        { columns.map((e, index) => (
          <option value={ e } key={ index }>{ e }</option>)) }
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ handleChange }
        value={ filters.comparison || '' }
        name="comparison"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ handleChange }
        value={ filters.value }
        name="value"
      />
      <input type="submit" data-testid="button-filter" value="Filtrar" />
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleRemoveAll }
      >
        Excluir Filtros
      </button>
      <select
        data-testid="column-sort"
        name="column"
        onClick={ handleSort }
        onChange={ handleSort }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="asc-sort">
        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-asc"
          value="ASC"
          id="asc-sort"
          onClick={ handleSort }
        />
        Ascendente
      </label>
      <label htmlFor="desc-sort">
        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-desc"
          value="DESC"
          id="desc-sort"
          onClick={ handleSort }
        />
        Descendente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ clickOrder }
      >
        Ordenar
      </button>
      <div>
        {
          filtersToRender.map((e, index) => (
            <div key={ index } data-testid="filter">
              <span>
                {e.column}
                {' '}
                {e.comparison}
                {' '}
                {e.value}
                {' '}
                <button
                  type="button"
                  data-testid="btn-delete-filter"
                  onClick={ () => handleRemove(e.column) }
                >
                  X
                </button>
              </span>
            </div>))
        }
      </div>
    </form>
  );
}

export default Filters;

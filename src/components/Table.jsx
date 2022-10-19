import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';

function Table() {
  const { data, query } = useContext(MyContext);
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { data.length > 0 && data.filter((e) => e.name.includes(query)).map((e) => (
          <tr key={ e.name }>
            <td>
              { e.name }
              {' '}
            </td>
            <td>
              { e.rotation_period }
              {' '}
            </td>
            <td>
              { e.orbital_period }
              {' '}
            </td>
            <td>
              { e.diameter }
              {' '}
            </td>
            <td>
              { e.climate }
              {' '}
            </td>
            <td>
              { e.gravity }
              {' '}
            </td>
            <td>
              { e.terrain }
              {' '}
            </td>
            <td>
              { e.surface_water }
              {' '}
            </td>
            <td>
              { e.population }
              {' '}
            </td>
            <td>
              { e.films }
              {' '}
            </td>
            <td>
              { e.created }
              {' '}
            </td>
            <td>
              { e.edited }
              {' '}
            </td>
            <td>
              { e.url }
              {' '}
            </td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;

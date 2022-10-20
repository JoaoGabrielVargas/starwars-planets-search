import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Provider from '../context/MyContext';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';


describe('Testa os campos de filtro', ()=> {
   test('Testa se a chamada a API é realizada e os planetas estão visíveis', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    render(<Provider><App /></Provider>)
  })

  test('Testa se o campo de busca está visível', ()=> {
    render(<Provider><App /></Provider>);
    const searchInput = screen.getByTestId('name-filter');
    expect(searchInput).toBeInTheDocument();
  })

  test('Testa se o select para selecionar a coluna é visível', ()=> {
    render(<Provider><App /></Provider>);
    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();
  })

  test('Testa se o select para selecionar a comparação é visível', ()=> {
    render(<Provider><App /></Provider>);
    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();
  })

  test('Testa se o input de números é visível', ()=> {
    render(<Provider><App /></Provider>);
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
  })

  test('Testa se é possível filtrar utilizando os selects', ()=> {
    render(<Provider><App /></Provider>);
    const columnFilter = screen.getByTestId('column-filter');
    userEvent.click(columnFilter, 'diameter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.click(comparisonFilter, 'maior que');
    const valueFilter = screen.getByTestId('value-filter');    
  })
})

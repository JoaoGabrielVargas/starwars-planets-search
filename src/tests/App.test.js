import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import Provider from '../context/MyContext';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';


describe('Testa os campos de filtro', ()=> {
  beforeEach( async ()=> {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    await act(()=> {
      render(<Provider><App /></Provider>)
    })
  })
  test('Testa se a chamada a API é realizada e os planetas estão visíveis', async () => {
    expect(fetch).toBeCalled();
    const tatooine = screen.getByText("Tatooine", { timeout: 5000 });
    expect (tatooine).toBeInTheDocument();
  })

  test('Testa se o campo de busca está visível', ()=> {
    
    const searchInput = screen.getByTestId('name-filter');
    expect(searchInput).toBeInTheDocument();
  })

  test('Testa se o select para selecionar a coluna é visível', ()=> {
    
    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();
  })

  test('Testa se o select para selecionar a comparação é visível', ()=> {
   
    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();
  })

  test('Testa se o input de números é visível', ()=> {
   
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
  })

  test('Testa se é possível filtrar utilizando os selects', ()=> {
   
    const columnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilter,'diameter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter,'maior que')
    const valueFilter = screen.getByTestId('value-filter');   
    userEvent.type(valueFilter, "100000")
    const button = screen.getByTestId('button-filter');
    userEvent.click(button);
    const bespin = screen.getByText("Bespin", { timeout: 5000 });
    expect (bespin).toBeInTheDocument();
    const planetRows = screen.getAllByTestId('planet-name');
    expect (planetRows.length).toBe(1);
  })

  test('Testa os campos de comparação dos selects', ()=> {
   
    const columnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilter,'orbital_period');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter,'menor que')
    const valueFilter = screen.getByTestId('value-filter');   
    userEvent.type(valueFilter, "400");
    const button = screen.getByTestId('button-filter');
    userEvent.click(button);
    const tatooine = screen.getByText("Tatooine", { timeout: 5000 });
    expect (tatooine).toBeInTheDocument();
    const planetRows = screen.getAllByTestId('planet-name');
    expect(planetRows.length).toBe(5);
  })
  
})

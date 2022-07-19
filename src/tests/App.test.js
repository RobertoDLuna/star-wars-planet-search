import React from 'react';
import App from '../App';
import { cleanup, render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import MockApi from './MockApi'
import userEvent from '@testing-library/user-event';

describe('Testa se a página é renderizada corretamente' ,() => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(MockApi)
    })
    await act(async () => {
      render(<App />)
    })
  });
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  })

  test('Testa se o handleChange funciona corretamente', async () => {
    expect(fetch).toHaveBeenCalled()
    expect(await screen.findAllByRole('row')).toHaveLength(11)

    const Filter = screen.getByTestId('name-filter');
    userEvent.type(Filter, 'Tatooine')
    expect(await screen.findAllByRole('row')).toHaveLength(2)
  });

  test('Testa se o filtro "igual a" está funcionando', async () => {
    expect(fetch).toHaveBeenCalled()
    expect(await screen.findAllByRole('row')).toHaveLength(11)

    const valueFilter = screen.getByTestId('value-filter');
    const btnFiltrar = screen.getByTestId('button-filter');

    fireEvent.change(screen.getByTestId('comparison-filter'), {target: { value: "igual a"} });

    userEvent.type(valueFilter, '1000000')
    userEvent.click(btnFiltrar);

    expect(screen.getByText(/0/i)).toBeInTheDocument();

  });
});

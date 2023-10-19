import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

describe('<App />', () => {
  /* test('should work', () => {
    render(<App />)
    screen.debug();
  });*/
  //e2e test es un test de integracion que prueba la aplicacion completa. Test de punta a punta (end to end)

  test('should add a new item and remove the item', async () => {
    const user = userEvent.setup();

    render(<App />);

    // buscar el input
    const input = screen.getByRole('textbox');
    expect(input).toBeDefined();

    // buscar el form
    const form = screen.getByRole('form');
    expect(form).toBeDefined();

    form.querySelector('input')?.focus();
    expect(document.activeElement).toBe(input); //comprobar que el input esta activo

    const button = form.querySelector('button');
    expect(button).toBeDefined();

    //escribir en el input
    const randomText = crypto.randomUUID();
    await user.type(input, randomText);
    await user.click(button!);

    //Asegurarse que el elemento se ha añadido
    const list = screen.getByRole('list');
    expect(list).toBeDefined();

    expect(list.children.length).toBe(1);

    //Asegurarse que el elemento se ha eliminado
    const item = screen.getByText(randomText); //buscar el elemento por el texto
    expect(item).toBeDefined();

    await user.click(item);

    const noResults = screen.getByText('No hay elementos en la lista. 😢');
    expect(noResults).toBeDefined();
  });
});

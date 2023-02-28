import { toBeChecked } from '@testing-library/jest-dom/dist/matchers';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const { screen } = require('@testing-library/react');

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeVisible();
  });

  test('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeVisible();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);

    const linkFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(linkFavoritePokemon).toBeVisible();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    expect(history.location.pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);

    expect(history.location.pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(linkFavoritePokemon);

    expect(history.location.pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pagina-que-não-existe');
    });

    const titleNotFound = screen.getByText('Page requested not found');
    expect(titleNotFound).toBeVisible();
  });
});

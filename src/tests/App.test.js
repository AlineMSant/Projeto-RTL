import App from '../App';
import renderWithRouter from './renderWithRouter';

const { screen } = require('@testing-library/react');

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('O primeiro link deve possuir o texto Home', () => {
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeVisible();
  });

  test('O segundo link deve possuir o texto About', () => {
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeVisible();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémon', () => {
    const linkFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(linkFavoritePokemon).toBeVisible();
  });
});

// test('', () => {});

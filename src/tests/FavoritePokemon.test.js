import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste ao favoritar a partir da página de detalhes', () => {
  beforeEach(() => renderWithRouter(<App />));
  const favoriteTitleText = 'Favorite Pokémon';

  test('É exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    const linkDetails = screen.getByRole('link', { name: 'More details' });

    userEvent.click(linkDetails);

    const linkFavoritePokemon = screen.getByRole('link', { name: favoriteTitleText });

    userEvent.click(linkFavoritePokemon);

    const noFavoriteFoundText = screen.getByText('No favorite Pokémon found');
    expect(noFavoriteFoundText).toBeVisible();
  });

  test('Apenas são exibidos os Pokémon favoritados', () => {
    const linkDetails = screen.getByRole('link', { name: 'More details' });

    userEvent.click(linkDetails);

    const labelFavoritePokemon = screen.getByLabelText('Pokémon favoritado?');

    userEvent.click(labelFavoritePokemon);

    const linkFavoritePokemon = screen.getByRole('link', { name: favoriteTitleText });

    userEvent.click(linkFavoritePokemon);

    const imgFavorite = screen.getAllByRole('img');
    expect(imgFavorite[0]).toBeVisible();
  });
});

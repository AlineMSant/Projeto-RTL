import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste ao favoritar a partir da página de detalhes', () => {
  test('É exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkDetails).toBeVisible();

    userEvent.click(linkDetails);

    const linkFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(linkFavoritePokemon).toBeVisible();

    userEvent.click(linkFavoritePokemon);
    const noFavoriteFoundText = screen.getByText('No favorite Pokémon found');
    expect(noFavoriteFoundText).toBeVisible();
  });
});

// const labelFavoritePokemon = screen.getByLabelText('Pokémon favoritado?');
//     expect(labelFavoritePokemon).toBeInTheDocument();

//     userEvent.click(labelFavoritePokemon);
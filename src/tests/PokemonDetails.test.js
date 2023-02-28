import userEvent from '@testing-library/user-event';
import App from '../App'; // perguntar
import renderWithRouter from './renderWithRouter';

const { screen } = require('@testing-library/react');

describe('Teste PokemonDetails.js', () => {
  const textMoreDetails = 'More details';

  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: textMoreDetails });

    userEvent.click(linkDetails);

    const titlesDetails = screen.getAllByRole('heading', { level: 2 });
    expect(titlesDetails[0].innerHTML).toBe('Pikachu Details');
    expect(titlesDetails[1].innerHTML).toBe('Summary');
    expect(titlesDetails[2].innerHTML).toBe('Game Locations of Pikachu');

    expect(linkDetails).not.toBeInTheDocument();

    const textDetails = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(textDetails).toBeVisible();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: textMoreDetails });

    userEvent.click(linkDetails);

    // perguntar Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;

    // perguntar Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização;

    const allImg = screen.getAllByRole('img');
    expect(allImg[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(allImg[2]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(allImg[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(allImg[2]).toHaveAttribute('alt', 'Pikachu location');

    expect(allImg[1]).toBeVisible();
    expect(allImg[2]).toBeVisible();

    const firstLocationText = screen.getByText('Kanto Viridian Forest');
    const secondLocationText = screen.getByText('Kanto Power Plant');
    expect(firstLocationText).toBeVisible();
    expect(secondLocationText).toBeVisible();
  });

  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes:', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: textMoreDetails });

    userEvent.click(linkDetails);

    const checkboxFavorite = screen.getByRole('checkbox');
    expect(checkboxFavorite).toBeVisible();

    const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(labelFavorite).toBeVisible();

    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    userEvent.click(checkboxFavorite);

    const favoriteLink = screen.getByText('Favorite Pokémon');
    userEvent.click(favoriteLink);

    const titlePokemon = screen.getByText('Pikachu');
    expect(titlePokemon).toBeVisible();

    const linkDetailsFavorite = screen.getByRole('link', { name: textMoreDetails });
    userEvent.click(linkDetailsFavorite);

    const checkboxFavoriteAgain = screen.getByRole('checkbox');
    expect(checkboxFavoriteAgain).toBeVisible();
    userEvent.click(checkboxFavoriteAgain);

    const favoriteLinkAgain = screen.getByText('Favorite Pokémon');
    userEvent.click(favoriteLinkAgain);

    const titlePokemonAgain = screen.getByText('No favorite Pokémon found');
    expect(titlePokemonAgain).toBeInTheDocument();
  });
});

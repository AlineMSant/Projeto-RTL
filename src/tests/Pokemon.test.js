import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const { screen } = require('@testing-library/react');

describe('Teste Pokemon.js', () => {
  const textMoreDetails = 'More details';

  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const title = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const wight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img');

    expect(title).toBeVisible();
    expect(type).toBeVisible();
    expect(wight).toBeVisible();
    expect(img).toBeVisible();

    expect(title.innerHTML).toBe('Pikachu');
    expect(type.innerHTML).toBe('Electric');
    expect(wight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
    expect(img).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: textMoreDetails });
    expect(linkDetails).toHaveAttribute('href', '/pokemon/25');
  });

  test('Teste se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: textMoreDetails });

    userEvent.click(linkDetails);

    expect(history.location.pathname).toBe('/pokemon/25');
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: textMoreDetails });

    userEvent.click(linkDetails);

    expect(history.location.pathname).toContain('/pokemon'); // perguntar
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: textMoreDetails });

    userEvent.click(linkDetails);

    const labelFavoritePokemon = screen.getByLabelText('Pokémon favoritado?');

    userEvent.click(labelFavoritePokemon);

    const allImg = screen.getAllByRole('img');
    expect(allImg[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(allImg[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});

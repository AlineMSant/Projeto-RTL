import userEvent from '@testing-library/user-event';
import App from '../App'; // perguntar
import renderWithRouter from './renderWithRouter';

const { screen } = require('@testing-library/react');

describe('Teste componente Pokedex', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('A página contém um heading h2 com o texto Encountered Pokémon', () => {
    const title = screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });

    expect(title).toBeVisible();
  });

  test('É exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', () => {
    const arrayPokemons = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

    arrayPokemons.forEach((pokemon) => {
      if (pokemon === 'Dragonair') { // perguntar
        const nameLastPokemon = screen.getByText('Dragonair');
        expect(nameLastPokemon).toBeVisible();

        const buttonNext = screen.getByText('Próximo Pokémon');
        userEvent.click(buttonNext);

        const nameFirstAgain = screen.getByText('Pikachu');
        expect(nameFirstAgain).toBeVisible();
      } else {
        const namePokemon = screen.getByText(pokemon);
        expect(namePokemon).toBeVisible();

        const buttonNext = screen.getByText('Próximo Pokémon');
        userEvent.click(buttonNext);
      }
    });
  });

  test('É mostrado apenas um Pokémon por vez', () => {
    const linkMoreDetails = screen.getAllByRole('link', { name: 'More details' });

    expect(linkMoreDetails).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons[0].innerHTML).toBe('Electric');
    expect(filterButtons[1].innerHTML).toBe('Fire');
    expect(filterButtons[2].innerHTML).toBe('Bug');
    expect(filterButtons[3].innerHTML).toBe('Poison');
    expect(filterButtons[4].innerHTML).toBe('Psychic');
    expect(filterButtons[5].innerHTML).toBe('Normal');
    expect(filterButtons[6].innerHTML).toBe('Dragon');

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeVisible();

    const typePokemon = screen.getByTestId('pokemon-type');
    const buttonNext = screen.getByTestId('next-pokemon');

    userEvent.click(filterButtons[4]);
    expect(allButton).toBeVisible();
    expect(typePokemon.innerHTML).toEqual(filterButtons[4].innerHTML);

    userEvent.click(buttonNext);
    expect(allButton).toBeVisible(); // perguntar
    expect(typePokemon.innerHTML).toEqual(filterButtons[4].innerHTML);

    // A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado;
    userEvent.click(allButton);
    expect(typePokemon.innerHTML).toEqual(filterButtons[0].innerHTML);

    userEvent.click(allButton);
    expect(typePokemon.innerHTML).toEqual(filterButtons[0].innerHTML);
  });
});

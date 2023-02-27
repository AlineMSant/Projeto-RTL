import userEvent from '@testing-library/user-event';
import App from '../App';
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
      if (pokemon === 'Dragonair') {
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
});

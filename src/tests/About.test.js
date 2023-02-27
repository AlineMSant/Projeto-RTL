import { About } from '../pages';

const { screen, render } = require('@testing-library/react');

describe('Teste se a página About contém as informações sobre a Pokédex', () => {
  beforeEach(() => render(<About />));

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutTitle).toBeVisible();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    const aboutText = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const aboutText2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');

    expect(aboutText).toBeVisible();
    expect(aboutText2).toBeVisible();
  });

  test('Teste se a página contém a imagem de uma Pokédex;', () => {
    const aboutImg = screen.getByRole('img');

    expect(aboutImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');

    expect(aboutImg).toBeVisible();
  });
});

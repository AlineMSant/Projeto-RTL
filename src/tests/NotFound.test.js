import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const { screen } = require('@testing-library/react');

describe('Teste componente NotFound', () => {
  test('A página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pagina-que-nao-existe');
    });

    const notFoundTitle = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(notFoundTitle).toBeVisible();
  });

  test('A página mostra a imagem correta', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pagina-que-nao-existe');
    });

    const notFoundImg = screen.getByRole('img');

    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(notFoundImg).toBeVisible();
  });
});

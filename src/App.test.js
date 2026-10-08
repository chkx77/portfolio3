import { render, screen } from '@testing-library/react';
import App from './App';

test('permite explorar proyectos y contactar sin una pantalla de espera', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Matías Romero/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Ferretería PRO' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Ver código de Agenda Pro' })).toHaveAttribute('href', 'https://github.com/chkx77/agenda2');
  expect(screen.getByRole('textbox', { name: 'Mensaje' })).toBeInTheDocument();
});

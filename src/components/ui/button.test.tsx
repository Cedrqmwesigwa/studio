
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './button'; // Adjust the import path as necessary

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /Click Me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-primary text-primary-foreground'); // Default variant
  });

  test('renders with a specific variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    const buttonElement = screen.getByRole('button', { name: /Delete/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-destructive text-destructive-foreground');
  });

  test('renders with a specific size', () => {
    render(<Button size="lg">Large Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Large Button/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('h-11 rounded-md px-8'); // lg size
  });

  test('renders as a child when asChild prop is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    // Check if it's an anchor tag, not a button
    const linkElement = screen.getByRole('link', { name: /Link Button/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe('A');
    // eslint-disable-next-line jest-dom/prefer-enabled-disabled
    expect(linkElement).not.toBeDisabled();
  });

  test('renders as disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Disabled Button/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const buttonElement = screen.getByRole('button', { name: /Clickable/i });
    buttonElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

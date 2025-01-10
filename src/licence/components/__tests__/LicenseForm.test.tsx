import { describe, it, beforeEach, expect } from 'vitest';

import { LicenseForm } from '../LicenseForm';

import { render, screen, fireEvent, waitFor } from '@/tests/setup';

describe('LicenseForm', () => {
  beforeEach(() => {
    localStorage.setItem('language', 'en');
  });

  it('renders the form with initial values', () => {
    render(<LicenseForm onSubmit={() => {}} />);

    expect(screen.getByTestId('firstName')).toBeInTheDocument();
    expect(screen.getByTestId('lastName')).toBeInTheDocument();
    expect(screen.getByTestId('dateOfBirth')).toBeInTheDocument();
    expect(screen.getByTestId('gender')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('option')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const mockOnSubmit = (data: unknown) => {
      expect(data).toEqual(
        expect.objectContaining({
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1990-01-01',
          email: 'john.doe@example.com',
          option: 1,
          drivingLicense: expect.any(String),
        })
      );
    };

    render(<LicenseForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByTestId('firstName'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('lastName'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('dateOfBirth'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByTestId('option'), { target: { value: '1' } });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      const generatedLicense = screen.getByTestId('generatedLicense');
      expect(generatedLicense.textContent?.length).toBeGreaterThan(0);
      // The assertion is done in the mockOnSubmit function
    });
  });

  it('shows validation error for invalid email', async () => {
    render(<LicenseForm onSubmit={() => {}} />);

    fireEvent.change(screen.getByTestId('email'), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findByText('Invalid email format')).toBeInTheDocument();
  });

  it('generates random data on inspire button click', async () => {
    render(<LicenseForm onSubmit={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /generate/i }));

    await waitFor(() => {
      // Check for the generated license text
      const generatedLicense = screen.getByTestId('generatedLicense');
      expect(generatedLicense).toBeInTheDocument();
      expect(generatedLicense.textContent?.length).toBeGreaterThan(0);
    });
  });

  it('resets the form on reset button click', async () => {
    render(<LicenseForm onSubmit={() => {}} />);

    const firstNameInput = screen.getByTestId('firstName') as HTMLInputElement;

    // Change the input value
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John'); // Verify input was changed

    // Find and click the reset button
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    // Wait for potential async reset operations
    await waitFor(() => {
      // Re-query the input to ensure we get the most up-to-date state
      const updatedFirstNameInput = screen.getByTestId('firstName') as HTMLInputElement;
      expect(updatedFirstNameInput.value).toBe(''); // Verify reset to empty string
    });
  });
});

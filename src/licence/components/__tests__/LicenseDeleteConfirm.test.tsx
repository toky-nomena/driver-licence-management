import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';

import { LicenseDeleteConfirm } from '../LicenseDeleteConfirm';

import { TranslationProvider } from '@/i18n/TranslationContext';

describe('LicenseDeleteConfirm', () => {
  const renderWithTranslation = (ui: React.ReactElement) => {
    return render(<TranslationProvider>{ui}</TranslationProvider>);
  };

  const mockLicense = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    drivingLicense: 'DL123456',
    middleName: '',
  };

  beforeEach(() => {
    localStorage.setItem('language', 'en');
  });

  it('renders delete confirmation trigger', () => {
    renderWithTranslation(<LicenseDeleteConfirm licence={mockLicense} onConfirm={() => {}} />);

    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeInTheDocument();
  });

  it('displays correct confirmation message', () => {
    renderWithTranslation(<LicenseDeleteConfirm licence={mockLicense} onConfirm={() => {}} />);

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    // Check confirmation dialog content
    expect(screen.getByText(/remove entry/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/cannot be undone/i)).toBeInTheDocument();
  });

  it('calls onConfirm when remove action is clicked', () => {
    const mockOnConfirm = vi.fn();
    renderWithTranslation(<LicenseDeleteConfirm licence={mockLicense} onConfirm={mockOnConfirm} />);

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    const removeButton = screen.getByRole('delete');
    fireEvent.click(removeButton);

    expect(mockOnConfirm).toHaveBeenCalledOnce();
  });

  it('allows canceling the delete action', () => {
    const mockOnConfirm = vi.fn();
    renderWithTranslation(<LicenseDeleteConfirm licence={mockLicense} onConfirm={mockOnConfirm} />);

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    const cancelButton = screen.getByRole('cancel');
    fireEvent.click(cancelButton);

    expect(mockOnConfirm).not.toHaveBeenCalled();
  });
});

import { describe, it, beforeEach, expect, vi } from 'vitest';

import { LicenseDeleteConfirm } from '../LicenseDeleteConfirm';

import { fireEvent, render, screen } from '@/tests/setup';

describe('LicenseDeleteConfirm', () => {
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
    render(<LicenseDeleteConfirm licence={mockLicense} onConfirm={() => {}} />);

    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeInTheDocument();
  });

  it('displays correct confirmation message', () => {
    render(<LicenseDeleteConfirm licence={mockLicense} onConfirm={() => {}} />);

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    // Check confirmation dialog content
    expect(screen.getByText(/remove entry/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/cannot be undone/i)).toBeInTheDocument();
  });

  it('calls onConfirm when remove action is clicked', () => {
    const mockOnConfirm = vi.fn();
    render(<LicenseDeleteConfirm licence={mockLicense} onConfirm={mockOnConfirm} />);

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    const removeButton = screen.getByRole('delete');
    fireEvent.click(removeButton);

    expect(mockOnConfirm).toHaveBeenCalledOnce();
  });

  it('allows canceling the delete action', () => {
    const mockOnConfirm = vi.fn();
    render(<LicenseDeleteConfirm licence={mockLicense} onConfirm={mockOnConfirm} />);

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    const cancelButton = screen.getByRole('cancel');
    fireEvent.click(cancelButton);

    expect(mockOnConfirm).not.toHaveBeenCalled();
  });
});

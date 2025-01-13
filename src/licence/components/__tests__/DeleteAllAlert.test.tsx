import { describe, test, expect, beforeEach, vi } from 'vitest';

import { DeleteAllAlert } from '../DeleteAllAlert';

import { render, screen, fireEvent } from '@/tests/setup';

describe('DeleteAllAlert Component', () => {
  const mockOnConfirm = vi.fn();

  const defaultProps = {
    onConfirm: mockOnConfirm,
    children: <span>Delete</span>,
  };

  beforeEach(() => {
    mockOnConfirm.mockClear();
  });

  test('renders trigger button with children', () => {
    render(<DeleteAllAlert {...defaultProps} />);

    const triggerButton = screen.getByText('Delete');

    expect(triggerButton).toBeInTheDocument();
  });

  test('opens alert dialog when trigger button is clicked', () => {
    render(<DeleteAllAlert {...defaultProps} />);
    const triggerButton = screen.getByText('Delete');
    fireEvent.click(triggerButton);

    // Check if alert dialog elements are visible
    expect(screen.getByText('Clear All Entries')).toBeInTheDocument();
    expect(
      screen.getByText(
        'You are about to permanently delete all driving license entries. This action cannot be undone and will remove all stored data.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete All')).toBeInTheDocument();
  });

  test('calls onConfirm when Delete All is clicked', () => {
    render(<DeleteAllAlert {...defaultProps} />);
    const triggerButton = screen.getByText('Delete');
    fireEvent.click(triggerButton);

    const deleteAllButton = screen.getByText('Delete All');
    fireEvent.click(deleteAllButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  test('does not call onConfirm when Cancel is clicked', () => {
    render(<DeleteAllAlert {...defaultProps} />);
    const triggerButton = screen.getByText('Delete');
    fireEvent.click(triggerButton);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  test('renders disabled trigger button when disabled prop is true', () => {
    render(<DeleteAllAlert {...defaultProps} disabled={true} />);

    const triggerButton = screen.getByRole('button');

    expect(triggerButton).toBeDisabled();
  });

  test('renders enabled trigger button when disabled prop is false', () => {
    render(<DeleteAllAlert {...defaultProps} disabled={false} />);

    const triggerButton = screen.getByRole('button');

    expect(triggerButton).not.toBeDisabled();
  });
});

import { describe, it, expect } from 'vitest';

import { LicenseSearch } from '../LicenseSearch';

import { render, fireEvent } from '@/tests/setup';

describe('LicenseSearch Component', () => {
  it('renders search input with correct placeholder', () => {
    const mockOnChange = () => {};
    const { getByPlaceholderText } = render(<LicenseSearch onChange={mockOnChange} />);

    const input = getByPlaceholderText('Search');
    expect(input).toBeTruthy();
  });

  it('calls onChange with correct input value', () => {
    const handleChange = (value: string) => {
      expect(value).toBe('John Doe');
    };

    const { getByPlaceholderText } = render(<LicenseSearch onChange={handleChange} />);

    const input = getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'John Doe' } });
  });

  it('renders search icon', () => {
    const mockOnChange = () => {};
    const { container } = render(<LicenseSearch onChange={mockOnChange} />);

    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toBeTruthy();
  });
});

import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { LicenseSearch } from '../LicenseSearch';

import { TranslationProvider } from '@/i18n/TranslationContext';

describe('LicenseSearch Component', () => {
  it('renders search input with correct placeholder', () => {
    const mockOnChange = () => {};
    const { getByPlaceholderText } = render(
      <TranslationProvider>
        <LicenseSearch onChange={mockOnChange} />
      </TranslationProvider>
    );

    const input = getByPlaceholderText('Search');
    expect(input).toBeTruthy();
  });

  it('calls onChange with correct input value', () => {
    const handleChange = (value: string) => {
      expect(value).toBe('John Doe');
    };

    const { getByPlaceholderText } = render(
      <TranslationProvider>
        <LicenseSearch onChange={handleChange} />
      </TranslationProvider>
    );

    const input = getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'John Doe' } });
  });

  it('renders search icon', () => {
    const mockOnChange = () => {};
    const { container } = render(
      <TranslationProvider>
        <LicenseSearch onChange={mockOnChange} />
      </TranslationProvider>
    );

    const searchIcon = container.querySelector('svg');
    expect(searchIcon).toBeTruthy();
  });
});

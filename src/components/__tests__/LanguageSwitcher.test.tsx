import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import { LanguageSwitcher } from '../LanguageSwitcher';

import { TranslationProvider } from '@/i18n/TranslationContext';

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('displays current language code', () => {
    render(
      <TranslationProvider>
        <LanguageSwitcher />
      </TranslationProvider>
    );

    expect(screen.getByRole('button')).toHaveTextContent('EN');
  });

  it('toggles between languages', () => {
    render(
      <TranslationProvider>
        <LanguageSwitcher />
      </TranslationProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('EN');

    fireEvent.click(button);
    expect(button).toHaveTextContent('FR');

    fireEvent.click(button);
    expect(button).toHaveTextContent('EN');
  });

  it('persists language selection', () => {
    const { rerender } = render(
      <TranslationProvider>
        <LanguageSwitcher />
      </TranslationProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('language')).toBe('fr');

    // Unmount and remount to test persistence
    rerender(
      <TranslationProvider>
        <LanguageSwitcher />
      </TranslationProvider>
    );

    expect(screen.getByRole('button')).toHaveTextContent('FR');
  });
});

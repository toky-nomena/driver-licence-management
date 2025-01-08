import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

import { LanguageSwitcher } from '../LanguageSwitcher';

import { I18nProvider } from '@/i18n/I18nContext';

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('displays current language code', () => {
    render(
      <I18nProvider>
        <LanguageSwitcher />
      </I18nProvider>
    );

    expect(screen.getByRole('button')).toHaveTextContent('EN');
  });

  it('toggles between languages', () => {
    render(
      <I18nProvider>
        <LanguageSwitcher />
      </I18nProvider>
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
      <I18nProvider>
        <LanguageSwitcher />
      </I18nProvider>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('language')).toBe('fr');

    // Unmount and remount to test persistence
    rerender(
      <I18nProvider>
        <LanguageSwitcher />
      </I18nProvider>
    );

    expect(screen.getByRole('button')).toHaveTextContent('FR');
  });
});

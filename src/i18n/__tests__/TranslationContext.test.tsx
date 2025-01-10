import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { TranslationProvider, useTranslate } from '../TranslationContext';

const TestComponent = () => {
  const { t, language, setLanguage } = useTranslate();

  return (
    <div>
      <span data-testid="translated">{t('welcome')}</span>
      <span data-testid="language">{language}</span>
      <button onClick={() => setLanguage('fr')}>Switch to French</button>
    </div>
  );
};

const TestInterpolation = () => {
  const { t } = useTranslate();
  return (
    <div>
      <span data-testid="simple">{t('minLength', { length: '3' })}</span>
      <span data-testid="multiple">{t('customMessage', { name: 'John', count: '5' })}</span>
    </div>
  );
};

describe('TranslationContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default language (en) when no language is stored', () => {
    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );

    expect(screen.getByTestId('language')).toHaveTextContent('en');
    expect(screen.getByTestId('translated')).toHaveTextContent('Welcome to our app');
  });

  it('loads stored language from localStorage', () => {
    localStorage.setItem('language', 'fr');

    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );

    expect(screen.getByTestId('language')).toHaveTextContent('fr');
    expect(screen.getByTestId('translated')).toHaveTextContent('Bienvenue sur notre application');
  });

  it('changes language and updates translations', () => {
    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );

    expect(screen.getByTestId('translated')).toHaveTextContent('Welcome to our app');

    fireEvent.click(screen.getByText('Switch to French'));

    expect(screen.getByTestId('translated')).toHaveTextContent('Bienvenue sur notre application');
    expect(localStorage.getItem('language')).toBe('fr');
  });

  it('returns key if translation is missing', () => {
    const TestMissingKey = () => {
      const { t } = useTranslate();
      return <span data-testid="missing">{t('nonexistentKey')}</span>;
    };

    render(
      <TranslationProvider>
        <TestMissingKey />
      </TranslationProvider>
    );

    expect(screen.getByTestId('missing')).toHaveTextContent('nonexistentKey');
  });

  it('throws error when useI18n is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'useTranslate must be used within an TranslationProvider'
    );

    consoleError.mockRestore();
  });

  describe('interpolation', () => {
    it('interpolates single value', () => {
      render(
        <TranslationProvider>
          <TestInterpolation />
        </TranslationProvider>
      );

      expect(screen.getByTestId('simple')).toHaveTextContent('Must be at least 3 characters');
    });

    it('interpolates multiple values', () => {
      render(
        <TranslationProvider>
          <TestInterpolation />
        </TranslationProvider>
      );

      expect(screen.getByTestId('multiple')).toHaveTextContent('John has 5 items');
    });

    it('handles missing interpolation values', () => {
      const TestMissingValues = () => {
        const { t } = useTranslate();
        return <span data-testid="missing">{t('minLength')}</span>;
      };

      render(
        <TranslationProvider>
          <TestMissingValues />
        </TranslationProvider>
      );

      expect(screen.getByTestId('missing')).toHaveTextContent(
        'Must be at least {{length}} characters'
      );
    });

    it('handles non-string interpolation values', () => {
      const TestNumberValues = () => {
        const { t } = useTranslate();
        return <span data-testid="number">{t('minLength', { length: 3 })}</span>;
      };

      render(
        <TranslationProvider>
          <TestNumberValues />
        </TranslationProvider>
      );

      expect(screen.getByTestId('number')).toHaveTextContent('Must be at least 3 characters');
    });
  });
});

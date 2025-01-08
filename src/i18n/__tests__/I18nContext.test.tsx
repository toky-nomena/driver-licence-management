import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { I18nProvider, useI18n } from '../I18nContext';

const TestComponent = () => {
  const { t, language, setLanguage } = useI18n();

  return (
    <div>
      <span data-testid="translated">{t('welcome')}</span>
      <span data-testid="language">{language}</span>
      <button onClick={() => setLanguage('fr')}>Switch to French</button>
    </div>
  );
};

const TestInterpolation = () => {
  const { t } = useI18n();
  return (
    <div>
      <span data-testid="simple">{t('minLength', { length: '3' })}</span>
      <span data-testid="multiple">{t('customMessage', { name: 'John', count: '5' })}</span>
    </div>
  );
};

describe('I18nContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default language (en) when no language is stored', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId('language')).toHaveTextContent('en');
    expect(screen.getByTestId('translated')).toHaveTextContent('Welcome to our app');
  });

  it('loads stored language from localStorage', () => {
    localStorage.setItem('language', 'fr');

    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId('language')).toHaveTextContent('fr');
    expect(screen.getByTestId('translated')).toHaveTextContent('Bienvenue sur notre application');
  });

  it('changes language and updates translations', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId('translated')).toHaveTextContent('Welcome to our app');

    fireEvent.click(screen.getByText('Switch to French'));

    expect(screen.getByTestId('translated')).toHaveTextContent('Bienvenue sur notre application');
    expect(localStorage.getItem('language')).toBe('fr');
  });

  it('returns key if translation is missing', () => {
    const TestMissingKey = () => {
      const { t } = useI18n();
      return <span data-testid="missing">{t('nonexistentKey')}</span>;
    };

    render(
      <I18nProvider>
        <TestMissingKey />
      </I18nProvider>
    );

    expect(screen.getByTestId('missing')).toHaveTextContent('nonexistentKey');
  });

  it('throws error when useI18n is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow('useI18n must be used within an I18nProvider');

    consoleError.mockRestore();
  });

  describe('interpolation', () => {
    it('interpolates single value', () => {
      render(
        <I18nProvider>
          <TestInterpolation />
        </I18nProvider>
      );

      expect(screen.getByTestId('simple')).toHaveTextContent('Must be at least 3 characters');
    });

    it('interpolates multiple values', () => {
      render(
        <I18nProvider>
          <TestInterpolation />
        </I18nProvider>
      );

      expect(screen.getByTestId('multiple')).toHaveTextContent('John has 5 items');
    });

    it('handles missing interpolation values', () => {
      const TestMissingValues = () => {
        const { t } = useI18n();
        return <span data-testid="missing">{t('minLength')}</span>;
      };

      render(
        <I18nProvider>
          <TestMissingValues />
        </I18nProvider>
      );

      expect(screen.getByTestId('missing')).toHaveTextContent(
        'Must be at least {{length}} characters'
      );
    });

    it('handles non-string interpolation values', () => {
      const TestNumberValues = () => {
        const { t } = useI18n();
        return <span data-testid="number">{t('minLength', { length: 3 })}</span>;
      };

      render(
        <I18nProvider>
          <TestNumberValues />
        </I18nProvider>
      );

      expect(screen.getByTestId('number')).toHaveTextContent('Must be at least 3 characters');
    });
  });
});

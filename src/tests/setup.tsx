import { render } from '@testing-library/react';
import type { ReactElement } from 'react';

import { TranslationProvider } from '@/i18n/TranslationContext';

const customRender = (ui: ReactElement) => {
  return render(<TranslationProvider>{ui}</TranslationProvider>);
};

// Re-export everything from testing-library
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';

// Override render method
export { customRender as render };

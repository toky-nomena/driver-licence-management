import { ThemeProvider } from 'next-themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { TranslationProvider } from './i18n/TranslationContext.tsx';
import { MainPage } from './MainPage.tsx';

import './index.css';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <TranslationProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainPage />
        </ThemeProvider>
      </TranslationProvider>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}

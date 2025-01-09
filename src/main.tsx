import { ThemeProvider } from 'next-themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { TranslationProvider } from './i18n/TranslationContext.tsx';
import { MainPage } from './MainPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TranslationProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <MainPage />
      </ThemeProvider>
    </TranslationProvider>
  </StrictMode>
);

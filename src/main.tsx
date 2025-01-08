import { ThemeProvider } from 'next-themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { I18nProvider } from './i18n/I18nContext.tsx';
import { MainPage } from './MainPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <MainPage />
      </ThemeProvider>
    </I18nProvider>
  </StrictMode>
);

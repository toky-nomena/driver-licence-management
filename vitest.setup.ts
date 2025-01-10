// vitest.setup.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock browser APIs if needed
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});

// Add any global test setup here

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

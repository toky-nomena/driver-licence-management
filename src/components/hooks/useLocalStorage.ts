import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [data, setData] = useState<T>(() => {
    try {
      const savedData = localStorage.getItem(key);
      return savedData ? JSON.parse(savedData) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Save data to localStorage whenever it changes
  useEffect(() => localStorage.setItem(key, JSON.stringify(data)), [data, key]);

  return [data, setData] as const;
}

import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (value: T | ((val: T) => T)): void => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  return [value, save];
}
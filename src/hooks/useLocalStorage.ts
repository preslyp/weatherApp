import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
      }
    } catch (error) {
      console.warn(`Error retrieving ${key} from localStorage:`, error);
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
};

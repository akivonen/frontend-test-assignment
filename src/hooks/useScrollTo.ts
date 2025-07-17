import { useCallback } from 'react';

// Hook returns scrollToElement func to handle scrolling
export default function useScrollTo() {
  const scrollToElement = useCallback((selector: string) => {
    const elem = document.querySelector(selector);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  return { scrollToElement };
}

import { useCallback } from 'react';

export default function useScrollTo() {
  const scrollToElement = useCallback((selector: string) => {
    const elem = document.querySelector(selector);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  return { scrollToElement };
}

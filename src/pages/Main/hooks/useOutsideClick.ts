import { RefObject, TouchEvent, useEffect } from 'react';

const useOutsideClick = (ref: RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return function cleanup() {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
};

export default useOutsideClick;

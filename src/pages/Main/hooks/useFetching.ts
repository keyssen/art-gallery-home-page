import { useState } from 'react';

export const useFetching = (
  callback: () => Promise<void>
): [() => Promise<void>, string] => {
  const [error, setError] = useState('');

  const fetching = async () => {
    try {
      await callback();
    } catch (e: any) {
      setError(e.message);
    }
  };
  return [fetching, error];
};

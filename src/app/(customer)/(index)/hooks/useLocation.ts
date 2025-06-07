import { useEffect, useState } from 'react';
import { getLocation } from '../lib/data';

type LocationTypeHook = {
  id: number;
  name: string;
};

interface LocationInterfaceHook {
  location: LocationTypeHook[];
}
export function useLocation() {
  const [locations, setLocations] = useState<
    LocationTypeHook[] | { error: string }
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const data = await getLocation();
        setLocations(data);
        setLoading(false);
      } catch (error) {
        console.log('Failed get categories' + error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  });

  return {
    locations,
    loading,
    error,
  };
}

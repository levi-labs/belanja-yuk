import { useEffect, useState } from 'react';
import { getBrand } from '../lib/data';

type BrandProps = {
  id: number;
  logo: string;
  name: string;
};
export function useBrand() {
  const [brands, setBrands] = useState<BrandProps[] | { error: string }>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getBrands = async () => {
      try {
        const data = await getBrand();
        setBrands(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    getBrands();
  }, []);

  return { brands, loading, error };
}

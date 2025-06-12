import { useEffect, useState } from 'react';
import { getProduct } from '../lib/data';
import { TProduct } from '@/types';

type ProductState = TProduct[] | { error: string };

export function useProduct({ count = null }: { count: number | null }) {
  const [products, setProduct] = useState<ProductState>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getProduct(count);
        setProduct(data);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [count]);

  return { products, loading, error };
}

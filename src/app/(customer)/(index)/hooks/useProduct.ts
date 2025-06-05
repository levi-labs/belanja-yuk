import { useEffect, useState } from 'react';
import { getProduct } from '../lib/data';
import { getProducts } from '@/app/(admin)/dashboard/(index)/products/lib/data';
type Product = {
  name: string;
  price: bigint;
  images: string[];
  category: { name: string };
};
type ProductState = Product[] | { error: string };

export function useProduct() {
  const [products, setProduct] = useState<ProductState>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getProduct();
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
  }, []);

  return { products, loading, error };
}

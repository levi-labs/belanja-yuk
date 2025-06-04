import { useEffect, useState } from 'react';
import { getCategory } from '../lib/data';
type Category = {
  id: number;
  name: string;
  _count: {
    product: number;
  };
};

export function useCategory() {
  const [category, setCategory] = useState<Category[] | { error: string }>(
    [] as Category[]
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategory();
        setCategory(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  return { category, loading, error };
}

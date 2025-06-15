import { TProduct } from '@/types';
import { TFilter } from '../../hooks/useFilter';

export async function fetchWithFilter(body?: TFilter): Promise<TProduct[]> {
  const res = await fetch('/api/catalog', {
    method: 'POST',
    body: JSON.stringify(body ?? {}),
  });

  const data = await res.json();

  return data ?? [];
}

export async function getTest() {
  const res = await fetch('/api/catalog', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}

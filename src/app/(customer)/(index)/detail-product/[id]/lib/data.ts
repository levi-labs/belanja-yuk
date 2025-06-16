import { getImageUrl } from '@/lib/supabase';
import prisma from '../../../../../../../lib/prisma';

import { redirect } from 'next/navigation';

export async function getProductById(id: number) {
  try {
    const product = await prisma.product.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            orderProduct: true,
          },
        },
        description: true,
        price: true,
        images: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!product) {
      return redirect('/');
    }
    return {
      ...product,
      images: product.images.map((image) => {
        return getImageUrl(image, 'products');
      }),
    };
  } catch (error) {
    console.log('Failed fetching product by ID:', error);
    return null;
  }
}

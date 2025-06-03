'use server';
import { getImageUrl } from '@/lib/supabase';
import prisma from '../../../../../../../lib/prisma';
import { TColumn } from '../columns';

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    const response: TColumn[] = orders.map((order) => {
      return {
        id: Number(order.id),
        customer_name: order.user.name,
        price: Number(order.total),
        product: order.products.map((item) => ({
          name: item.product.name,
          price: Number(item.product.price),
          image: getImageUrl(item.product.images[0], 'products'),
        })),

        status: order.status,
      };
    });
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

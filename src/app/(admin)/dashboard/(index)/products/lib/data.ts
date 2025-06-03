import prisma from '../../../../../../../lib/prisma';
import { TColumn } from '../columns';

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: 'asc',
      },
      select: {
        id: true,
        _count: {
          select: {
            orderProduct: true,
          },
        },
        name: true,
        created_at: true,
        description: true,
        price: true,
        stok: true,
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        location: {
          select: {
            name: true,
          },
        },
        images: true,
      },
    });
    const formattedProducts: TColumn[] = products.map((product) => {
      return {
        id: Number(product.id),
        name: product.name,
        price: Number(product.price),
        stok: product.stok,
        images_url: product.images, // Ensure images is an array
        brand_name: product.brand.name,
        category_name: product.category.name,
        location_name: product.location.name,
        created_at: product.created_at,
        total_sales: product._count.orderProduct || 0, // Ensure total_sales is a number
      };
    });
    return formattedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductId(id: string) {
  try {
    const response = await prisma.product.findFirst({
      where: { id: Number(id) },
    });
    return response;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}

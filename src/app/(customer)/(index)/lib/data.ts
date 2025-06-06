'use server';
import prisma from '../../../../../lib/prisma';
type ProductType = {
  name: string;
  price: number;
  images: string;
  category_name: string;
};

export async function getCategory() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            product: true,
          },
        },
      },
    });

    return categories;
  } catch (error) {
    console.error('Failed fetching categories ' + error);
    return {
      error: `Failed fetching categories ${error}`,
    };
  }
}

export async function getProduct(count: number | null) {
  try {
    const query: any = {
      select: {
        name: true,
        images: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    };
    if (count != null) query.take = count;

    const products = await prisma.product.findMany(query);

    const formatProducts: ProductType[] = products.map((product: any) => ({
      name: product.name,
      price: Number(product.price),
      images: product.images[0],
      category_name: product.category.name,
    }));

    return formatProducts;
  } catch (error) {
    console.error('Failed fetching products' + error);
    return {
      error: `Failed fetching  products ${error}`,
    };
  }
}

export async function getBrand() {
  try {
    const brands = await prisma.brand.findMany({
      select: {
        id: true,
        logo: true,
        name: true,
      },
    });
    return brands;
  } catch (error) {
    console.log('Failed fetching brands' + error);
    return {
      error: `Failed fetching brands ${error}`,
    };
  }
}

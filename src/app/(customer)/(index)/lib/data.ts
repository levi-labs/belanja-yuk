'use server';
import prisma from '../../../../../lib/prisma';

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

export async function getProduct() {
  try {
    const products = await prisma.product.findMany({
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
    });
    return products;
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

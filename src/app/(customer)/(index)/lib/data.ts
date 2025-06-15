'use server';
import prisma from '../../../../../lib/prisma';
import { TProduct } from '@/types';

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
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        images: true,
        price: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      ...(count ? { take: count } : {}),
    });

    const formatProducts: TProduct[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      images: product.images[0],
      category_name: product.category.name,
    }));

    return formatProducts;
  } catch (error) {
    console.log('Failed fetching products' + error);
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

export async function getLocation() {
  try {
    const locations = await prisma.location.findMany({});

    return locations;
  } catch (error) {
    console.log('Failed fetching location' + error);
    return {
      error: `Failed fetching location ${error}`,
    };
  }
}

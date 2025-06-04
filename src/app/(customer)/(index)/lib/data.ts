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

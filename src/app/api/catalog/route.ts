import { Prisma } from '@prisma/client';
import prisma from '../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const res = await request.json();

    const ORQuery: Prisma.ProductWhereInput[] = [];

    if (res.search != '') {
      ORQuery.push({
        name: {
          contains: res.search,
          mode: 'insensitive',
        },
      });
    }

    if (res.minPrice && res.minPrice > 0) {
      ORQuery.push({
        price: {
          gte: res.minPrice,
        },
      });
    }
    if (res.maxPrice && res.maxPrice > 0) {
      ORQuery.push({
        price: {
          lte: res.maxPrice,
        },
      });
    }

    if (res.stock && res.stock.length > 0) {
      ORQuery.push({
        stok: {
          in: res.stok,
        },
      });
    }

    if (res.brands && res.brands.length > 0) {
      ORQuery.push({
        brand: {
          id: {
            in: res.brands,
          },
        },
      });
    }

    if (res.locations && res.locations.length > 0) {
      ORQuery.push({
        location: {
          id: {
            in: res.brands,
          },
        },
      });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: ORQuery.length > 0 ? ORQuery : undefined,
      },
      select: {
        id: true,
        images: true,
        name: true,
        category: {
          select: {
            name: true,
          },
        },
        price: true,
      },
    });
  } catch (error) {
    console.log('error');
    return error;
  }
}

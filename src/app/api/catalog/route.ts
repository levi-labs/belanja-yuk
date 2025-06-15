import { Prisma } from '@prisma/client';
import prisma from '../../../../lib/prisma';
import { getImageUrl } from '@/lib/supabase';
import { TProduct } from '@/types';

// type TProduct = {
//   id: number;
//   image_url: string;
//   name: string;
//   category_name: string;
//   price: number;
// };

export async function GET() {
  try {
    return Response.json({
      message: 'This is a GET request, please use POST to filter products.',
    });
  } catch (error) {
    console.error('Error parsing URL parameters:', error);
  }
}

export async function POST(request: Request) {
  try {
    const res = await request.json();

    const ORQuery: Prisma.ProductWhereInput[] = [];

    if (res.search && res.search != '') {
      ORQuery.push({
        name: {
          contains: res.search,
          mode: 'insensitive',
        },
      });
    }

    if (res.minPrice > 0 || res.maxPrice > 0) {
      ORQuery.push({
        price: {
          ...(res.minPrice > 0 ? { gte: Number(res.minPrice) } : {}),
          ...(res.maxPrice > 0 ? { lte: Number(res.maxPrice) } : {}),
        },
      });
    }

    if (res.stock && res.stock.length > 0) {
      ORQuery.push({
        stok: {
          in: res.stock,
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
            in: res.locations,
          },
        },
      });
    }
    if (res.categories && res.categories.length > 0) {
      ORQuery.push({
        category: {
          id: {
            in: res.categories,
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

    const response: TProduct[] = products.map((product) => {
      return {
        id: product.id,
        category_name: product.category.name,
        images: getImageUrl(product.images[0], 'products'),
        name: product.name,
        price: Number(product.price),
      };
    });

    return Response.json(response);
  } catch (error) {
    console.log('error' + error);
    return Response.json({ status: false }, { status: 500 });
  }
}

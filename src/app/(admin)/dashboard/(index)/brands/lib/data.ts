import prisma from '../../../../../../../lib/prisma';

export async function getBrands() {
  try {
    const response = await prisma.brand.findMany({});
    return response;
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

export async function getBrandId(id: string) {
  try {
    const response = await prisma.brand.findFirst({
      where: { id: Number(id) },
    });
    return response;
  } catch (error) {
    console.error('Error fetching brand by ID:', error);
    return null;
  }
}

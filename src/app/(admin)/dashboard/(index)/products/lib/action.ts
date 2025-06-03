'use server';
import { schemaProduct, schemaProductEdit } from '@/lib/schema';
import { deleteImage, uploadImage } from '@/lib/supabase';
import { ActionResult } from '@/types';
import { redirect } from 'next/navigation';
import prisma from '../../../../../../../lib/prisma';
import { ProductStock } from '@prisma/client';

export const postProduct = async (
  _: unknown,
  formData: FormData
): Promise<ActionResult> => {
  console.log({
    image: formData.getAll('images'),
  });

  const validate = schemaProduct.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
    description: formData.get('description'),
    stok: formData.get('stock'),
    category_id: formData.get('category_id'),
    brand_id: formData.get('brand_id'),
    location_id: formData.get('location_id'),
    image: formData.getAll('images'),
  });
  if (!validate.success) {
    console.error('Validation failed:', validate.error.errors[0].message);
    return { error: validate.error.errors[0].message };
  }

  const uploaded_images = validate.data.image as File[];
  const filenames = [];

  for (const image of uploaded_images) {
    const file = await uploadImage(image, 'products');
    filenames.push(file);
  }

  try {
    await prisma.product.create({
      data: {
        name: validate.data.name,
        price: Number(validate.data.price),
        description: validate.data.description,
        stok: validate.data.stok as ProductStock,
        category_id: Number(validate.data.category_id),
        brand_id: Number(validate.data.brand_id),
        location_id: Number(validate.data.location_id),
        images: filenames,
      },
    });
  } catch (error) {
    console.log('Error creating product:', error);
    return { error: 'Failed to create product. Please try again later.' };
  }

  return redirect('/dashboard/products');
};
export const updateProduct = async (
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> => {
  const validate = schemaProductEdit.safeParse({
    id: id,
    name: formData.get('name'),
    price: formData.get('price'),
    description: formData.get('description'),
    stok: formData.get('stock'),
    category_id: formData.get('category_id'),
    brand_id: formData.get('brand_id'),
    location_id: formData.get('location_id'),
  });
  if (!validate.success) {
    console.error('Validation failed:', validate.error.errors[0].message);
    return { error: validate.error.errors[0].message };
  }
  const product = await prisma.product.findFirst({
    where: { id },
    select: {
      images: true,
    },
  });
  if (!product) {
    return { error: 'Product not found' };
  }
  const uploaded_images = formData.getAll('images') as File[];
  let filenames = [];
  if (uploaded_images.length === 3) {
    const validateImages = schemaProduct
      .pick({
        image: true,
      })
      .safeParse({
        image: uploaded_images,
      });
    if (!validateImages.success) {
      console.error(
        'Image validation failed:',
        validateImages.error.errors[0].message
      );
      return { error: validateImages.error.errors[0].message };
    }
    for (const image of product.images) {
      deleteImage(image, 'products');
    }
    for (const image of uploaded_images) {
      const file = await uploadImage(image, 'products');
      filenames.push(file);
    }
  } else {
    filenames = product.images || [];
  }

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name: validate.data.name,
        price: Number(validate.data.price),
        description: validate.data.description,
        stok: validate.data.stok as ProductStock,
        category_id: Number(validate.data.category_id),
        brand_id: Number(validate.data.brand_id),
        location_id: Number(validate.data.location_id),
        images: filenames,
      },
    });
  } catch (error) {
    console.log('Error updating product:', error);
    return { error: 'Failed to update product. Please try again later.' };
  }
  return redirect('/dashboard/products');
};
export const deleteProduct = async (
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> => {
  if (!id) {
    return { error: 'Product ID is required' };
  }
  const product = await prisma.product.findFirst({
    where: { id },
    select: {
      images: true,
    },
  });
  if (!product) {
    return { error: 'Product not found' };
  }
  try {
    for (const image of product.images) {
      await deleteImage(image, 'products');
    }

    await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    console.log('Error deleting product:', error);
    return { error: 'Failed to delete product. Please try again later.' };
  }

  return redirect('/dashboard/products');
};

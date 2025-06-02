'use server';
import { schemaBrand } from '@/lib/schema';
import { ActionResult } from '@/types';
import prisma from '../../../../../../../lib/prisma';

import { redirect } from 'next/navigation';
import { deleteImage, uploadImage } from '@/lib/supabase';

export async function postBrand(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaBrand.safeParse({
    name: formData.get('name'),
    image: formData.get('image'),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }
  try {
    const fileName = await uploadImage(validate.data.image, 'brands');
    await prisma.brand.create({
      data: {
        name: validate.data.name,
        logo: fileName,
      },
    });
  } catch (error) {
    console.log('Error creating brand:', error);
    return {
      error: 'Failed to create brand. Please try again later.',
    };
  }

  return redirect('/dashboard/brands');
}

export async function updateBrand(
  _: unknown,
  formData: FormData,
  brandId: number | undefined
): Promise<ActionResult> {
  console.log('Form Data:', formData, 'Brand ID:', brandId);

  const fileUpload = formData.get('image') as File;

  const validate = schemaBrand
    .pick({
      name: true,
    })
    .safeParse({
      name: formData.get('name'),
    });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }
  const brand = await prisma.brand.findFirst({
    where: { id: brandId },
    select: {
      logo: true,
    },
  });

  let filename = brand?.logo;

  if (fileUpload.size > 0) {
    filename = await uploadImage(fileUpload, 'brands');
  }

  try {
    await prisma.brand.update({
      where: { id: brandId },
      data: {
        name: validate.data.name,
        logo: filename,
      },
    });
  } catch (error) {
    console.log('Error updating brand:', error);
    return {
      error: 'Failed to update brand. Please try again later.',
    };
  }
  return redirect('/dashboard/brands');
}

export async function deleteBrand(
  _: unknown,
  formData: FormData,
  brandId: number
): Promise<ActionResult> {
  console.log('Deleting brand with ID:', brandId);

  const brand = await prisma.brand.findFirst({
    where: { id: brandId },
    select: {
      logo: true,
    },
  });
  if (!brand) {
    return {
      error: 'Brand not found.',
    };
  }

  try {
    deleteImage(brand.logo, 'brands');

    await prisma.brand.delete({
      where: { id: brandId },
    });
  } catch (error) {
    console.log('Error deleting brand:', error);
    return {
      error: 'Failed to delete brand. Please try again later.',
    };
  }
  return redirect('/dashboard/brands');
}

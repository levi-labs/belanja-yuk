'use server';

import { schemaLocation } from '@/lib/schema';
import { ActionResult } from '@/types';
import prisma from '../../../../../../../lib/prisma';
import { redirect } from 'next/navigation';

export async function postLocation(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaLocation.safeParse({
    name: formData.get('name'),
  });

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }
  try {
    await prisma.location.create({
      data: {
        name: validate.data.name,
      },
    });
  } catch (error) {
    console.log('Error creating location:', error);
    return {
      error: 'An error occurred while creating the location. Please try again.',
    };
  }
  return redirect('/dashboard/locations');
}

export async function updateLocation(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  const validate = schemaLocation.safeParse({
    name: formData.get('name'),
  });
  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }
  if (id === undefined) {
    return {
      error: 'Location ID is undefined.',
    };
  }

  try {
    await prisma.location.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
      },
    });
  } catch (error) {
    console.log('Error updating location:', error);
    return {
      error: 'An error occurred while updating the location. Please try again.',
    };
  }
  return redirect('/dashboard/locations');
}

export async function deleteLocation(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  try {
    await prisma.location.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log('Error deleting location:', error);
    return {
      error: 'An error occurred while deleting the location. Please try again.',
    };
  }
  return redirect('/dashboard/locations');
}

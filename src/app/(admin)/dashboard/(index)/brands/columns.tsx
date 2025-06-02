'use client';

import { Button } from '@/components/ui/button';
import { Brand } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { Edit } from 'lucide-react';
import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/supabase';
import FormDelete from './_components/form-delete';

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: 'name',
    header: 'Brand',
    cell: ({ row }) => {
      const brand = row.original;
      return (
        <div className='inline-flex items-center gap-5'>
          <Image
            src={getImageUrl(brand.logo)}
            alt={`Logo of ${brand.name}`}
            width={40}
            height={40}
          />
          <span>{brand.name}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const brand = row.original;
      return (
        <div className='space-x-4 inline-flex'>
          <Button size='sm' asChild>
            <Link href={`/dashboard/brands/edit/${brand.id}`}>
              <Edit className='w-4 h-4 mr-2' /> Edit
            </Link>
          </Button>
          <FormDelete id={brand.id} />
        </div>
      );
    },
  },
];

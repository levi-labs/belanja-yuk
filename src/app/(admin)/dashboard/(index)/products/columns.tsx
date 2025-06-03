'use client';
import { getImageUrl } from '@/lib/supabase';
import { dateFormat, rupiahFormat } from '@/lib/utils';
import { Product, ProductStock } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import FormDelete from './_components/form-delete';

export type TColumn = {
  name: string;
  id: number;
  price: number;
  stok: ProductStock;
  images_url: string[];
  brand_name: string;
  category_name: string;
  location_name: string;
  created_at: Date;
};
export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className='inline-flex items-center gap-5'>
          <Image
            src={getImageUrl(product.images_url[0], 'products')}
            alt={`Logo of ${product.name}`}
            width={40}
            height={40}
          />
          <span>{product.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const product = row.original;
      return <span>{rupiahFormat(Number(product.price))}</span>;
    },
  },
  {
    accessorKey: 'stock',
    header: 'Status',
    cell: ({ row }) => {
      const product = row.original;
      return <Badge variant={'outline'}>{product.stok}</Badge>;
    },
  },
  {
    accessorKey: 'total_sales',
    header: 'Total Sales',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      const product = row.original;
      return dateFormat(product.created_at, 'DD MMMM YYYY');
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className='space-x-4 inline-flex'>
          <Button size={'sm'} asChild>
            <Link href={`/dashboard/products/edit/${product.id}`}>
              <Edit className='w-4 h-4 mr-2' /> Edit
            </Link>
          </Button>
          <FormDelete id={product.id} />
        </div>
      );
    },
  },
];

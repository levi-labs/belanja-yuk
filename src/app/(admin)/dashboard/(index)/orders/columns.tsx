'use client';
import { Badge } from '@/components/ui/badge';
import { rupiahFormat } from '@/lib/utils';
import { StatusOrder } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

type TProduct = {
  name: string;
  image: string;
};

export type TColumn = {
  id: number;
  product: TProduct[];
  customer_name: string;
  price: number;
  status: StatusOrder;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: 'product',
    header: 'Product',
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className='flex flex-col gap-4 justify-start'>
          {order.product.map((item, i) => (
            <div className='inline-flex items-center gap-5' key={item.name + i}>
              <Image
                key={item.name + i}
                src={item.image}
                alt={item.name}
                width={50}
                height={50}
                className='rounded-md'
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'customer_name',
    header: 'Customer Name',
    cell: ({ row }) => {},
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => rupiahFormat(row.original.price),
  },
  {
    accessorKey: 'status',
    header: 'Status Order',
    cell: ({ row }) => {
      return (
        <Badge
          variant={row.original.status === 'failed' ? 'destructive' : 'default'}
        >
          {row.original.status.charAt(0).toUpperCase() +
            row.original.status.slice(1)}
        </Badge>
      );
    },
  },
];

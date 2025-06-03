import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { getOrders } from './lib/data';
import { columns } from './columns';

export default async function OrderPage() {
  const orders = await getOrders();
  return (
    <div className='space-y-4'>
      <Card x-chunk='dashboard-06-chunk-0'>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Manage your orders and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={orders} />
        </CardContent>
      </Card>
    </div>
  );
}

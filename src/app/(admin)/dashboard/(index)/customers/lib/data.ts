import { log } from 'util';
import prisma from '../../../../../../../lib/prisma';
import { TColumn } from '../columns';

export async function getCustomers() {
  console.log('fetch all customer');
  try {
    const customers = await prisma.user.findMany({
      where: {
        role: 'customer',
      },
      include: {
        _count: {
          select: {
            order: true,
          },
        },
      },
    });

    if (customers.length === 0) {
      console.log('No customers found');
      return [];
    }
    const formattedCustomers: TColumn[] = customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      total_transactions: customer._count.order,
    }));

    return formattedCustomers;
  } catch (error) {
    console.log('error fetching data customer', error);
    return [];
  }
}

export async function getCustomerById(id: number) {
  try {
    const customer = await prisma.user.findFirst({
      where: { id },
    });
    if (!customer) {
      console.log('Customer not found');
      return null;
    }
    return customer;
  } catch (error) {
    console.log('error fetching customer by id', error);
    return null;
  }
}

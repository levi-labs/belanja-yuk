import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('Received webhook data:', body);

  try {
    const code = body.data.reference_id;
    console.log('Order code:', code);

    await prisma.order.update({
      where: {
        code: code,
      },
      data: {
        status: body.data.status === 'SUCCEEDED' ? 'success' : 'failed',
      },
    });
  } catch (error) {
    console.log('Error updating order status:', error);
    return NextResponse.json({
      error: 'Failed to update order status. Please try again later.',
      status: 500,
    });
  }
  return NextResponse.json({
    message: 'Order status updated successfully',
    status: 200,
  });
}

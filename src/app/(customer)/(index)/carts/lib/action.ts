'use server';
import { getUser } from '@/lib/auth';
import { schemaShippingAddress } from '@/lib/schema';
import { ActionResult, TCart } from '@/types';
import { redirect } from 'next/navigation';
import prisma from '../../../../../../lib/prisma';
import { generateRandomString } from '@/lib/utils';

import {
  PaymentRequestParameters,
  PaymentRequest,
} from 'xendit-node/payment_request/models';
import xenditClient from '@/lib/xendit';
import { Prisma } from '@prisma/client';

export async function storeOrder(
  _: unknown,
  formData: FormData,
  total: number,
  products: TCart[]
): Promise<ActionResult> {
  const { session, user } = await getUser();
  if (!session) {
    return redirect('/signin');
  }

  const validated = schemaShippingAddress.safeParse({
    name: formData.get('name'),
    address: formData.get('address'),
    city: formData.get('city'),
    postal_code: formData.get('postal_code'),
    notes: formData.get('notes'),
    phone: formData.get('phone'),
  });

  let redirectPaymentUrl;

  if (!validated.success) {
    console.log('Validation error:', validated.error);
    return {
      error: validated.error.errors[0].message,
    };
  }

  try {
    const code = generateRandomString(10);

    const data: PaymentRequestParameters = {
      amount: total,
      currency: 'IDR',
      referenceId: code,
      paymentMethod: {
        ewallet: {
          channelProperties: {
            successReturnUrl: process.env.NEXT_PUBLIC_XENDIT_URL || '',
          },
          channelCode: 'SHOPEEPAY',
        },
        type: 'EWALLET',
        reusability: 'ONE_TIME_USE',
      },
    };
    const paymentRequest: PaymentRequest =
      await xenditClient.PaymentRequest.createPaymentRequest({ data });

    redirectPaymentUrl =
      paymentRequest.actions?.find((item) => item.urlType === 'DEEPLINK')
        ?.url ?? '/';

    const queryCreateProductOrder: Prisma.OrderProductCreateManyInput[] = [];

    await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          user_id: Number(user.id),
          total: total,
          status: 'pending',
          code: code,
        },
      });

      console.log('Order created:', order);
      for (const product of products) {
        queryCreateProductOrder.push({
          order_id: order.id,
          product_id: product.id,
          quantity: product.quantity,
          subtotal: product.price,
        });
      }
      await tx.orderProduct.createMany({
        data: queryCreateProductOrder,
      });

      await tx.orderDetail.create({
        data: {
          order_id: order.id,
          name: validated.data.name,
          address: validated.data.address,
          city: validated.data.city,
          postal_code: validated.data.postal_code,
          notes: validated.data.notes || '',
          phone: validated.data.phone,
        },
      });
    });
  } catch (error) {
    console.log('Error creating order:', error);
    return {
      error: 'Failed to create order. Please try again later.',
    };
  }

  return redirect(redirectPaymentUrl);
}

import { Xendit } from 'xendit-node';

console.log('Xendit client initialized' + process.env.NEXT_PUBLIC_XENDIT_KEY);
const xenditClient = new Xendit({
  secretKey: process.env.NEXT_PUBLIC_XENDIT_KEY || '',
});

export default xenditClient;

export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  mode: 'payment' | 'subscription';
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_TERsCwnLQvOp2c',
    priceId: 'price_1SHyzCLvKKCQbcJoDggnWmYA',
    name: 'Complete Website Package',
    description: 'Rooted in your vision, built to bloom. This package delivers a handcrafted website with seamless design, responsive layout, and all the essentials to help your brand flourish online.',
    price: 499.99,
    currency: 'usd',
    mode: 'payment'
  }
];

export const getProductById = (id: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.id === id);
};

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
};
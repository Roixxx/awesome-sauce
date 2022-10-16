import Stripe from "stripe";

export default defineEventHandler( async (e) => {
  const stripe = new Stripe(useRuntimeConfig().stripeSecret, {} as any);
  const body = await useBody(e);

  const productsFromStripe = await stripe.products.list({
    ids: body.products.map(product => product.id),
  });

  const line_items = productsFromStripe.data.map(product => ({
    price: product.default_price,
    quantity: body.products.find(p => p.id === product.id).quantity,
  }));

  return await stripe.checkout.sessions.create({
    success_url: `${body.url}/checkout/success`,
    cancel_url: `${body.url}/cart`,
    line_items,
    mode: 'payment',
  });
});

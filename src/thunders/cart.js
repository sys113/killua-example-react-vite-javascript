import { thunder } from 'killua';

const thunderCart = thunder({
  key: 'cart',
  encrypt: true,
  default: [],
  expire: null,
  selectors: {
    cartIsEmpty: (thunder) => Boolean(!thunder.length),
    isInCart: (thunder, payload) =>
      thunder.some((product) => product.id === payload),
    totalCartPrice: (thunder) =>
      thunder.reduce((acc, product) => acc + product.price, 0),
  },
  reducers: {
    addToCart: (thunder, payload) => [
      ...thunder,
      payload,
    ],
    removeFromCart: (thunder, payload) => [
      ...thunder.filter((product) => product.id !== payload),
    ],
  },
});

export { thunderCart };

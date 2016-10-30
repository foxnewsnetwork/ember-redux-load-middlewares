export function enhancer(storeCreator) {
  return storeCreator;
}

export default {
  name: 'ice-cream',
  enhancer
};

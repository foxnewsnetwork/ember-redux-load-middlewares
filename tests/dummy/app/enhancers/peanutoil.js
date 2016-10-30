export function enhancer(storeCreator) {
  return storeCreator;
}

export default {
  name: 'peanutoil',
  enhancer
};

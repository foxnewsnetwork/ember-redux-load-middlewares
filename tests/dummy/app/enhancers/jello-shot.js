export function enhancer(storeCreator) {
  return storeCreator;
}

export default {
  name: 'jello-shot',
  enhancer
};

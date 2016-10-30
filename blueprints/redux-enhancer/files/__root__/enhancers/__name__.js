export function enhancer(storeCreator) {
  return storeCreator;
}

export default {
  name: '<%= dasherizedModuleName %>',
  enhancer
};

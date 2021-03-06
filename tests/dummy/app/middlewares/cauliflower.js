export function middleware(/*{getState, dispatch }*/) {
  return (nextDispatch) => (action) => nextDispatch(action);
}

export default {
  name: 'cauliflower',
  middleware
};

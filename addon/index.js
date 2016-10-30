import load from './utils/load';
import run from './utils/run';

export const loadReducers = load('reducers');
export const loadMiddlewares = load('middlewares');
export const loadEnhancers = load('enhancers');
export const runReducers = run('reducers');
export const runMiddlewares = run('middlewares');
export const runEnhancers = run('enhancers');

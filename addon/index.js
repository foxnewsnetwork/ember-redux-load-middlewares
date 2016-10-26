import Ember from 'ember'
/**
* Stolen from rwjblue (as usual)
* https://github.com/ember-cli/ember-load-initializers/blob/master/addon/index.js
*/

const { isBlank } = Ember;
const getKeys = (Object.keys || Ember.keys);

const loadSomething = (type) => (prefix) => {
  const regex = new RegExp(`^${prefix}\/${type}\/`);
  const moduleNames = getKeys(requirejs._eak_seen);

  return moduleNames
    .filter(matches(regex))
    .map(toModule)
    .filter(assertGood)
    .map(standardizeName);
}

const matchCriteria = (matches) => matches && matches.length === 2;
const matches = (regexp) => (moduleName) => matchCriteria(regexp.exec(moduleName));
const toModule = (moduleName) => assertPresence(namingRequire(moduleName));

function namingRequire(moduleName) {
  const module = require(moduleName, null, null, true) || { isBad: true };
  module.moduleName = moduleName;
  return module;
}
function assertGood({moduleName, isBad}) {
  return !isBad || throw new Error(`${moduleName} must export a reducer`);
}
function standardizeName(module) {
  const { moduleName, name } = module;

  if(isBlank(name)) {
    module.name = moduleName.match(/[^\/]+\/?$/)[0];
  }

  return module;
}

export const loadReducers = loadSomething('reducers');
export const loadMiddlewares = loadSomething('middlewares');
export const loadEnhancers = loadSomething('enhancers');

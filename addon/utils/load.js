import Ember from 'ember';
/**
* Stolen from rwjblue + stefanpenner (as usual)
* https://github.com/ember-cli/ember-load-initializers/blob/master/addon/index.js
*/

const { isBlank, isPresent } = Ember;
const getKeys = (Object.keys || Ember.keys);

const matchCriteria = isPresent;
const matches = (regexp) => (moduleName) => matchCriteria(regexp.exec(moduleName));

function toModule(moduleName) {
  const module = window.require(moduleName, null, null, true) || { isBad: true };
  module.moduleName = moduleName;
  return module;
}
function assertGood({moduleName, isBad}) {
  if (isBad) {
    throw(new Error(`${moduleName} must export a reducer`));
  } else {
    return true;
  }
}
function standardizeName(module) {
  const { moduleName, name } = module;

  if(isBlank(name)) {
    module.name = moduleName.match(/[^\/]+\/?$/)[0];
  }

  return module;
}

export default function load(type) {
  return (prefix) => {
    const regex = new RegExp(`^${prefix}\/${type}\/`);
    const moduleNames = getKeys(window.requirejs._eak_seen);

    return moduleNames
      .filter(matches(regex))
      .map(toModule)
      .filter(assertGood)
      .map(standardizeName);
  };
}

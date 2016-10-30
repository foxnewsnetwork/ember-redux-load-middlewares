(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['DAG'].default };
  }

  define('dag-map', [], vendorModule);
})();

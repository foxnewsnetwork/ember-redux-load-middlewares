/* jshint node: true */
'use strict';

const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const path = require('path');

module.exports = {
  name: 'ember-redux-load-middlewares',

  included(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;

    const vendor = this.treePaths.vendor;

    app.import(vendor + '/dag-map/dag-map.umd.js', { prepend: true });
    app.import(vendor + '/shims/dag-map.js');
    return app;
  },

  treeForVendor(vendorTree) {
    const dagMapRoot = require.resolve('dag-map');
    const dagMapPath = path.dirname(dagMapRoot);

    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(new Funnel(dagMapPath, {
      destDir: 'dag-map',
      include: [new RegExp(/\.js$/)]
    }));

    return mergeTrees(trees);
  }
};

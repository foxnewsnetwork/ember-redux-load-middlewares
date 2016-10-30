/*jshint node:true*/
module.exports = {
  description: 'Installs the dag-map which we use to sort initializers',

  afterInstall: function() {
    // dag-map is a part of ember core, yet I have no idea how to just use
    // the version that ships with Ember. If you know how, pls halp
    this.addPackagesToProject([
        {name: 'dag-map', target: '^2.0.1'}
    ]);
  }
};

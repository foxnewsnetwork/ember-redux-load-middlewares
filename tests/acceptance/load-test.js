/* jshint expr:true */
import {
  describe,
  it,
  before,
  after
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import { loadReducers } from 'ember-redux-load-middlewares';

describe('Acceptance: Load', function() {
  let application, reducers;

  before(function(done) {
    application = startApp();
    visit('/');
    andThen(function() {
      reducers = loadReducers('dummy');
      done();
    });
  });

  after(function() {
    destroyApp(application);
  });

  it('can find all the one reducer we have', function() {
    expect(reducers).to.be.an('array');
    expect(reducers).to.have.length(1);
  });
  it('should have the proper name', function() {
    const reducer = reducers[0];
    expect(reducer).to.have.property('name', 'applesauce');
    expect(reducer).to.respondTo('reducer');
  });
});

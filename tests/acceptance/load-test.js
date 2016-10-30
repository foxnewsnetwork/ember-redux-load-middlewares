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
import {
  loadReducers,
  loadMiddlewares,
  loadEnhancers
} from 'ember-redux-load-middlewares';

describe('Acceptance: Load', function() {
  let application, reducers, middlewares, enhancers;

  before(function(done) {
    application = startApp();
    visit('/');
    andThen(function() {
      reducers = loadReducers('dummy');
      middlewares = loadMiddlewares('dummy');
      enhancers = loadEnhancers('dummy');
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
  it('should have the proper reducer name', function() {
    const reducer = reducers[0];
    expect(reducer).to.have.property('name', 'applesauce');
    expect(reducer).to.respondTo('reducer');
  });
  it('can find all the one enhancer we have', function() {
    expect(enhancers).to.be.an('array');
    expect(enhancers).to.have.length(1);
  });
  it('should have the proper enhancer name', function() {
    const enhancer = enhancers[0];
    expect(enhancer).to.have.property('name', 'peanutoil');
    expect(enhancer).to.respondTo('enhancer');
  });
  it('can find all the one middleware we have', function() {
    expect(middlewares).to.be.an('array');
    expect(middlewares).to.have.length(1);
  });
  it('should have the proper middleware name', function() {
    const middleware = middlewares[0];
    expect(middleware).to.have.property('name', 'grapejuice');
    expect(middleware).to.respondTo('middleware');
  });
});

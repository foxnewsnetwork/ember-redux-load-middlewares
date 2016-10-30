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
  loadEnhancers,
  runReducers,
  runMiddlewares,
  runEnhancers
} from 'ember-redux-load-middlewares';

describe('Acceptance: Load Run', function() {
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

  describe('loading', function() {
    it('can find all the one reducer we have', function() {
      expect(reducers).to.be.an('array');
      expect(reducers).to.have.length(6);
    });
    it('should have the proper reducer name', function() {
      const reducer = reducers[0];
      expect(reducer).to.have.property('name', 'apple-sauce');
      expect(reducer).to.respondTo('reducer');
    });
    it('can find all the one enhancer we have', function() {
      expect(enhancers).to.be.an('array');
      expect(enhancers).to.have.length(3);
    });
    it('should have the proper enhancer name', function() {
      const enhancer = enhancers[0];
      expect(enhancer).to.have.property('name', 'chocolate-cake');
      expect(enhancer).to.respondTo('enhancer');
    });
    it('can find all the one middleware we have', function() {
      expect(middlewares).to.be.an('array');
      expect(middlewares).to.have.length(4);
    });
    it('should have the proper middleware name', function() {
      const middleware = middlewares[0];
      expect(middleware).to.have.property('name', 'anaheim-pepper');
      expect(middleware).to.respondTo('middleware');
    });
  });

  describe('running', function() {
    let sortedReducers = [];
    let sortedEnhancers = [];
    let sortedMiddlewares = [];
    before(function() {
      runReducers(reducers, (name) => sortedReducers.push(name));
      runEnhancers(enhancers, (name) => sortedEnhancers.push(name));
      runMiddlewares(middlewares, (name) => sortedMiddlewares.push(name));
    });

    it('should have the reducers run in the proper order', function() {
      expect(sortedReducers)
        .to.deep.eq(['strawberry-jam', 'apple-sauce', 'gravy-boat', 'hummus', 'olive-brine', 'peanut-butter']);
    });

    it('should have the enhancers run in the proper order', function() {
      expect(sortedEnhancers)
        .to.deep.eq(['chocolate-cake', 'ice-cream', 'jello-shot']);
    });

    it('should have the middlewares run in the proper order', function() {
      expect(sortedMiddlewares)
        .to.deep.eq(['anaheim-pepper', 'brussel-sprouts', 'cauliflower', 'chinese-cabbage']);
    });
  });
});

[![Build Status](https://travis-ci.org/foxnewsnetwork/ember-redux-load-middlewares.svg?branch=master)](https://travis-ci.org/foxnewsnetwork/ember-redux-load-middlewares)

# Ember-redux-load-middlewares

(Work in Progress!!)
ember-load-initializers for ember-redux, loads all the files in your `enhancers`, `middleware`, and `reducers` folders for inclusion with ember-redux's `redux` service

comes with blueprints to generate enhancers, middlewares, and reducers

```bash
ember generate redux-enchancer my-enchaner
ember generate redux-middleware my-middleware
ember generate redux-reducer my-reducer
```

## Usage
Usage like so:

```javascript
import {
  loadReducers,
  loadMiddlewares,
  loadEnhancers,
  runReducers,
  runEnhancers,
  runMiddlewares
} from 'ember-redux-load-middlewares';

const myReducers = loadReducers('my-app'); // name of your app
runReducers(myReducers, (name, reducer) => { /* Whatever you have to do*/ })
```
Note that `myReducers` in the above example is an array that contains data that looks like:
```javascript
{
  name: String,
  before?: String | [String],
  after?: String | [String],
  reducer: Reducer
}
```

the `runReducers` method, when given an array of reducers like the above, sorts them then performs the given callback on them in the proper DAG order.

## Todos
Here are what I need to do before this is ready

- [x] write all the blueprints for generating enhancers
- [x] write blueprints for generating reducers
- [x] write blueprints for generating middlewares
- [x] write an acceptance test to ensure stuff works
- [x] write a RFC on ember-redux about using this addon (in progress here https://github.com/toranb/ember-redux/issues/34#issuecomment-257153057)
- [x] implement sorting with before and after

## Installation

* `git clone <repository-url>` this repository
* `cd ember-redux-load-middlewares`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

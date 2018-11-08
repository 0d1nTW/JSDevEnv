//this file is not transpiled, so must use CommonJS and ES5

//register Babel to transpile our tests before our tests run.
require('babel-register')();

//disable webpack features that Mocha doesn't understand
require.extensions['.css'] = function() {};
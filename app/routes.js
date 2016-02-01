/*
 * routes.js
 * rnd.createRoute accepts a file and a controller at the moment, although
 * more parameters may be added for the future.
 *
*/

var rnd = Rownd.start({
  debug: false
});

// An example index route
rnd.createRoute({
  'controller' : 'index',
  'path' : ''
});

rnd.createRoute({
  'controller' : 'other',
  'path' : '/other'
});

// The 404 handler
rnd.notFound = function(){
  Rownd.generateTemplate({template: '404'});
  console.log('404 page');
};
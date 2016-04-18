var _ = require('lodash');
var pathAccess = require('./path-access');

/*
Routes an object's branches through a set of provided functions.

  obj: Object - An arbitrary data object.
  routes: { String -> Function } - An object mapping a path in `obj` to a
    function which accepts the branch at that path.

  returns a modified copy of `obj`, with the result of routing to all relevant
    branches.

Example:

  function addOne (n) { return n + 1 }
  var model = { foo: { bar: 1 } };

  // operates on value at model.foo.bar
  var result = routeObject(model, { 'foo.bar': addOne });
  assert.equal(result.foo.bar, 2);
  // does not mutate original object
  assert.equal(model.foo.bar, 1);

  // does nothing
  var result2 = routeObject(model, { 'nonexistent': addOne });
  asset.deepEqual(model, model2);
*/
function routeObject (obj, routes) {
  return Object.keys(routes)
    .reduce(function (acc, key) {
      var branch = pathAccess.get(obj, key);
      if (branch !== undefined) {
        var modified = routes[key](branch);
        return pathAccess.set(obj, key, modified);
      } else {
        return obj;
      }
    }, obj);
}

module.exports = routeObject;
var _ = require('lodash');

/*
Functions to get and set values in objects without mutating them.
Exposes `get` and `set`.

get: (obj, path, [defaultValue]) -> value
  obj: Object - The object into which to peeeerrrrr
  path: String | Array - Either a path in string form ('foo.0.bar'), or in array
    form (['foo', 0, 'bar']).
  defaultValue: Any - A value to return if `path` does not exists in `obj`
    (defaults to `undefined`).
  returns the value at `path` in `object`; or `defaultValue` if no such `path`

set: (obj, path, value) -> obj'
  obj: Object - The object to edit.
  path: String | Array - Either a path in string form ('foo.0.bar'), or in array
    form (['foo', 0, 'bar']).
  value: Any - The new value to place at the provided path.
  returns a copy of `obj` with the newly set path.
*/

// modified from `object-path` to produce new objects instead of mutating
// https://github.com/mariocasciaro/object-path
function getKey(key){
  var intKey = parseInt(key);
  if (intKey.toString() === key) {
    return intKey;
  }
  return key;
}
function isEmpty(value){
  if (!value) {
    return true;
  }
  if (_.isArray(value) && value.length === 0) {
    return true;
  } else if (!_.isString(value)) {
    for (var i in value) {
      if (Object.prototype.hasOwnProperty.call(value, i)) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function setPath (obj, path, value){
  if (_.isNumber(path)) {
    path = [path];
  }
  if (isEmpty(path)) {
    return obj;
  }
  if (_.isString(path)) {
    return setPath(obj, path.split('.').map(getKey), value);
  }
  var currentPath = path[0];

  if (path.length === 1) {
    var oldVal = obj[currentPath];
    var change = {}
    change[currentPath] = value;
    return _.assign({}, obj, change);
  }

  if (obj[currentPath] === void 0) {
    //check if we assume an array
    if(_.isNumber(path[1])) {
      obj[currentPath] = [];
    } else {
      obj[currentPath] = {};
    }
  }

  var change = {};
  change[currentPath] = setPath(obj[currentPath], path.slice(1), value);
  return _.assign({}, obj, change);
}

function getPath (obj, path, defaultValue) {
  if (_.isNumber(path)) {
    path = [path];
  }
  if (isEmpty(path)) {
    return obj;
  }
  if (isEmpty(obj)) {
    return defaultValue;
  }
  if (_.isString(path)) {
    return getPath(obj, path.split('.'), defaultValue);
  }

  var currentPath = getKey(path[0]);

  if (path.length === 1) {
    if (obj[currentPath] === void 0) {
      return defaultValue;
    }
    return obj[currentPath];
  }

  return getPath(obj[currentPath], path.slice(1), defaultValue);
}

module.exports = {
  get: getPath,
  set: setPath
};
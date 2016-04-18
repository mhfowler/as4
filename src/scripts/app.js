var _ = require('lodash');
var routeObject = require('./util/route-object');
var DirectMessage = require('./modules/dm');
var Modules = require('./modules/modules');
var Hotkeys = require('./hotkeys');

var Application = {
  start: function (configuration) {
    var moduleRoutes = Modules.keys().reduce(function (acc, key) {
      acc[key] = Modules.get(key).start;
      return acc;
    }, {});

    var routes = moduleRoutes;

    return routeObject(configuration, routes);
  }
}

module.exports = Application;
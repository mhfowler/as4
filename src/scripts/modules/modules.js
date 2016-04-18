var _ = require('lodash');

/*
Registry of all modules.
*/
var Modules = {};

var ModulesFunctions = {
  /*
  Create and register a new module. Returns the newly created module.

    key: String - The key to later reference the module by.
    definition: Object - An object defining the module, with any combination of
      the following fields (plus any custom ones):
      start: Function - Called at configuration stage, supplying any config data.
      state: Object - An object of functions reporting state of the Twitter site.
      actions: Object - An object of actions to perform on the Twitter site.
  */
  create: function (key, definition) {
    Modules[key] = _.defaults(definition, {
      start: _.identity,
      actions: {},
      state: {}
    });

    return Modules[key];
  },

  /*
  Retrieves the module at the specified key.
  */
  get: function (key) {
    return Modules[key];
  },

  /*
  Returns a list of keys of all registered modules.
  */
  keys: function () {
    return Object.keys(Modules);
  }
};

module.exports = ModulesFunctions;
var Mousetrap = require('mousetrap');
var Modules = require('./modules/modules');


var Hotkeys = Modules.create('Hotkeys', {
  /*
  Registers all hotkey listeners.

  hotkeys: [{ key, module, action }]
    key: String - The "hot", key (or more - see https://craig.is/killing/mice)
    module: String - The module key, as listed in the `modules` dictionary
      above.
    action: String - The key of the function in the module's `actions`
      dictionary.
  */
  start: function (hotkeys) {
    hotkeys.forEach(function (elm) {
      Hotkeys.addHotkey(elm.key, elm.module, elm.action);
    });
  },

  /*
  Registers a single hotkey.

  key: String - The "hot", key (or more - see https://craig.is/killing/mice)
  moduleKey: String - The module key, as listed in the `modules` dictionary
    above.
  actionKey: String - The key of the function in the module's `actions`
    dictionary.
  */
  addHotkey: function (key, moduleKey, actionKey) {
    var module = Modules.get(moduleKey);
    if (module != null) {
      var action = module.actions[actionKey];
      if (action != null) {
        Mousetrap.bind(key, action);
      } else {
        console.warn("Attempted to add a hotkey with nonexistent action",
                     moduleKey + "::" + actionKey);
      }
    } else {
      console.warn("Attempted to add a hotkey with nonexistent module",
                    moduleKey);
    }
  }
});

module.exports = Hotkeys;
var Mousetrap = require('mousetrap');
var Modules = require('./modules/modules');

/**
 * adds a bindGlobal method to Mousetrap that allows you to
 * bind specific keyboard shortcuts that will still work
 * inside a text input field
 *
 * usage:
 * Mousetrap.bindGlobal('ctrl+s', _saveChanges);
 */
/* global Mousetrap:true */
(function(Mousetrap) {
    var _globalCallbacks = {};
    var _originalStopCallback = Mousetrap.prototype.stopCallback;

    Mousetrap.prototype.stopCallback = function(e, element, combo, sequence) {
        var self = this;

        if (self.paused) {
            return true;
        }

        if (_globalCallbacks[combo] || _globalCallbacks[sequence]) {
            return false;
        }

        return _originalStopCallback.call(self, e, element, combo);
    };

    Mousetrap.prototype.bindGlobal = function(keys, callback, action) {
        var self = this;
        self.bind(keys, callback, action);

        if (keys instanceof Array) {
            for (var i = 0; i < keys.length; i++) {
                _globalCallbacks[keys[i]] = true;
            }
            return;
        }

        _globalCallbacks[keys] = true;
    };

    Mousetrap.init();
}) (Mousetrap);



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
        Mousetrap.bindGlobal(key, action);
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
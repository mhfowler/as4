var $ = require('jquery');
var Configuration = require('./configuration');
var Application = require('./app');

require('./modules/dm');
require('./modules/user');
require('./modules/timeline');
require('./modules/notes');
require('./hotkeys');

window.onload = function () {
  // TODO: switch on user configuration
  var config = Configuration.default;

  Application.start(config);

};
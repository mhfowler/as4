var $ = require('jquery');
var Modules = require('./modules');

var k = {
  Twitter: {
    ListsNavButton: '.me [data-nav=all_lists]',
    UserInfo: '.me .account-group'
  }
}

var User = Modules.create('User', {
  state: {
    // Currently signed-in user's username.
    getUsername: function () {
      return $(k.Twitter.UserInfo).get()[0].dataset.screenName;
    },

    // Currently signed-in user's user ID.
    getUserId: function () {
      return $(k.Twitter.UserInfo).get()[0].dataset.userId;
    }
  },

  actions: {
    navigateToLists: function () {
      window.location = 'https://twitter.com/lists/';
    }
  }
});


module.exports = User;
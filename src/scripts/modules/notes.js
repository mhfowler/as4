var $ = require('jquery');
var Modules = require('./modules');
var routeObject = require('../util/route-object');

var k = {
  Notes: {
    NoteModal: '.NoteModal'
  }
};


function addNoteModal () {
  $('body').html('hello hi');
}

var NoteModal = Modules.create('NoteModal', {
  start: function (config) {
    routeObject(config, {
      'addNoteModal': addNoteModal
    });
  },

  actions: {
    show: function () {
      console.log('show');
    },
    hide: function () {
      console.log('hide');
    }
  },
  state: {
    isNoteModalVisible: function () {
      return $(k.Notes.NoteModal).is(':visible');
    }
  }
});

module.exports = NoteModal;
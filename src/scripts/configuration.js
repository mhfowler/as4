var Configuration = {
  default: Object.freeze({
    Hotkeys: [
      {
        key: 'command+e',
        module: 'NoteModal',
        action: 'showNoteModal'
      },
      {
        key: 'command+s',
        module: 'NoteModal',
        action: 'saveNoteAction'
      },
      {
        key: 'command+shift+4',
        module: 'NoteModal',
        action: 'saveScreenshotAction'
      },
      {
        key: 'escape',
        module: 'NoteModal',
        action: 'hideNoteAction'
      }
    ],
    NoteModal: {
      testflag: true,
      devmode: false,
      notemodal: {
      },
      as4_backend_url: 'https://ec2-54-172-138-52.compute-1.amazonaws.com/save_note/',
      as4_local_url: 'http://127.0.0.1:5000/save_note/'
    }
  })
};


module.exports = Configuration;
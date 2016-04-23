var $ = require('jquery');
var Modules = require('./modules');


function getNoteModal() {
    return $(".AS4NotesModal");
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}


function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

function setCaretToPos (input, pos) {
    setSelectionRange(input, pos, pos);
}


function addNoteModal (with_text) {
    var note_modal = getNoteModal();
    if (!note_modal.length) {
        note_modal = initNoteModal();
    }
    ////// TODO: check if a note was in progress via state, and only modify text if this is a new note
    // if text was highlighted on the page, then append it to the note
    var text = note_modal.val();
    var selected_text = getSelectionText();
    if (selected_text) {
        text = '"' + selected_text + '"\n\n' + text;
    }
    // add with_text if it was supplied
    if (with_text) {
        text += with_text;
    }
    // set text
    note_modal.val(text);
    // show modal and focus
    note_modal.show();
    note_modal.focus();
    setCaretToPos(note_modal, 0);
}

function initNoteModal (options) {
    console.log('++ init note modal');
    $('body').append('<textarea class="AS4NotesModal"></textarea>');
    prepopulateNoteModal(options);
    return getNoteModal();
}

function prepopulateNoteModal(options) {
    var note_modal = getNoteModal();
    var url = window.location.href;
    var text = 'url: ' + url + '\n\n';
    note_modal.val(text);
    setCaretToPos(note_modal, 0);
}

function saveNote (options) {
    console.log('saveNote');
    var note_modal = $(".AS4NotesModal");
    var note_text = note_modal.val();
    // save the note
    var post_url = NoteModal.config.as4_backend_url;
    console.log('devmode: ' + String(NoteModal.config.devmode));
    if (NoteModal.config.devmode) {
        post_url = NoteModal.config.as4_local_url;
    }
    console.log('++ post_url:' + post_url);
    $.post(post_url, {
        text: note_text
    }, function (data) {
        console.log('++ note saved');
    });
    // clear the note modal
    note_modal.val('');
    prepopulateNoteModal(options);
    note_modal.hide();
}

var NoteModal = Modules.create('NoteModal', {
    start: function (config) {
        //routeObject(config, {
        //    'notemodal': initNoteModal
        //});
        // init the modal
        initNoteModal(config);

        // mouse binding
        function checkDOMChange()
        {
            var imgs = $("img:not(.as4Image)");
            imgs.addClass('as4Image');
            imgs.click(function(e) {
                if (e.altKey) {
                    e.preventDefault();
                    var domain_name = window.location.hostname;
                    var img_src=$(this).attr('src');
                    console.log('substring: ' + img_src.substring(0, 4));
                    if (img_src.substring(0, 4) != 'http') {
                        if (img_src[0] != '/') {
                            img_src = '/' + img_src;
                        }
                        img_src = window.location.protocol + '//' + domain_name + img_src;
                    }
                    var with_text='img: ' + img_src + '\n\n';
                    addNoteModal(with_text);
                }
            });

            // call the function again after 100 milliseconds
            setTimeout( checkDOMChange, 100 );
        }
        checkDOMChange();

        // set state
        NoteModal.config = config;

    },

    actions: {
        showNoteModal: function (e) {
            console.log('showNoteModal');
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                // internet explorer
                e.returnValue = false;
            }
            addNoteModal();
        },
        saveNoteAction: function (e) {
            console.log('saveNoteAction');
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                // internet explorer
                e.returnValue = false;
            }
            saveNote();
        },
        hideNoteAction: function(e) {
            console.log('hideNoteAction');
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                // internet explorer
                e.returnValue = false;
            }
            // hide the modal if its there (don't save it though)
            getNoteModal().hide();
        },
        saveScreenshotAction: function(e) {
            addNoteModal();
        }
    },
    state: {
        isNotesModalVisible: function () {
            return $('.AS4NotesModal').is(':visible');
        },
        config: null
    }
});

module.exports = NoteModal;
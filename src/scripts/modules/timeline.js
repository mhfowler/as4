var $ = require('jquery');
var _ = require('lodash');
var Modules = require('./modules');
var routeObject = require('../util/route-object');

// JSS needs to be loaded after the document
var jss = null;
window.addEventListener('load', function () {
  jss = require('jss-browserify');
});

var k = {
  Twitter: {
    LikeTooltip: '.ProfileTweet-action--favorite .ProfileTweet-actionButton .IconContainer',
    UnlikeTooltip: '.ProfileTweet-action--favorite .ProfileTweet-actionButtonUndo .IconContainer',
    LikeUnlikeButtonContainer: '.ProfileTweet-action--favorite .ProfileTweet-actionButton, .ProfileTweet-actionButtonUndo',
    LikeGraphic: '.HeartAnimation'
  },
  KMS: {
    CustomLikeClass: 'kms-customlike'
  }
}


function setLikeTooltip (options) {
  options = _.defaults(options, {
    like: 'Like',
    unlike: 'Undo like'
  });

  $(k.Twitter.LikeTooltip).data('original-title', options.like);
  $(k.Twitter.LikeTooltip).attr('title', options.like);
  $(k.Twitter.UnlikeTooltip).data('original-title', options.unlike);
  $(k.Twitter.UnlikeTooltip).attr('title', options.unlike);
}

function setLikeEmoji (charCode) {
  // using inline-flex for easy centering
  jss.set(k.Twitter.LikeUnlikeButtonContainer, {
    'display': 'inline-flex'
  });

  // reset everything used for animating like icon
  var graphicRules = {
    'background': 'initial',
    'position': 'initial',
    'width': 'initial',
    'height': 'initial',
    'top': '0',
    'left': '0'
  };

  jss.set(k.Twitter.LikeTooltip + ' ' + k.Twitter.LikeGraphic, graphicRules);
  jss.set(k.Twitter.LikeTooltip + ' ' + k.Twitter.LikeGraphic + ':after', {
    'content': "\'" + charCode.unliked + "\'",
  });

  jss.set(k.Twitter.UnlikeTooltip + ' ' + k.Twitter.LikeGraphic, graphicRules);
  jss.set(k.Twitter.UnlikeTooltip + ' ' + k.Twitter.LikeGraphic + ':after', {
    'content': "\'" + charCode.liked + "\'"
  });
}

var Timeline = Modules.create('Timeline', {
  start: function (config) {
    routeObject(config, {
      'likeTooltip': setLikeTooltip,
      'likeEmoji': setLikeEmoji
    });
  }
});


module.exports = Timeline;
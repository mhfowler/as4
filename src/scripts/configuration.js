var Configuration = {
  default: Object.freeze({
    Hotkeys: [
      {
        key: 'd',
        module: 'DirectMessages',
        action: 'toggleVisible'
      },
      {
        key: 'l',
        module: 'User',
        action: 'navigateToLists'
      }
    ],
    DirectMessages: {
      fullscreen: true
    },
    Timeline: {
      likeTooltip: {
        like: 'Smash',
        unlike: 'Unsmash'
      },
      // likeEmoji: {
      //   liked: '\\1F63B',
      //   unliked: '\\1F63A'
      // }
    }
  })
};


module.exports = Configuration;
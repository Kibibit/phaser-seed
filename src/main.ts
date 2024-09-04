import Phaser from 'phaser';

import KibibitLogoScene from './scenes/kibibit-logo.scene';
import ProfileScene from './scenes/profile.scene';

// select scene based on url params
const urlParams = new URLSearchParams(window.location.search);
const scene = urlParams.get('scene');

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: document.body.clientWidth,
  height: (document.body.clientHeight || 700) / 2,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 }
    }
  },
  // scene: [ KibibitLogoScene ]
  scene: [
    scene === 'profile' ? ProfileScene : KibibitLogoScene
  ]
};

export default new Phaser.Game(config);

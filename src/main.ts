import Phaser from 'phaser';

import KibibitLogoScene from './scenes/kibibit-logo.scene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: document.body.clientWidth,
  height: (document.body.clientHeight || 700) / 2,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [ KibibitLogoScene ]
};

export default new Phaser.Game(config);

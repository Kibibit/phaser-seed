import Phaser from 'phaser';

import KibibitLogoScene from './scenes/kibibit-logo.scene';
import ProfileScene from './scenes/profile.scene';
import { gameGlobalService } from './game-globals.service';

// select scene based on url params
const urlParams = new URLSearchParams(window.location.search);
const scene = urlParams.get('scene');

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  // width: document.body.clientWidth,
  // height: (document.body.clientHeight || 700) / 2,
  ...gameGlobalService.getGameSize(),
  // width: 800,
  // height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  // scene: [ KibibitLogoScene ]
  scene: [
    scene === 'profile' ? ProfileScene : KibibitLogoScene
  ]
};

export default new Phaser.Game(config);

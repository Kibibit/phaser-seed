import Phaser from 'phaser';

export default class KibibitLogoScene extends Phaser.Scene {
  constructor() {
    super('kibibit-logo');
  }

  preload() {
    this.load.setBaseURL('https://kibibit.io/kibibit-assets');

    this.load.image('sky', '4HPEcJ8.jpg');
    this.load.image('logo', '1x/long-white.png');
    this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png' );
  }

  create() {
    this.add.image(400, 300, 'sky');

    // const particles = this.add.particles('red')

    // const emitter = particles.createEmitter({
    // 	speed: 100,
    // 	scale: { start: 1, end: 0 },
    // 	blendMode: 'ADD',
    // });

    const logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    // emitter.startFollow(logo);
  }
}

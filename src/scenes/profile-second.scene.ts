import Phaser from 'phaser';

import { gameGlobalService } from '../game-globals.service';

export default class ProfileSecondScene extends Phaser.Scene {
  map!: Phaser.Tilemaps.Tilemap;
  player!: Phaser.Physics.Arcade.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  groundLayer!: Phaser.Tilemaps.TilemapLayer;

  platforms!: Phaser.Physics.Arcade.StaticGroup;
  stars!: Phaser.Physics.Arcade.Group;
  bombs!: Phaser.Physics.Arcade.Group;
  scoreText!: Phaser.GameObjects.Text;

  score = 0;
  gameOver = false;
  gameSize!: { width: number; height: number; };

  constructor() {
    super('kibibit-logo');
  }

  preload() {
    this.gameSize = gameGlobalService.getGameSize();
    this.load.image('sky', 'sky.png');
    this.load.image('ground', 'platform.png');
    this.load.image('star', 'star.png');
    this.load.image('bomb', 'bomb.png');
    this.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(400, this.gameSize.height, 'ground').setScale(2).refreshBody();
    this.platforms.create(this.gameSize.width, this.gameSize.height, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    // TOP
    this.platforms.create(this.gameSize.width - 50, this.gameSize.height - 250, 'ground');
    // LEFT BOTTOM
    this.platforms.create(50, this.gameSize.height - 150, 'ground');
    // RIGHT MIDDLE
    this.platforms.create(this.gameSize.width - 130, this.gameSize.height - 120, 'ground');

    // The player and its settings
    this.player = this.physics.add.sprite(100, this.gameSize.height - 100, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: this.gameSize.width / 70,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.stars.children.iterate(function (child: any) {

      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.bombs = this.physics.add.group();

    //  The score
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', color: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar as ArcadePhysicsCallback,
      undefined,
      this
    );

    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb as ArcadePhysicsCallback,
      undefined,
      this
    );
  }

  update() {
    if (this.gameOver) { return; }
  
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-180);
  
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(180);
  
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
  
      this.player.anims.play('turn');
    }
  
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-400);
    }
  }

  collectStar (
    player: Phaser.Physics.Arcade.Sprite,
    star: Phaser.Physics.Arcade.Image
  ){
    star.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0)
    {
      //  A new batch of stars to collect
      this.stars.children.iterate(function (child: any) {

        child.enableBody(true, child.x, 0, true, true);

      });

      const x = (player.x < 400) ?
        Phaser.Math.Between(400, 800) :
        Phaser.Math.Between(0, 400);

      const bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;

    }
  }

  hitBomb (
    player: Phaser.Physics.Arcade.Sprite,
    bomb: Phaser.Physics.Arcade.Image
  ) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.gameOver = true;
  }
}

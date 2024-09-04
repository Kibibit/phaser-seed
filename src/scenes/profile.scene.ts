import Phaser from 'phaser';

export default class ProfileScene extends Phaser.Scene {
  map!: Phaser.Tilemaps.Tilemap;
  player!: Phaser.Physics.Arcade.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  groundLayer!: Phaser.Tilemaps.TilemapLayer;

  constructor() {
    super('kibibit-logo');
  }

  preload() {
    // map made with Tiled in JSON format
    this.load.tilemapTiledJSON('map', 'map.json');
    // tiles in spritesheet 
    this.load.spritesheet('tiles', 'tiles.png', { frameWidth: 70, frameHeight: 70 });
    // simple coin image
    this.load.image('coin', 'coinGold.png');
    // player animations
    this.load.atlas('player', 'player.png', 'player.json');
  }

  create() {
    // load the map 
    this.map = this.make.tilemap({ key: 'map' });
    
    // tiles for the ground layer
    const groundTiles = this.map.addTilesetImage('tiles');
    // create the ground layer
    this.groundLayer = this.map.createLayer('World', groundTiles, 0, 0);
    // the player will collide with this layer
    this.groundLayer.setCollisionByExclusion([ -1 ]);
    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, 'player'); 
    this.player.setBounce(0.2); // our player will bounce from items
    this.player.setCollideWorldBounds(true); // don't go out of the map
    this.physics.add.collider(this.groundLayer, this.player);
    this.cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);
    
    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#ccccff');

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('player', { prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'idle',
      frames: [ { key: 'player', frame: 'p1_stand' } ],
      frameRate: 10
    }); 
  }

  update(): void {
    // if (this.cursors.left.isDown) {
    //   this.player.setVelocityX(-200); // move left
    //   this.player.anims.play('walk', true);
    //   this.player.flipX= true; // flip the sprite to the left
    // }
    // else if (this.cursors.right.isDown) {
    //   this.player.setVelocityX(200); // move right
    //   this.player.anims.play('walk', true); // play walk animation
    //   this.player.flipX = false;
    // }

    if (this.cursors.left.isDown)
    {
      this.player.setVelocityX(-200); // move left
      this.player.anims.play('walk', true); // play walk animation
      this.player.flipX= true; // flip the sprite to the left
    }
    else if (this.cursors.right.isDown)
    {
      this.player.setVelocityX(200); // move right
      this.player.anims.play('walk', true); // play walk animation
      this.player.flipX = false; // use the original sprite looking to the right
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('idle', true);
    }

    if (
      (this.cursors.space.isDown || this.cursors.up.isDown)
      // this.player.
    ) {
      this.player.setVelocityY(-500); // jump up
    }
  }
}

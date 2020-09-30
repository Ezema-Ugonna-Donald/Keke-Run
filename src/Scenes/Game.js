import 'phaser';
import Player from '../Sprites/Player';
import Agbero from '../Sprites/Agbero';
import Agberos from '../Sprites/Agberos';
import Fifty from '../Sprites/Fifty';
import Fifties from '../Sprites/Fifties';
import OneHech from '../Sprites/OneHech';
import OneHeches from '../Sprites/OneHeches';
import UIScene from './UI';

export default class GameScene extends Phaser.Scene
{
  constructor (key)
  {
    super(key);
  }

  init () {
    // game player
    // let player;

    let platforms;
    let beams;

    // game earth
    let ground;

    // game camera
    let gameCamera;

    // keyboard controls
    let cursors;

    let vehicle;
    let truckWhite;
    let truckLogo;

    let oneHech;
    let fifty;

    // agbero
    let agbero;
    let agbero2;

    // score keeping variables
    let score = 0;
    let scoreText;

    // Game End
    let isTerminating = false;
    let timedEvent;
    let won = false;
    let winScore = 0;
  }

// load assets
  preload () {
    // load in the background

  }

// called once after the preload ends
  create () {

    // Game World
    this.gameWorld ();

    // Player Properties
    this.playerProperties ();

    // set camera to follow player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.followOffset.set(-300, 0);

    // Create Animation(s)
    this.createAnimation ();

    //Camera follow player
    // this.gameCamera = game.camera;
    // this.cameras.main.startFollow(this.player);
    // this.gameCamera.main.startFollow(this.player, true);
    // this.gameCamera.follow(player);

    // Create Enemies
    this.createAgbero ();

    // Create Money
    this.createMoney ();

    //  Our controls.
    this.cursors = this.input.keyboard.createCursorKeys();

    // Set collision between objects
    this.addCollisions ();
  };

  // this is called up to 60 times per second
  update () {
    this.player.update(this.cursors);
    //  Let gravity do its thing
    // this.agbero2.setGravity = 200;
    // this.agbero2.update();
    this.agbero.update();
    // console.log(this.agbero.body.y);

    this.timedEvent = this.time.addEvent({
                              delay: 32500,
                              callback:  this.gameOver,
                              loop: false,
                              callbackScope: this
                            });
  };

  addCollisions() {
    // set collider for ground, agbero, player and money
    this.physics.add.collider(this.ground, [this.agbero, this.player, this.fifty, this.oneHech]);

    // If the player collides with agbero, call the function
    this.physics.add.collider(this.agbero, this.player, this.agbero.jamAgbero.bind(this.agbero));

    //  If the player collides with any of the money, call the collectMoney function
    this.physics.add.collider(this.fifty, this.player, this.fifty.collectFifty.bind(this.fifty));
    this.physics.add.collider(this.oneHech, this.player, this.oneHech.collectOneHech.bind(this.oneHech));
    // this.physics.add.overlap(this.player, this.stars2, this.jamAgbero, null, this);
  }

  gameWorld () {

    // listen for the resize event
    this.events.on('resize', this.resize, this);

    this.events.emit('GameScene');

    // set world boundary
    this.physics.world.setBounds(0, 0, 3410, 590);
    // set camera boundary
    this.cameras.main.setBounds(0, 0, 3410, 590);

    //  A simple background for our game
    let bg = this.add.sprite(0, 0, 'background');
    // change the origin to the top-left corner
    bg.setOrigin(0,0);

    //  The platforms group contains the ground
    this.platforms = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    // Here we assign value to the varible ground.
    this.ground = this.platforms.create(0, 565, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.ground.setScale(1.5);

    //  This stops it from falling away when you jump on it
    // this.ground.setImmovable(false);

    this.physics.add.existing(this.ground);
  }

  resize(width, height) {
    // if (width === undefined)
    // {
    //   width = this.sys.game.config.width;
    // }

    // if (height === undefined)
    // {
    //   height = this.sys.game.config.height;
    // }

    this.camera.resize(width, height);
  }

  playerProperties() {
    // The player and its settings
    this.player = new Player (this, 34, 491);

    this.player.setScale(0.7);
    this.player.setSize(24, 49).setOffset(4, 30);
  }

  endGameProperties() {
    // end game indicator
    this.endGameIndicator = new EndGameIndicatior (this, 1234, 491);
  }

  createAnimation() {
    //  Our two animations, driving left and right.
    // driving animation
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNames('player', {
        frames: [0, 1, 2, 3]
      }),
      frameRate: 4,
      yoyo: true,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNames('player', {
        frames: [5, 6, 7, 8 ]
      }),
      frameRate: 4,
      yoyo: true,
      repeat: -1
    });
  }

  createAgbero() {
    //  Finally some agberos to dodge
    this.agbero = new Agberos(this.physics.world, this, []);
  }

  createMoney() {
    this.oneHech = new OneHeches(this.physics.world, this, []);
    this.fifty = new Fifties(this.physics.world, this, []);
  }

  // called when player loses
  gameOver () {
    // initiated game over sequence
    this.isTerminating = true;

    // Emit Game Over event
    this.events.emit('GameOver');

    // // fade out
    // this.cameras.main.fade(500);
    //
    // this.cameras.main.on('camerafadeoutcomplete', function(camera, effect){
    //   // restart the Scene
    //   this.scene.restart();
    // }, this);
  }
};
